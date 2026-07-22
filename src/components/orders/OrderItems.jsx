export default function OrderItems({ items = [] }) {
  if (!items.length) {
    return <p className="text-gray-500 italic">No items found.</p>;
  }
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
          <img
            src={
              item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `${BASE_URL}${item.image}`
                : "https://via.placeholder.com/80"
            }
            alt={item.name}
            className="w-14 h-14 rounded-xl object-cover bg-gray-100"
          />

          <div className="flex-1">
            <p className="font-semibold text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity}
            </p>
          </div>

          <p className="font-bold text-gray-900">
            £{Number(item.subtotal || 0).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}