'use client'
import Card from "@/components/common/card";
import { CopyIcon } from "lucide-react";

export default function UrlResource() {
    const onClickHandler = (e) => {
        console.log(e)
    }
    return (
        <Card className="py-10 p-5 my-3">
          <div>
            <h4 className="font-medium">Home page</h4>

            <div
              className="w-full px-2 my-1 h-[38px] bg-transparent border rounded-lg relative flex items-center cursor-pointer"
              onClick={onClickHandler}
            >
              <small
                className={`text-sm overflow-hidden overflow-ellipsis whitespace-nowrap copy-text`}
              >
                {process.env.NEXT_PUBLIC_WEBSITE_URL}/subscribe?username=paco
              </small>
              <div className="absolute h-[38px] w-[90px] rounded-r-lg bg-[#DFE7FF] right-0 flex items-center justify-center">
                <span className="text-lg">
                  <CopyIcon />
                </span>
                <span className="pl-1">copy</span>
              </div>
            </div>
          </div>
        </Card>
    )
}