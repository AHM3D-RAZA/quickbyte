import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ADMIN_TABS } from "../constants";

export default function AdminSidebar({ activeTab, onTabChange, activeOrdersCount }) {
  const navigate = useNavigate();

  return (
    <aside className="bg-brand-dark text-white w-64 hidden md:flex flex-col border-r border-black/20 fixed top-0 left-0 h-screen overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-brand-orange tracking-tight">
          QuickByte
          <span className="text-xs text-gray-400 font-normal ml-2 bg-white/5 px-2 py-0.5 rounded">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {ADMIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const isTabActive = activeTab === tab.id;
          const badge = tab.id === "orders" ? activeOrdersCount : undefined;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isTabActive
                  ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 shrink-0" />
                <span>{tab.label}</span>
              </div>
              {badge !== undefined && badge > 0 && (
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    isTabActive ? "bg-white text-brand-orange" : "bg-brand-orange text-white"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 shrink-0">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Store Front</span>
        </button>
      </div>
    </aside>
  );
}