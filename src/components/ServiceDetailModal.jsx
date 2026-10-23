import React from 'react';
import { clinicInfo } from '../data/clinicData';

export default function ServiceDetailModal({ isOpen, onClose, service, onBookService }) {
  if (!isOpen || !service) return null;

  const getIconClass = (icon) => {
    switch (icon) {
      case 'vial': return 'fa-solid fa-vial';
      case 'pills': return 'fa-solid fa-pills';
      case 'droplet': return 'fa-solid fa-bottle-droplet';
      case 'syringe': return 'fa-solid fa-syringe';
      case 'radiation': return 'fa-solid fa-radiation';
      case 'first-aid': return 'fa-solid fa-kit-medical';
      case 'lungs': return 'fa-solid fa-lungs';
      default: return 'fa-solid fa-notes-medical';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-purple-200 p-5 sm:p-6 space-y-4 text-xs animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold bg-royal text-white shadow-md shadow-royal/20">
              <i className={getIconClass(service.icon)}></i>
            </div>
            <div>
              <h3 className="font-black text-base text-royal-dark font-display">{service.title}</h3>
              <span className="text-[10px] font-bold bg-purple-100 text-royal px-2.5 py-0.5 rounded-full border border-purple-200">
                {service.badge}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-purple-50 hover:bg-purple-100 text-royal flex items-center justify-center transition border border-purple-200"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {service.detailedDesc}
        </p>

        <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-2">
          <p className="font-bold text-royal-dark text-xs uppercase tracking-wider">Facility Highlights:</p>
          <ul className="space-y-1.5 text-slate-700 text-xs">
            {service.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <i className="fa-solid fa-circle-check text-royal text-xs mt-0.5 shrink-0"></i>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href={`tel:${clinicInfo.phone}`}
            className="flex items-center justify-center gap-2 bg-purple-50 hover:bg-purple-100 text-royal-dark font-bold py-3 rounded-2xl transition text-xs sm:text-sm border border-purple-200"
          >
            <i className="fa-solid fa-phone text-royal"></i>
            <span>Call: {clinicInfo.phone}</span>
          </a>
          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="flex items-center justify-center gap-2 bg-royal hover:bg-royal-dark text-white font-bold py-3 rounded-2xl transition shadow text-xs sm:text-sm"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>Book / Enquire</span>
          </button>
        </div>

      </div>
    </div>
  );
}
