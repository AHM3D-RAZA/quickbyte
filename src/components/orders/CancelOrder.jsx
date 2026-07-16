export default function CancelOrderButton({ order, onCancel }) {
  if (order.current_status?.toLowerCase() !== "pending") return null;

  const handleCancel = async () => {
    const confirm = window.confirm(
      `Cancel order #${order.order_id}?`
    );

    if (!confirm) return;

    try {
      await onCancel(order.order_id);
      alert("Order cancelled successfully");
    } catch (err) {
      alert(err.message || "Failed to cancel order");
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
    >
      Cancel Order
    </button>
  );
}