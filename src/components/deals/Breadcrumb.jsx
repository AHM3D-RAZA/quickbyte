import { HashLink } from "react-router-hash-link";

function DealBreadcrumb({ category, dealName }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 font-poppins mb-4">
      <HashLink smooth to="/" className="hover:text-black cursor-pointer">Home</HashLink>
      <span>›</span>
      <HashLink smooth to="/#deals" className="hover:text-black cursor-pointer">{category}</HashLink>
      <span>›</span>
      <span className="text-black font-medium">{dealName}</span>
    </nav>
  );
}

export default DealBreadcrumb;