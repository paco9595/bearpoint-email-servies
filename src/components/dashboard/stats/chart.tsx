"use client";
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "@/components/common/card";


export function SubscriptionChart({data}: {data: {month: string, count: number}[]}) {
  return (
    <Card className="flex-1 p-6">
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
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#EB4898"
            fill="#EB4898"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
