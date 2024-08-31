import Resources from "@/components/dashboard/resources";
import Stats from "@/components/dashboard/stats";
import { SubscriptionChart } from "@/components/dashboard/stats/chart";
import { subtractionMonth } from "@/utils/subtractionMonth";
import {
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] flex-1 ">
      New project
    </div>
  );
}
