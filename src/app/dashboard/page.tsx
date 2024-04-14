import Header from "@/components/common/header/header";
import Stats from "@/components/stats";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-[75%_25%]">
      <div className="px-8 pt-4">
        <Stats/>
      </div>
      <div className="bg-red-500"></div>
    </div>
  );
}
