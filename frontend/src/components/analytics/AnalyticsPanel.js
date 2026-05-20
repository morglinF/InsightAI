import MetricCard from "./MetricCard";
import InsightCard from "./InsightCard";
import RevenueChart from "./RevenueChart";

import { useDatasets } from "../../context/DatasetContext";

export default function AnalyticsPanel({ aiInsight }) {

  const { activeDataset } = useDatasets();

  return (
    <div className="space-y-6">

      {/* METRICS */}
      <div className="grid grid-cols-3 gap-6">

        <MetricCard
          title="Total Revenue"
          value="R245,000"
          subtitle="+12.5% growth"
        />

        <MetricCard
          title="Transactions"
          value="8,492"
          subtitle="Across all datasets"
        />

        <MetricCard
          title="Top Product"
          value="Latte"
          subtitle="Most purchased item"
        />

      </div>

      {/* AI INSIGHT (FIXED) */}
      <InsightCard
        text={
          aiInsight
            ? aiInsight
            : "No insights yet for this dataset."
        }
      />

      {/* CHART */}
      <RevenueChart />

    </div>
  );
}