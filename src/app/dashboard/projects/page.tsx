"use client";
import Card from "@/components/common/card";
import CreateNewProject from "@/components/dashboard/newProject";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardProjectsPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [organizations, setOrganizations] =
    useState<{ id: string; name: string; project: any[] }[]>();
  const [isCreateNewProjectOpen, setIsOpenProjectOpen] =
    useState<boolean>(false);


  useEffect(()=> {
    supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "project" },
        (payload: any) => {
          console.log("Change received!", { payload });
          const { name, description, id, id_organization } = payload.new;
          setOrganizations((old) =>
            old?.map((organization) => {
              if (organization.id === id_organization) {
                return {
                  ...organization,
                  project: [...organization.project, { name, description, id }],
                };
              }
              return organization;
            })
          );
        }
      )
      .subscribe();
  },[])

  useEffect(() => {
    console.log("test")
    const getOrganizationData = async () => {
      const { data, error } = await supabase
        .from("organization")
        .select("*, project(*)")
        .ilike('project.name', `%${searchFilter}%`)
        .order("created_at", { ascending: true });
      if (!error) {
        setOrganizations(data);
      }else {
        console.log(error);
      }
    };
    getOrganizationData();
  }, [searchFilter]);

  const clickHandler = (projectId: string) => {
    router.push(`/dashboard/project/${projectId}`);
  };

  return (
    <>
      <CreateNewProject
        isOpen={isCreateNewProjectOpen}
        onClose={() => setIsOpenProjectOpen(false)}
      />
      <div className="flex">
        <Button
          className="px-2 py-1 h-7 text-xs font-light"
          onClick={() => setIsOpenProjectOpen(true)}
        >
          New project
        </Button>
        <div>
          <Input
            className="ml-3 h-7 text-xs font-light"
            placeholder="Search for a project"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>
      {organizations?.map(
        ({ id, name: organizationName, project: projects }) => (
          ((searchFilter.length > 0 && projects.length > 0) || searchFilter.length == 0) && (<div key={id} className="mb-4 first:mt-0 mt-5 last:mb-0">
            <p>{organizationName}</p>
            <div className="min-h-44 h-full my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 md:gap-5 ">
              {projects.map(
                ({
                  id,
                  name: projectName,
                  description,
                }: {
                  id: string;
                  name: string;
                  description: string;
                }) => (
                  <Card
                    key={id}
                    className="rounded-[5px] px-5 py-6 border-border bg-background"
                    onClick={() => clickHandler(id)}
                  >
                    <div className="flex justify-between">
                      <div>{projectName}</div>
                      <div className="my-auto">
                        <ChevronRight size={14} />
                      </div>
                    </div>
                    <p className="text-sm font-medium leading-none">
                      {description}
                    </p>
                  </Card>
                )
              )}
              {projects.length == 0 && (
                <div className="text-sm text-muted-foreground">
                  Not projects jet
                </div>
              )}
            </div>
          </div>)
        )
      )}
    </>
  );
}
