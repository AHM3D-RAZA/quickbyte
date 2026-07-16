export default function StatCard({ label, value, description, icon: Icon }) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-black text-brand-dark mt-2">{value}</p>
        </div>
        <div className="bg-orange-50 text-brand-orange p-2 rounded-xl group-hover:scale-110 transition-transform">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </div>
  );
}
