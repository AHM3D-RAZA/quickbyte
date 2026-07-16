const ACTIVE_STYLES = "bg-green-50 text-brand-green border border-green-200";
const INACTIVE_STYLES = "bg-gray-100 text-gray-500 border border-gray-200";

export default function StatusPill({ status, variant = "entity" }) {
  if (variant === "order") {
    const orderStyles = {
      delivered: ACTIVE_STYLES,
      preparing: "bg-blue-50 text-blue-700 border border-blue-200",
      accepted: "bg-blue-50 text-blue-700 border border-blue-200",
      pending: "bg-amber-50 text-amber-700 border border-amber-200",
      out_for_delivery: "bg-indigo-50 text-indigo-700 border border-indigo-200",
      cancelled: INACTIVE_STYLES,
    };

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-bold capitalize ${
          orderStyles[status] || INACTIVE_STYLES
        }`}
      >
        {status.replace(/_/g, " ")}
      </span>
    );
  }

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
        status === "Active" ? ACTIVE_STYLES : INACTIVE_STYLES
      }`}
    >
      {status}
    </span>
  );
}
