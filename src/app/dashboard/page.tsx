'use client'
import Resources from "@/components/dashboard/resources";
import Stats from "@/components/dashboard/stats";
import { SubscriptionChart } from "@/components/dashboard/stats/chart";
import { groupDate } from "@/utils/groupDate";
import { subtractionMonth } from "@/utils/sbstractionMonth";
import { SessionStorageEnum, getSessionStorage } from "@/utils/session-storage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

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

export default function Dashboard() {
  const supabase = createClientComponentClient();
  useEffect(() => {
    const fetchData = async () => {
      const { id } = getSessionStorage(SessionStorageEnum.currentProject);
      const { data: subscriptions } = await supabase
        .from("subscriber")
        .select("*")
        .eq("id_project", id)
        .gte("created_at", subtractionMonth(7));
    };
    if (window) {
      fetchData();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] flex-1 ">
      <div className="flex flex-col">
        <Stats />
        <div className="flex flex-1 flex-col max-h-screen my-5">
          <SubscriptionChart data={test} />
        </div>
      </div>
      <div className="hidden lg:block ml-8 mb-5">
        <Resources/>
      </div>
    </div>
  );
}
