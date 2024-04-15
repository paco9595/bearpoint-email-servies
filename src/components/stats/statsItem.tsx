import { ArrowUp } from "lucide-react";

export default function StatsItem({title, count, average}: {title: string, count: number, average: string}) {
  return (
    <div className="px-4 md:border-r-2  border-b-2 md:border-b-0 last:border-r-0 last:border-b-0 py-4">
      <h5 className="text-lg ">{title}</h5>
      <div className="flex justify-between items-center ">
        <span className="font-medium pt-2">{count}</span>
        <div className="h-[30px] flex p-2 items-center bg-[#DCFCE6] rounded-full">
            <span className="text-[#21C55D]"><ArrowUp/></span>
            <span className="text-sm pl-1">{100}%</span>
          </div>
      </div>
      <small className="block text-sm opacity-[.7] pt-2">
          from 0 (last 4 weeks)
        </small>
    </div>
  );
}
