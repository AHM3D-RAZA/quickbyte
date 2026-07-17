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
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              onChange({ ...form, description: e.target.value })
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => onChange({ ...form, address: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Restaurant Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              onChange({
                ...form,
                image: e.target.files[0],
              })
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!form.is_active}
              onChange={(e) =>
                onChange({
                  ...form,
                  is_active: e.target.checked,
                })
              }
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-gray-700">
              Active Restaurant
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!!form.is_featured}
              onChange={(e) =>
                onChange({
                  ...form,
                  is_featured: e.target.checked,
                })
              }
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-gray-700">
              Featured Restaurant
            </span>
          </label>
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
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {restaurants.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 text-gray-600">
                    <img src={`http://127.0.0.1:8000${r.image}`} 
                      className="h-20 w-20 rounded-xl object-cover border border-gray-100 shrink-0" />
                  </td>
                  <td className="px-6 py-4 font-bold text-brand-dark">{r.name}</td>
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
