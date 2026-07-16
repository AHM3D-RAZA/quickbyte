import { Plus, Search } from "lucide-react";
import AdminToolbar from "../shared/AdminToolbar";
import ActionButtons from "../shared/ActionButtons";
import AdminModal from "../shared/AdminModal";

export function MenuItemFormModal({
  isOpen,
  isEditing,
  form,
  restaurants,
  categories,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <AdminModal title={isEditing ? "Modify Dish" : "Create Menu Item"} onClose={onClose}>
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dish Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Restaurant</label>
            <select
              value={form.restaurant}
              onChange={(e) => onChange({ ...form, restaurant: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
            >
              {restaurants.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => onChange({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (£)</label>
          <input
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => onChange({ ...form, price: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            rows="3"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-brand-orange/95"
          >
            Save Changes
          </button>
        </div>
      </form>
    </AdminModal>
  );
}

export default function MenuTab({
  menuItems,
  searchQuery,
  setSearchQuery,
  restaurants,
  categories,
  modalType,
  selectedItem,
  menuitemForm,
  setMenuitemForm,
  openModal,
  closeModal,
  onSubmit,
  onDelete,
}) {
  const isModalOpen = modalType?.includes("menuitem");
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AdminToolbar actionLabel="Create Menu Item" actionIcon={Plus} onAction={() => openModal("add-menuitem")}>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 focus:border-brand-orange focus:outline-none"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" />
        </div>
      </AdminToolbar>

      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Dish</th>
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-dark">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.restaurant}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-brand-dark">£{item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 truncate max-w-xs">{item.description}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionButtons
                      onEdit={() => openModal("edit-menuitem", item)}
                      onDelete={() => onDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MenuItemFormModal
        isOpen={isModalOpen}
        isEditing={!!selectedItem}
        form={menuitemForm}
        restaurants={restaurants}
        categories={categories}
        onChange={setMenuitemForm}
        onSubmit={onSubmit}
        onClose={closeModal}
      />
    </div>
  );
}
