import Stats from "@/components/stats";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] flex-1">
      <div className="px-8 pt-4">
        <Stats/>
      </div>
      <div className="bg-red-500 hidden lg:block"></div>
    </div>
  );
}
