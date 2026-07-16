import { Plus } from "lucide-react";
import AdminToolbar from "../shared/AdminToolbar";
import ActionButtons from "../shared/ActionButtons";
import StatusPill from "../shared/StatusPill";
import AdminModal from "../shared/AdminModal";

export function DealFormModal({ isOpen, isEditing, form, onChange, onSubmit, onClose }) {
  if (!isOpen) return null;

  return (
    <AdminModal title={isEditing ? "Modify Promo Offer" : "Add Discount Deal"} onClose={onClose}>
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deal Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => onChange({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
          <input
            type="text"
            required
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-brand-orange focus:outline-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount %</label>
            <input
              type="number"
              required
              value={form.discount_percentage}
              onChange={(e) => onChange({ ...form, discount_percentage: e.target.value })}
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
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deals.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-brand-dark">{d.title}</td>
                  <td className="px-6 py-4 text-gray-600 text-xs max-w-sm truncate">{d.description}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                      {d.discount_percentage}% OFF
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={d.status} />
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
        onChange={setDealForm}
        onSubmit={onSubmit}
        onClose={closeModal}
      />
    </div>
  );
}
