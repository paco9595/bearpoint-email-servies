"use client";
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";


export function SubscriptionChart({data}: {data: {month: string, count: number}[]}) {
  return (
    <div className="flex-1 ">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={" bg-white border-slate-200 border rounded p-6"}
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
    </div>
  );
}
