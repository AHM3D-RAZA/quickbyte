import { Plus, X } from "lucide-react";
import AdminToolbar from "../shared/AdminToolbar";
import ActionButtons from "../shared/ActionButtons";
import StatusPill from "../shared/StatusPill";
import AdminModal from "../shared/AdminModal";

export function DealFormModal({
  isOpen,
  isEditing,
  form,
  restaurants = [],
  menuItems = [],
  onChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  // Only let a deal be built from menu items belonging to the deal's own restaurant.
  const itemsForSelectedRestaurant = menuItems.filter(
    (menuItem) => menuItem.restaurant?.id === Number(form.restaurant)
  );

  const addItemRow = () => {
    onChange({ ...form, items: [...form.items, { menu_item_id: "", quantity: 1 }] });
  };

  const updateItemRow = (index, patch) => {
    onChange({
      ...form,
      items: form.items.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    });
  };

  const removeItemRow = (index) => {
    onChange({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  const handleRestaurantChange = (restaurantId) => {
    // Changing the restaurant invalidates any item rows picked from the old one.
    onChange({ ...form, restaurant: restaurantId, items: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.restaurant) {
      alert("Select the restaurant this deal belongs to.");
      return;
    }
    const hasValidItem = form.items.some((row) => row.menu_item_id && row.quantity > 0);
    if (!hasValidItem) {
      alert("Add at least one menu item to this deal before saving.");
      return;
    }
    onSubmit(e);
  };

  return (
    <AdminModal title={isEditing ? "Modify Promo Deal" : "Add Promo Deal"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deal Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Restaurant</label>
          <select
            required
            value={form.restaurant}
            onChange={(e) => handleRestaurantChange(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
          >
            <option value="">Select a restaurant...</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Combo Price</label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={form.combo_price}
            onChange={(e) => onChange({ ...form, combo_price: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deal Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange({ ...form, image: e.target.files[0] })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!form.is_active}
              onChange={(e) => onChange({ ...form, is_active: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-gray-700">Active Deal</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!form.is_featured}
              onChange={(e) => onChange({ ...form, is_featured: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-gray-700">Featured Deal</span>
          </label>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-gray-500 uppercase">Menu Items In This Deal</label>
            <button
              type="button"
              onClick={addItemRow}
              disabled={!form.restaurant}
              className="text-xs font-bold text-brand-orange hover:text-brand-orange/80 flex items-center gap-1 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" /> Add Item
            </button>
          </div>

          {!form.restaurant && (
            <p className="text-xs text-gray-400 italic py-2">Select a restaurant first to choose its menu items.</p>
          )}

          {form.restaurant && form.items.length === 0 && (
            <p className="text-xs text-gray-400 italic py-2">No items added yet. Add at least one.</p>
          )}

          <div className="space-y-2">
            {form.items.map((row, index) => (
              <div key={index} className="flex items-center gap-2">
                <select
                  required
                  value={row.menu_item_id}
                  onChange={(e) => updateItemRow(index, { menu_item_id: Number(e.target.value) })}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
                >
                  <option value="">Select a menu item...</option>
                  {itemsForSelectedRestaurant.map((menuItem) => (
                    <option key={menuItem.id} value={menuItem.id}>
                      {menuItem.name} (${menuItem.price})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  required
                  value={row.quantity}
                  onChange={(e) => updateItemRow(index, { quantity: Number(e.target.value) })}
                  className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
                  title="Quantity"
                />
                <button
                  type="button"
                  onClick={() => removeItemRow(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-100"
                  title="Remove item"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
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

export default function DealsTab({
  deals,
  restaurants,
  menuItems,
  modalType,
  selectedItem,
  dealForm,
  setDealForm,
  openModal,
  closeModal,
  onSubmit,
  onDelete,
}) {
  const isModalOpen = modalType?.includes("deal");

  return (
    <div className="space-y-6">
      <AdminToolbar
        label="Active Offers & Promo Deals"
        actionLabel="Add Promo Deal"
        actionIcon={Plus}
        onAction={() => openModal("add-deal")}
      />

      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">Combo Price</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(deals || []).map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4">
                    {d.image ? (
                      <img
                        src={`http://127.0.0.1:8000${d.image}`}
                        className="h-16 w-16 rounded-xl object-cover border border-gray-100 shrink-0"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-xl bg-gray-100 border border-gray-100" />
                    )}
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-dark">{d.name}</td>
                  <td className="px-6 py-4 text-gray-600 text-xs">
                    {d.restaurant?.name || d.items?.[0]?.menu_item?.restaurant?.name || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                      ${d.combo_price}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xs">
                    {d.items?.length || 0} item{d.items?.length === 1 ? "" : "s"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={d.is_active ? "Active" : "Inactive"} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionButtons
                      onEdit={() => openModal("edit-deal", d)}
                      onDelete={() => onDelete(d.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DealFormModal
        isOpen={isModalOpen}
        isEditing={!!selectedItem}
        form={dealForm}
        restaurants={restaurants}
        menuItems={menuItems}
        onChange={setDealForm}
        onSubmit={onSubmit}
        onClose={closeModal}
      />
    </div>
  );
}