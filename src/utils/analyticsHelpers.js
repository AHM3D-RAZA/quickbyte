import { ORDER_STATUS_META } from "../components/admin/constants";

// Backend responses for analytics are Django values()/annotate() style
// payloads, so exact key names can vary a little (e.g. `count` vs `total`).
// These helpers pick the first key that's actually present instead of the
// chart breaking on an undefined value.
const pick = (obj, keys, fallback = undefined) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) return obj[key];
  }
  return fallback;
};

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

/**
 * Merges whatever the orders-by-status endpoint returns with the full known
 * status list, zero-filling anything missing. This is what guarantees
 * pending/accepted always show up alongside delivered/cancelled instead of
 * the chart only ever showing whichever statuses happen to have orders.
 */
export function normalizeOrderStatusData(raw) {
  const rows = Array.isArray(raw) ? raw : Object.entries(raw || {}).map(([status, count]) => ({ status, count }));

  const countByStatus = {};
  rows.forEach((row) => {
    const status = pick(row, ["status", "current_status"]);
    const count = toNumber(pick(row, ["count", "total", "orders", "order_count"], 0));
    if (status) countByStatus[status] = count;
  });

  const data = ORDER_STATUS_META.map((meta) => ({
    ...meta,
    count: countByStatus[meta.key] ?? 0,
  }));

  const total = data.reduce((sum, row) => sum + row.count, 0);
  return { data, total };
}

/**
 * Sorts restaurants by revenue, keeps the top N for the chart, and folds
 * everything past that into a single "Other restaurants" bucket so the chart
 * stays readable whether there are 3 restaurants or 300.
 */
export function normalizeRevenueByRestaurant(raw, topN = 6) {
  const rows = (raw || []).map((row) => ({
    name: pick(row, ["restaurant__name", "restaurant_name", "name"], "Unknown"),
    revenue: toNumber(pick(row, ["revenue", "total_revenue", "total_sales"], 0)),
    orders: toNumber(pick(row, ["order_count", "total_orders", "orders", "count"], 0)),
  }));

  const sorted = [...rows].sort((a, b) => b.revenue - a.revenue);
  const top = sorted.slice(0, topN);
  const rest = sorted.slice(topN);

  const chartData = [...top];
  if (rest.length > 0) {
    chartData.push({
      name: `${rest.length} other restaurant${rest.length > 1 ? "s" : ""}`,
      revenue: rest.reduce((sum, r) => sum + r.revenue, 0),
      orders: rest.reduce((sum, r) => sum + r.orders, 0),
      isOther: true,
    });
  }

  return { chartData, fullList: sorted, otherCount: rest.length };
}

/**
 * Revenue-over-time rows come back keyed by whatever the `range` param was
 * (daily/weekly/monthly), so this just normalizes the label + value fields
 * and leaves the bucketing itself to the backend query.
 */
export function normalizeRevenueOverTime(raw) {
  return (raw || []).map((row) => ({
    label: pick(row, ["period", "date", "label", "week", "month"], ""),
    revenue: toNumber(pick(row, ["revenue", "total_revenue", "total"], 0)),
  }));
}

export function formatCurrency(value) {
  return `£${toNumber(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatCompactCurrency(value) {
  const n = toNumber(value);
  if (n >= 1000) return `£${(n / 1000).toFixed(1)}k`;
  return `£${n.toFixed(0)}`;
}