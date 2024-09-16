"use client";
import Card from "@/components/common/card";
import CreateNewProject from "@/components/dashboard/newProject";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardProjectsPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [organizations, setOrganizations] =
    useState<{ id: string; name: string; project: any[] }[]>();

  useEffect(() => {
    const getOrganizationData = async () => {
      const { data, error } = await supabase
        .from("organization")
        .select("*, project(*)")
        .order('created_at', {ascending: true})
      if (!error) {
        setOrganizations(data);
      }
    };
    const project = supabase
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
    getOrganizationData();
  },[]);

  const clickHandler = (projectId: string) => {
    router.push(`/dashboard/project/${projectId}`,);
  };
  return (
    <>
      <CreateNewProject />
      {organizations?.map(
        ({ id, name: organizationName, project: projects }) => (
          <div key={id} className="mb-4 first:mt-0 mt-5 last:mb-0">
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
          </div>
        )
      )}
    </>
  );
}
