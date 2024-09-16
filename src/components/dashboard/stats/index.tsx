"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import StatsItem from "./statsItem";
import { SessionStorageEnum, getSessionStorage } from "@/utils/session-storage";
import { useEffect, useState } from "react";
import Card from "@/components/common/card";

export default function   Stats() {
  const [subscriber, setSubscriber] =
    useState<any>();
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    if(window){
     // const {id}= getSessionStorage(SessionStorageEnum.currentProject);
      const fetchSubscribers = async () => {
        const {count} = await supabase
        .from("subscriber")
        .select("*", { count: "exact", head: true })
        .eq('id_project','1')
        setSubscriber(count);
      };
      fetchSubscribers()
    }
  }, []);

  return (
    <Card className="grid grid-cols-1 md:grid-cols-3 border-border border bg-background">
      <StatsItem title="Subscribers" count={subscriber} average="100" />
      <StatsItem title="Open Rate" count={10} average="100" />
      <StatsItem title="Click Rate" count={10} average="100" />
    </Card>
  );
}
