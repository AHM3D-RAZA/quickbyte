import { ClipboardList } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import ChartCard from "../shared/ChartCard";
import { normalizeOrderStatusData } from "../../../utils/analyticsHelpers";

function StatusTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="font-bold text-brand-dark">{row.label}</p>
      <p className="text-gray-500">{row.count} order{row.count === 1 ? "" : "s"}</p>
    </div>
  );
}

export default function OrderStatusChart({ orderStatusData }) {
  const { data, total } = normalizeOrderStatusData(orderStatusData);

  return (
    <ChartCard
      icon={ClipboardList}
      title="Orders by Status"
      subtitle={total > 0 ? `${total} order${total === 1 ? "" : "s"} across the full lifecycle` : "No orders yet"}
    >
      {total === 0 ? (
        <div className="h-56 flex items-center justify-center text-sm text-gray-400">
          No orders to show yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="label"
              width={110}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#4b5563", fontWeight: 600 }}
            />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} content={<StatusTooltip />} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
              {data.map((row) => (
                <Cell key={row.key} fill={row.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}