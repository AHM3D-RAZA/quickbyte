export default function ErrorState({ error, onRetry }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Something went wrong
      </h2>

      <p className="text-gray-500 mb-6">{error}</p>

      <button
        onClick={onRetry}
        className="px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}