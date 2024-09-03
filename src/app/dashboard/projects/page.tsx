import { Card } from "@/components/ui/card"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { ChevronRight } from "lucide-react"
import { cookies } from "next/headers"

export default async function DashboardProjectsPage() {
  const supabase = await createServerComponentClient({ cookies })

  const { data: organizations, error } = await supabase.from('organization').select('*, project(*)')
  return (
    <div className='p-5'>
      {organizations?.map(({ id, name: organizationName, project: projects }) => (
        <div key={id} className="mb-4 first:mt-0 mt-5 last:mb-0">
          <p>{organizationName}</p>
          <div className="min-h-44 h-full my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 md:gap-5 ">

            {projects.map(({ id, name: projectName, description }: { id: string, name: string, description: string }) => (
              <Card key={id} className='rounded-[5px] px-5 py-6'>
                <div className='flex justify-between'>
                  <div>
                    {projectName}
                  </div>
                  <div className="my-auto">
                    <ChevronRight size={14} />
                  </div>
                </div>
                <p className="text-sm font-medium leading-none">{description}</p>
              </Card>
            ))}
            {projects.length == 0 && (
              <div className="text-sm text-muted-foreground bg-foreground">
                Not projects jet
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}