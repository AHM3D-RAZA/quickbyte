import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import ChartCard from "../shared/ChartCard";
import { normalizeRevenueOverTime, formatCurrency, formatCompactCurrency } from "../../../utils/analyticsHelpers";

const RANGE_OPTIONS = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

// Turns whatever date-ish string the backend sends into a short, readable
// axis label without needing the range info to line up perfectly.
function formatLabel(label, range) {
  const date = new Date(label);
  if (Number.isNaN(date.getTime())) return label;
  if (range === "monthly") return date.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function RevenueTooltip({ active, payload, range }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="font-bold text-brand-dark">{formatLabel(row.label, range)}</p>
      <p className="text-gray-500">{formatCurrency(row.revenue)}</p>
    </div>
  );
}

export default function RevenueOverTimeChart({ revenueOverTime, range, onRangeChange, loading }) {
  const data = normalizeRevenueOverTime(revenueOverTime);
  const hasData = data.length > 0;

  return (
    <ChartCard
      icon={TrendingUp}
      title="Revenue Over Time"
      subtitle="From delivered orders"
      action={
        <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onRangeChange(opt.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                range === opt.id
                  ? "bg-white text-brand-orange shadow-sm"
                  : "text-gray-500 hover:text-brand-dark"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      }
    >
      {loading ? (
        <div className="h-64 flex items-center justify-center text-sm text-gray-400">Loading…</div>
      ) : !hasData ? (
        <div className="h-64 flex items-center justify-center text-sm text-gray-400">
          No revenue data for this range yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fc8a06" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#fc8a06" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f1f1f1" />
            <XAxis
              dataKey="label"
              tickFormatter={(label) => formatLabel(label, range)}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              // Cap ticks shown so a 365-point daily series still reads
              // cleanly instead of overlapping labels.
              interval={data.length > 14 ? Math.ceil(data.length / 8) : 0}
              minTickGap={20}
            />
            <YAxis
              tickFormatter={formatCompactCurrency}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              width={48}
            />
            <Tooltip content={<RevenueTooltip range={range} />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#fc8a06"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              dot={data.length <= 14}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}