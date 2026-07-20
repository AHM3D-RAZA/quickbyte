import { useState } from "react";
import { Store, ChevronDown, ChevronUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import ChartCard from "../shared/ChartCard";
import { normalizeRevenueByRestaurant, formatCurrency, formatCompactCurrency } from "../../../utils/analyticsHelpers";

const BAR_COLOR = "#fc8a06";
const OTHER_COLOR = "#d1d5db";

function RevenueTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="font-bold text-brand-dark">{row.name}</p>
      <p className="text-gray-500">{formatCurrency(row.revenue)}</p>
      {!row.isOther && (
        <p className="text-gray-400">{row.orders} delivered order{row.orders === 1 ? "" : "s"}</p>
      )}
    </div>
  );
}

export default function RevenueByRestaurantChart({ revenueByRestaurant }) {
  const [showAll, setShowAll] = useState(false);
  const { chartData, fullList, otherCount } = normalizeRevenueByRestaurant(revenueByRestaurant, 6);

  const hasData = fullList.length > 0;
  // Taller bars read better than cramming everything narrow, but cap the
  // chart height so even the "top 7" (6 + Other) view stays compact.
  const chartHeight = Math.max(chartData.length * 42, 180);

  return (
    <ChartCard
      icon={Store}
      title="Revenue by Restaurant"
      subtitle={
        hasData
          ? otherCount > 0
            ? `Top 6 of ${fullList.length} restaurants shown — the rest are grouped`
            : "From delivered orders"
          : "No delivered orders yet"
      }
      action={
        fullList.length > 6 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="text-xs font-bold text-brand-orange hover:text-brand-orange/80 flex items-center gap-1 transition-colors"
          >
            {showAll ? "Hide full list" : "View full ranking"}
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )
      }
    >
      {!hasData ? (
        <div className="h-56 flex items-center justify-center text-sm text-gray-400">
          No delivered orders to show yet.
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#4b5563", fontWeight: 600 }}
                tickFormatter={(name) => (name.length > 18 ? `${name.slice(0, 17)}…` : name)}
              />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} content={<RevenueTooltip />} />
              <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={20}>
                {chartData.map((row) => (
                  <Cell key={row.name} fill={row.isOther ? OTHER_COLOR : BAR_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {showAll && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider sticky top-0">
                    <tr>
                      <th className="text-left px-4 py-2">#</th>
                      <th className="text-left px-4 py-2">Restaurant</th>
                      <th className="text-right px-4 py-2">Orders</th>
                      <th className="text-right px-4 py-2">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {fullList.map((row, i) => (
                      <tr key={row.name + i} className="hover:bg-gray-50/60">
                        <td className="px-4 py-2 text-gray-400 font-semibold">{i + 1}</td>
                        <td className="px-4 py-2 font-semibold text-brand-dark">{row.name}</td>
                        <td className="px-4 py-2 text-right text-gray-500">{row.orders}</td>
                        <td className="px-4 py-2 text-right font-bold text-brand-dark">
                          {formatCompactCurrency(row.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </ChartCard>
  );
}