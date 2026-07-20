// A plain CSS pie chart using conic-gradient — no library, no SVG.
const COLORS = ["#f97316", "#3b82f6", "#10b981", "#eab308", "#ef4444", "#8b5cf6"];

export default function SimplePieChart({ data = [] }) {
  if (data.length === 0) {
    return <p className="text-sm text-gray-400 italic">No data yet.</p>;
  }

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  let cumulative = 0;
  const slices = data.map((d, i) => {
    const start = (cumulative / total) * 360;
    cumulative += d.value;
    const end = (cumulative / total) * 360;
    return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`;
  });

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <div
        className="w-32 h-32 rounded-full shrink-0"
        style={{ background: `conic-gradient(${slices.join(", ")})` }}
      />
      <div className="space-y-1">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2 text-xs text-gray-600">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="font-semibold">{d.label}</span>
            <span className="text-gray-400">({((d.value / total) * 100).toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}