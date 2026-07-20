import OrderStatusChart from "./OrderStatusChart";
import RevenueByRestaurantChart from "./RevenueByRestaurantChart";
import RevenueOverTimeChart from "./RevenueOverTimeChart";

export default function AnalyticsTab({
  orderStatusData,
  revenueByRestaurant,
  revenueOverTime,
  revenueRange,
  onRevenueRangeChange,
  revenueOverTimeLoading,
}) {
  return (
    <div className="space-y-6">
      <RevenueOverTimeChart
        revenueOverTime={revenueOverTime}
        range={revenueRange}
        onRangeChange={onRevenueRangeChange}
        loading={revenueOverTimeLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <OrderStatusChart orderStatusData={orderStatusData} />
        <RevenueByRestaurantChart revenueByRestaurant={revenueByRestaurant} />
      </div>
    </div>
  );
}