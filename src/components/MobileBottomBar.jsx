import React from 'react';
import { clinicInfo } from '../data/clinicData';

export default function MobileBottomBar({ onBookClick }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl p-2.5 px-4 flex items-center justify-between gap-2.5">
      {/* Call Button */}
      <a
        href={`tel:${clinicInfo.phone}`}
        className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 transition"
      >
        <i className="fa-solid fa-phone text-emerald-600 text-sm mb-0.5"></i>
        <span className="text-[10px] font-bold">Call Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Drjerrri%20Poly%20Clinic,%20I%20would%20like%20to%20consult%20a%20doctor`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 transition border border-emerald-200/80"
      >
        <i className="fa-brands fa-whatsapp text-emerald-600 text-base mb-0.5"></i>
        <span className="text-[10px] font-bold">WhatsApp</span>
      </a>

      {/* Book Token Primary Button */}
      <button
        onClick={() => onBookClick('General Consultation')}
        className="flex-[1.8] flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition"
      >
        <i className="fa-regular fa-calendar-check text-xs"></i>
        <span>Book Token</span>
      </button>
    </div>
  );
}
