export default function AdminToolbar({ label, actionLabel, onAction, actionIcon: ActionIcon, children }) {
  return (
    <div className="flex justify-between items-center bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex-col sm:flex-row gap-4">
      {children || <span className="text-sm text-gray-500 font-semibold">{label}</span>}
      {actionLabel && (
        <button
          onClick={onAction}
          className="bg-brand-orange hover:bg-brand-orange/95 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand-orange/15 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          {ActionIcon && <ActionIcon className="w-4 h-4" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}
