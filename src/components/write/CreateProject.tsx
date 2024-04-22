import { PlusCircleIcon } from "lucide-react";
import Card from "../common/card";

export default function CreateProject () {
    return (
        <Card className=" max-w-[300px] h-[200px] text-center bg-slate-50 lg:py-10">
        <h4 className="text-black/20 font-bold text-2xl">Create New Template</h4>
        <PlusCircleIcon className="mt-4 mx-auto text-4xl text-black/20 w-14 h-14" />
      </Card>
    )
}