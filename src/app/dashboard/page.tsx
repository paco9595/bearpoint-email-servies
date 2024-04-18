"use client";
import Stats from "@/components/stats";
import { SubscriptionChart } from "@/components/stats/chart";
import { Tables } from "@/types/supabase";
import { SessionStorageEnum, getSessionStorage } from "@/utils/session-storage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

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

function subtractionMonth(numMonth: number) {
  const now = new Date();
  const month =
    now.getMonth() - numMonth < 0
      ? 11 + now.getMonth() - numMonth
      : now.getMonth() - numMonth;
  const year =
    now.getMonth() - numMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
  const date = new Date(`${year}-${month}-1`);
  return `${year}-${month}-1 11:59:59.999999999`;
}

function groupDate(subscriptions: Tables<"subscriber">[]) {
  const group = Object.groupBy(
    subscriptions,
    ({ created_at }: Tables<"subscriber">) => {
      const data = new Date(created_at).getMonth() +1;
      console.log(data);
      return data;
    }
  );
  Object.keys(group).map((month) => ({
    month,
    count:  group[month].length,
  }));
}

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const [formatData, setFormatData] = useState<
    { month: string; count: number }[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const { id } = getSessionStorage(SessionStorageEnum.currentProject);
      console.log(id, subtractionMonth(7));
      const { data: subscriptions } = await supabase
        .from("subscriber")
        .select("*")
        .eq("id_project", id)
        .gte("created_at", subtractionMonth(7));
      console.log(groupDate(subscriptions ?? []));
      // setFormatData(groupDate(subscriptions ?? []));
    };
    if (window) {
      fetchData();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] flex-1">
      <div className="px-8 pt-4 flex flex-col">
        <Stats />
        <div className="flex flex-1 flex-col max-h-screen mt-5 mb-5">
          <SubscriptionChart data={test} />
        </div>
      </div>
      <div className="hidden lg:block"></div>
    </div>
  );
}
