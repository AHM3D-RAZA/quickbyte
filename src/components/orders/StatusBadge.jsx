export default function StatusBadge({ status }) {
  const s = (status || "").toLowerCase();

  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    preparing: "bg-orange-100 text-orange-800",
    "out for delivery": "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    rejected: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${
        styles[s] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
}