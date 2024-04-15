import Stats from "@/components/stats";
import { SubscriptionChart } from "@/components/stats/chart";

const data = [
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

export default async function Dashboard() {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] flex-1">
      <div className="px-8 pt-4 flex flex-col">
        <Stats />
        <div className="flex flex-1 flex-col max-h-screen mt-5 mb-10">
        <SubscriptionChart data={data}/>
        </div>
      </div>
      <div className="bg-red-500 hidden lg:block">
      </div>
    </div>
  );
}
