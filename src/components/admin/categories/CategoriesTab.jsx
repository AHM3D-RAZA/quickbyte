import { Plus } from "lucide-react";
import AdminToolbar from "../shared/AdminToolbar";
import ActionButtons from "../shared/ActionButtons";
import AdminModal from "../shared/AdminModal";

export function CategoryFormModal({ isOpen, isEditing, form, onChange, onSubmit, onClose }) {
  if (!isOpen) return null;

  const handleNameChange = (val) => {
    onChange({ name: val });
  };

  return (
    <AdminModal title={isEditing ? "Modify Category" : "Add Food Category"} onClose={onClose}>
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Desserts"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
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

export default function CategoriesTab({
  categories,
  modalType,
  selectedItem,
  categoryForm,
  setCategoryForm,
  openModal,
  closeModal,
  onSubmit,
  onDelete,
}) {
  const isModalOpen = modalType?.includes("category");

  return (
    <div className="space-y-6">
      <AdminToolbar
        label="Menu Categories"
        actionLabel="Add Category"
        actionIcon={Plus}
        onAction={() => openModal("add-category")}
      />

      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm overflow-hidden max-w-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200/80 text-gray-500 font-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-400">{c.id}</td>
                  <td className="px-6 py-4 font-bold text-brand-dark">{c.name}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionButtons
                      onEdit={() => openModal("edit-category", c)}
                      onDelete={() => onDelete(c.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        isEditing={!!selectedItem}
        form={categoryForm}
        onChange={setCategoryForm}
        onSubmit={onSubmit}
        onClose={closeModal}
      />
    </div>
  );
}
