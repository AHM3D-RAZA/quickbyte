// A plain box-and-whisker plot for one set of numbers — shows min, quartiles,
// median, and max so it's easy to spot the typical range and any outliers.
export default function SimpleBoxPlot({ values = [] }) {
  if (values.length === 0) {
    return <p className="text-sm text-gray-400 italic">No data yet.</p>;
  }

  const sorted = [...values].sort((a, b) => a - b);

  const quartile = (q) => {
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    return sorted[base + 1] !== undefined
      ? sorted[base] + rest * (sorted[base + 1] - sorted[base])
      : sorted[base];
  };

  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const q1 = quartile(0.25);
  const median = quartile(0.5);
  const q3 = quartile(0.75);

  const range = max - min || 1;
  const pct = (v) => ((v - min) / range) * 100;

  return (
    <div>
      <div className="relative h-10 mt-4 mb-3">
        {/* whisker line: min to max */}
        <div
          className="absolute top-1/2 h-px bg-gray-400"
          style={{ left: `${pct(min)}%`, width: `${pct(max) - pct(min)}%` }}
        />
        {/* box: Q1 to Q3 */}
        <div
          className="absolute top-1 bottom-1 bg-brand-orange/25 border-2 border-brand-orange rounded"
          style={{ left: `${pct(q1)}%`, width: `${pct(q3) - pct(q1)}%` }}
        />
        {/* median line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-orange"
          style={{ left: `${pct(median)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 flex-wrap gap-2">
        <span>Min: {min.toFixed(0)}</span>
        <span>Q1: {q1.toFixed(0)}</span>
        <span>Median: {median.toFixed(0)}</span>
        <span>Q3: {q3.toFixed(0)}</span>
        <span>Max: {max.toFixed(0)}</span>
      </div>
    </div>
  );
}