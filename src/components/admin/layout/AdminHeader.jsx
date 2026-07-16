export default function AdminHeader({ activeTab }) {
  const title = activeTab === "menu" ? "Menu Items" : activeTab.replace("-", " ");

  return (
    <header className="bg-white border-b border-gray-200/80 h-16 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-brand-dark capitalize">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-black text-sm">
            A
          </div>
          <span className="text-sm font-semibold text-brand-dark">Manager Panel</span>
        </div>
      </div>
    </header>
  );
}
