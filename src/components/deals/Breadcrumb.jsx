function DealBreadcrumb({ category, dealName }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 font-poppins mb-4">
      <span className="hover:text-black cursor-pointer">Home</span>
      <span>›</span>
      <span className="hover:text-black cursor-pointer">{category}</span>
      <span>›</span>
      <span className="text-black font-medium">{dealName}</span>
    </nav>
  );
}

export default DealBreadcrumb;