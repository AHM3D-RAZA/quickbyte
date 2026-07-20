// A plain, no-library bar chart: one row per item, bar width scaled to the largest value.
export default function SimpleBarChart({ data = [] }) {
  if (data.length === 0) {
    return <p className="text-sm text-gray-400 italic">No data yet.</p>;
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
            <span>{d.label}</span>
            <span>{d.value}</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-orange rounded-full"
              style={{ width: `${(d.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}