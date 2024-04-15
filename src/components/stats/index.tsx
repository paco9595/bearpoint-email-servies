"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import StatsItem from "./statsItem";
import { SessionStorageEnum, getSessionStorage } from "@/utils/session-storage";
import { useEffect, useState } from "react";
import { SupabaseResponse } from "@/types/supabase/SupabaseReponse";
import { Tables } from "@/types/supabase";

export default function Stats() {
  const [subscriber, setSubscriber] =
    useState<any>();
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    if(window){
      console.log('testfdefdf')
      const {id}= getSessionStorage(SessionStorageEnum.currentProject);
      const fetchSubscribers = async () => {
        const {count} = await supabase
        .from("subscriber")
        .select("*", { count: "exact", head: true })
        .eq('id_project', id)
        setSubscriber(count);
        console.log(count)
      };
      fetchSubscribers()
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-white border-slate-200 border rounded py-3">
      <StatsItem title="Subscribers" count={subscriber} average="100" />
      <StatsItem title="Open Rate" count={10} average="100" />
      <StatsItem title="click Rate" count={10} average="100" />
    </div>
  );
}
