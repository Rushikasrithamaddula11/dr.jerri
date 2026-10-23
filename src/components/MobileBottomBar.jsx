import React from 'react';
import { clinicInfo } from '../data/clinicData';

export default function MobileBottomBar({ onBookClick, onPharmacyClick }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-200 shadow-[0_-4px_20px_rgba(58,32,129,0.12)] pt-2 pb-2.5 px-3 flex items-center justify-between gap-2">
      {/* Call Button */}
      <a
        href={`tel:${clinicInfo.phone}`}
        className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl bg-purple-50 hover:bg-purple-100 active:scale-95 text-royal-dark transition border border-purple-200"
      >
        <i className="fa-solid fa-phone text-royal text-sm mb-0.5"></i>
        <span className="text-[10px] font-bold">Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Drjerrri%20Poly%20Clinic,%20I%20would%20like%20to%20consult%20a%20doctor`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl bg-purple-50 hover:bg-purple-100 active:scale-95 text-royal-dark transition border border-purple-200"
      >
        <i className="fa-brands fa-whatsapp text-royal text-base mb-0.5"></i>
        <span className="text-[10px] font-bold">WhatsApp</span>
      </a>

      {/* Pharmacy Meds Button */}
      <button
        onClick={onPharmacyClick}
        className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl bg-purple-100 hover:bg-purple-200 active:scale-95 text-royal-dark transition border border-purple-300"
      >
        <i className="fa-solid fa-pills text-purple-700 text-sm mb-0.5"></i>
        <span className="text-[10px] font-extrabold">Pharmacy</span>
      </button>

      {/* Book Token Primary Button */}
      <button
        onClick={() => onBookClick('General Consultation')}
        className="flex-[1.5] flex items-center justify-center gap-1 py-3 rounded-2xl bg-gradient-to-r from-royal via-royal-light to-purple-700 active:scale-95 text-white font-black text-xs shadow-md shadow-royal/30 transition"
      >
        <i className="fa-regular fa-calendar-check text-xs"></i>
        <span>Book Token</span>
      </button>
    </div>
  );
}
