import MetricCard from "./MetricCard";
import InsightCard from "./InsightCard";
import RevenueChart from "./RevenueChart";

export default function AnalyticsPanel({
  aiInsight,
  analyticsData 
}) {

  const revenue =
    analyticsData?.totals?.money || 0;

  const transactions =
    analyticsData?.row_count || 0;

  const topCategories =
    analyticsData?.top_categories || {};

  let topCategoryName = "N/A";

  let topCategoryLabel = "Top Category";

  const firstCategoryColumn =
  Object.keys(topCategories)[0];

  if (firstCategoryColumn) {

    const categoryValues =
      topCategories[firstCategoryColumn];

    topCategoryName =
      Object.keys(categoryValues)[0];

    topCategoryLabel =
      `Top ${firstCategoryColumn}`;
  }

  return (
    <div className="space-y-6">

      {/* METRICS */}
      <div className="grid grid-cols-3 gap-6">

        <MetricCard
          title="Total Revenue"
          value={`R${revenue.toLocaleString()}`}
          subtitle="Calculated from uploaded dataset"
        />

        <MetricCard
          title="Transactions"
          value={transactions}
          subtitle="Rows analyzed"
        />

        <MetricCard
            title={topCategoryLabel}
            value={topCategoryName}
            subtitle="Most frequent value"
          />

      </div>

      {/* AI INSIGHT */}
      <InsightCard
        text={
          aiInsight ||
          "Generating AI insights..."
        }
      />

      {/* CHART */}
      <RevenueChart
        analyticsData={analyticsData}
      />

    </div>
  );
}