import React from 'react';
import { pharmacyFeatures, clinicInfo } from '../data/clinicData';

export default function PharmacySection({ onOpenPharmacyOrder }) {
  return (
    <section id="pharmacy-section" className="py-8 md:py-14 bg-royal-subtle border-b border-royal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-white px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-200">
              <i className="fa-solid fa-pills text-purple-600"></i> 24/7 In-House Pharmacy
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-royal-dark font-display tracking-tight">
              Dr. Jerri In-House Medical Pharmacy & Online Store
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              No need to wander around for medicines after doctor consultation! Get 100% genuine prescribed drugs, emergency saline, injections, surgical items, and healthcare essentials right inside our clinic.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('pharmacy-store-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-royal hover:bg-royal-dark active:scale-95 text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-royal/20 transition flex items-center justify-center gap-1.5"
            >
              <i className="fa-solid fa-store"></i>
              <span>Order Online & Pay via UPI</span>
            </button>
            <button
              onClick={() => onOpenPharmacyOrder()}
              className="w-full sm:w-auto bg-purple-50 hover:bg-purple-100 text-royal-dark border border-purple-200 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
            >
              <i className="fa-brands fa-whatsapp text-sm text-royal"></i>
              <span>Upload Prescription</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {pharmacyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-purple-200 shadow-sm hover:shadow-md hover:border-royal transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-royal text-white flex items-center justify-center text-base mb-3 shadow-sm">
                  <i className="fa-solid fa-capsules"></i>
                </div>
                <h3 className="font-black text-sm sm:text-base text-royal-dark font-display mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-royal">
                <span>Available In-Store</span>
                <i className="fa-solid fa-check text-royal ml-1.5"></i>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Prescription Order Banner */}
        <div className="bg-gradient-to-br from-royal-dark via-royal to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-2.5">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-purple-200 border border-white/15">
                <i className="fa-solid fa-bolt text-purple-300"></i> Fast Pharmacy Order & Pickup
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-white">
                Have a Prescription? WhatsApp it to <span className="text-purple-200">{clinicInfo.phone}</span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 max-w-xl leading-relaxed">
                Take a quick photo of your doctor's slip or list your medicines. Our licensed pharmacist will verify, pack, and confirm your order immediately.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              <button
                onClick={() => onOpenPharmacyOrder()}
                className="w-full bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black py-3.5 px-5 rounded-2xl text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-whatsapp text-lg text-royal"></i>
                <span>Order Prescription on WhatsApp</span>
              </button>

              <a
                href={`tel:${clinicInfo.phone}`}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center border border-white/20 transition"
              >
                <i className="fa-solid fa-phone mr-1.5"></i>
                <span>Call Pharmacy Desk: {clinicInfo.phone}</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
