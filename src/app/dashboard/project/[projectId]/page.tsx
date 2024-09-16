import Resources from "@/components/dashboard/resources";
import Stats from "@/components/dashboard/stats";
import { SubscriptionChart } from "@/components/dashboard/stats/chart";
import { subtractionMonth } from "@/utils/subtractionMonth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const test = [
  {
    month: "Jan 2024",
    count: 2400,
  },
  {
    month: "Feb 2024",
    count: 1398,
  },
  {
    month: "March 2024",
    count: 9800,
  },
  {
    month: "April 2024",
    count: 3908,
  },
  {
    month: "May 2024",
    count: 4800,
  },
  {
    month: "Jun 2024",
    count: 3800,
  },
  {
    month: "July 2024",
    count: 4300,
  },
];

export default async function Dashboard({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data:subscriptions, error } = await supabase
    .rpc('get_registros_usuarios_mes', { id_project: projectId })  // Pasa el ID dinámico como parámetro
  
  if (error) {
    console.error('Error al obtener los datos:', error)
    return
  }
  return (
    <div className="grid grid-cols-1 flex-1">
      <div className="flex flex-col">
        <Stats />
        <div className="flex flex-1 flex-col max-h-screen mt-5">
          <SubscriptionChart data={subscriptions || []} />
        </div>
      </div>
     
    </div>
  );
}
