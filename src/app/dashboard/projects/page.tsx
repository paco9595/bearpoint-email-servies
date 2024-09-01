import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function DashboardProjectsPage () {
  const supabase = await createServerComponentClient({cookies})

  const data = await supabase.from('project').select('*, organization(name)')
    return (
    <div>
      projects
      <pre>
        {JSON.stringify(data,undefined, 2)}
      </pre>
    </div>
  )
}