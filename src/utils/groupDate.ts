import { Tables } from "@/types/supabase";

export function groupDate(subscriptions: Tables<"subscriber">[]) {
    const group = Object.groupBy(
      subscriptions,
      ({ created_at }: Tables<"subscriber">) => {
        const data = new Date(created_at).getMonth() + 1;
        return data;
      }
    );
    Object.keys(group).map((month) => ({
      month,
      count: group[month].length,
    }));
  }