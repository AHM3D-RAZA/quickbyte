import { Plus } from "lucide-react";
import AdminToolbar from "../shared/AdminToolbar";
import ActionButtons from "../shared/ActionButtons";
import StatusPill from "../shared/StatusPill";
import AdminModal from "../shared/AdminModal";

export function RestaurantFormModal({
  isOpen,
  isEditing,
  form,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <AdminModal
      title={isEditing ? "Modify Restaurant Brand" : "Register Restaurant"}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cuisines</label>
          <input
            type="text"
            required
            placeholder="e.g. Burgers, Pizza"
            value={form.cuisines}
            onChange={(e) => onChange({ ...form, cuisines: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => onChange({ ...form, address: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => onChange({ ...form, status: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none bg-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
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

export default function RestaurantsTab({
  restaurants,
  modalType,
  selectedItem,
  restaurantForm,
  setRestaurantForm,
  openModal,
  closeModal,
  onSubmit,
  onDelete,
}) {
  const isModalOpen = modalType?.includes("restaurant");

  return (
    <div className="space-y-6">
      <AdminToolbar
        label="Registered Restaurant Brands"
        actionLabel="Register Restaurant"
        actionIcon={Plus}
        onAction={() => openModal("add-restaurant")}
      />

      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">Cuisines</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {restaurants.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-dark">{r.name}</td>
                  <td className="px-6 py-4 text-gray-600">{r.cuisines}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-xs">{r.address}</td>
                  <td className="px-6 py-4 font-semibold">⭐ {r.rating.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ActionButtons
                      onEdit={() => openModal("edit-restaurant", r)}
                      onDelete={() => onDelete(r.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RestaurantFormModal
        isOpen={isModalOpen}
        isEditing={!!selectedItem}
        form={restaurantForm}
        onChange={setRestaurantForm}
        onSubmit={onSubmit}
        onClose={closeModal}
      />
    </div>
  );
}
