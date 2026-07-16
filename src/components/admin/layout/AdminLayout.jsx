import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({ activeTab, onTabChange, activeOrdersCount, children }) {
  return (
    <div className="min-h-screen bg-brand-offwhite flex font-body text-brand-dark">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        activeOrdersCount={activeOrdersCount}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader activeTab={activeTab} />
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">{children}</main>
      </div>
    </div>
  );
}
