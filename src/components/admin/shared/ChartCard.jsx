export default function ChartCard({ title, subtitle, icon: Icon, action, children }) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200/80 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-brand-dark flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-brand-orange" />}
            {title}
          </h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}