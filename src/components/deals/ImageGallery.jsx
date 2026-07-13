import { useState } from "react";

function DealGallery({ image, discount }) {
  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden w-full aspect-[4/3] bg-black">
        <img src={image} alt="" className="w-full h-full object-cover" />

        {/* Discount badge */}
        <span className="absolute top-4 left-4 bg-[#e12b25] text-white font-bold text-sm px-3 py-1.5 rounded-md">
          {discount}
        </span>

        {/* Expand button */}
        <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default DealGallery;