"use client";
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import Card from "@/components/common/card";


export function SubscriptionChart({data}: {data: {date: string, count: number}[]}) {
  return (
    <Card className="flex-1 p-6 bg-background border-border">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="2 2"/>
          <XAxis dataKey="date" >
            <Label value="days of the month" offset={0} position="insideBottom"  className="my-2" />
          </XAxis>
          <YAxis domain={['dataMin', 'dataMax+4']}/>
          <Tooltip cursor={{ stroke: 'bg-foreground', strokeWidth: 2 }} />
          <Line
            label={<div className="text-red-500">Month</div>}
            type="monotone"
            dataKey="subscribers"
            stroke="#15593b"
            strokeWidth={3}
            fill="#15593b"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
