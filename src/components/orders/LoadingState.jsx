export default function LoadingState() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="h-96 bg-gray-200 rounded-2xl" />
        <div className="lg:col-span-2 h-96 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}