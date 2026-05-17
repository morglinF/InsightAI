import MetricCard from "./MetricCard";
import InsightCard from "./InsightCard";
import RevenueChart from "./RevenueChart";

export default function AnalyticsPanel() {

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

      {/* AI INSIGHT */}
      <InsightCard
        text="
          InsightAI detected strong purchasing behavior
          during weekday mornings, with Latte sales
          outperforming all other products by 18%.
        "
      />

      {/* CHART */}
      <RevenueChart />

    </div>
  );
}