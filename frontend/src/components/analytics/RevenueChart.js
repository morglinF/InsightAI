import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6500 },
];

export default function RevenueChart() {

  return (
    <div
      className="
        bg-surface/80
        backdrop-blur-xl
        border
        border-border
        rounded-3xl
        p-6
        h-[350px]
      "
    >

      <div className="mb-6">

        <h2 className="text-xl font-semibold">
          Revenue Trends
        </h2>

        <p className="text-sm text-textSecondary">
          AI-generated business trend analysis
        </p>

      </div>

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data}>

          <CartesianGrid stroke="#334155" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7C3AED"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}