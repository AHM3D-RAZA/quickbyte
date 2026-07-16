export default function OrderSummary({ order }) {
  const subtotal = order.items?.reduce(
    (acc, item) => acc + Number(item.subtotal || 0),
    0
  ) || 0;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold">£{subtotal.toFixed(2)}</span>
      </div>

      <div className="border-t pt-3 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">Total Paid</span>
        <span className="text-2xl font-extrabold text-orange-600">
          £{Number(order.total_price || 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}