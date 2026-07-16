import { Edit2, Trash2 } from "lucide-react";

export default function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="inline-flex gap-2">
      <button
        onClick={onEdit}
        className="p-2 text-gray-500 hover:text-brand-orange hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
        title="Edit"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
