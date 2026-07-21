import { Link } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";
import Navbar from "/src/components/layout/Navbar";
import Footer from "/src/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="pb-4">
        <Navbar />
      </div>
      
      <main className="grow flex flex-col items-center justify-center text-center px-6 py-20 bg-brand-offwhite">
        <div className="h-20 w-20 rounded-full bg-orange-100 text-brand-orange flex items-center justify-center mb-6">
          <UtensilsCrossed className="h-10 w-10" />
        </div>
        <h1 className="text-6xl font-black text-brand-dark mb-2">404</h1>
        <p className="text-lg font-semibold text-brand-dark mb-2">This page isn't on the menu.</p>
        <p className="text-sm text-gray-500 mb-8 max-w-sm">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/"
          className="rounded-xl bg-brand-orange px-6 py-3 font-bold text-white shadow-lg hover:bg-brand-orange/95 transition-all"
        >
          Back to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}