import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Hero({ onBookClick, onPharmacyClick, onDiagnosticsClick, onSearch, searchQuery }) {
  const [opdStatus, setOpdStatus] = useState({
    title: 'Drjerrri Poly Clinic Open Daily',
    subtitle: 'Consultations, Diagnostics & Pharmacy Services Active'
  });

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    if (hour >= 9 && hour < 16) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Harika (General Physician)',
        subtitle: 'Consultation Hours: 9:00 AM - 4:00 PM • Walk-ins Welcomed'
      });
    } else if (hour >= 13 && hour < 15) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Supriya (Gynaecologist)',
        subtitle: 'Consultation Hours: 1:00 PM - 3:00 PM • Token Available'
      });
    } else if (hour >= 18 && hour < 19 && day !== 0 && day !== 3) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Subash Reddy (Dermatologist)',
        subtitle: 'Consultation Hours: 6:00 PM - 6:30 PM'
      });
    } else if (hour >= 19 && hour < 21) {
      setOpdStatus({
        title: 'Currently in OPD: Dr C Rama Krishna (Pediatrician)',
        subtitle: 'Consultation Hours: 7:00 PM - 9:00 PM'
      });
    } else if (hour >= 21 && hour < 22) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Srilekha (Mother & Child Care)',
        subtitle: 'Consultation Hours: 9:00 PM - 10:00 PM'
      });
    } else {
      setOpdStatus({
        title: 'Drjerrri Poly Clinic, Diagnostics & Pharmacy',
        subtitle: 'Diagnostics, Saline, Injections & Pharmacy open daily'
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-royal-dark via-royal to-royal-light text-white relative overflow-hidden">
      {/* Subtle background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14 relative z-10">
        
        {/* Live OPD Status Pill */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-medium text-purple-200 mb-5 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-glow shrink-0"></span>
          <span className="font-bold text-white">{opdStatus.title}</span>
          <span className="hidden sm:inline text-purple-200">| {opdStatus.subtitle}</span>
        </div>

        {/* Main Grid: Left copy, Right Quick Category Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-200 bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
              <i className="fa-solid fa-notes-medical text-purple-300"></i> Clinic • Diagnostics • Pharmacy
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display leading-tight tracking-tight text-white">
              Complete Healthcare, <span className="text-purple-200">Advanced Diagnostics</span> & In-House Pharmacy
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-purple-100 max-w-2xl leading-relaxed">
              Consult 5+ Specialist Doctors, book comprehensive <b className="text-white">Blood Tests & Ultrasound Scans</b>, receive immediate <b className="text-white">Saline & Injections</b>, and get all prescribed medicines directly from our <b className="text-white">In-House Pharmacy</b> under one roof @ ECIL.
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onBookClick('General Consultation')}
                className="flex items-center justify-center gap-2 bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black py-3 px-5 rounded-2xl text-xs sm:text-sm transition shadow-lg shadow-black/20"
              >
                <i className="fa-regular fa-calendar-check text-purple-700"></i>
                <span>Book Doctor Token</span>
              </button>

              <button
                onClick={() => onDiagnosticsClick()}
                className="flex items-center justify-center gap-2 bg-purple-500/30 hover:bg-purple-500/40 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition border border-white/20 backdrop-blur-sm"
              >
                <i className="fa-solid fa-microscope text-purple-200"></i>
                <span>Book Diagnostics / Scan</span>
              </button>

              <button
                onClick={() => onPharmacyClick()}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition shadow"
              >
                <i className="fa-solid fa-pills"></i>
                <span>Order Medicines (WhatsApp)</span>
              </button>

              <a
                href={`tel:${clinicInfo.phone}`}
                className="flex items-center justify-center gap-2 bg-royal-dark/80 hover:bg-royal-dark text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition border border-white/10"
              >
                <i className="fa-solid fa-phone text-emerald-400"></i>
                <span>Call: {clinicInfo.phone}</span>
              </a>
            </div>

            {/* Telugu Community Notice */}
            <div className="pt-2">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-xs flex items-center gap-3 max-w-xl">
                <div className="w-8 h-8 rounded-xl bg-purple-400/20 text-purple-200 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-circle-info"></i>
                </div>
                <div className="leading-snug">
                  <span className="font-bold text-white">క్లినిక్ ముఖ్య సేవలు:</span>{' '}
                  <span className="text-purple-100">{clinicInfo.teluguNotice}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Highlights Grid: Clinic, Diagnostics, Pharmacy, Emergency */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            
            {/* Specialist Doctors */}
            <div
              onClick={() => {
                const el = document.getElementById('doctors-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 hover:bg-white/15 cursor-pointer backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-1.5 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-display">Specialist Doctors</h3>
              <p className="text-xs text-purple-200">5 Daily OPD Consultants (Gen, Gynaec, Derma, Pedia)</p>
            </div>

            {/* Diagnostics Lab */}
            <div
              onClick={() => onDiagnosticsClick()}
              className="bg-white/10 hover:bg-white/15 cursor-pointer backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-1.5 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-microscope"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-display">Diagnostics Lab</h3>
              <p className="text-xs text-purple-200">Blood Tests, Ultrasound Scans & Digital Reports</p>
            </div>

            {/* 24/7 Pharmacy */}
            <div
              onClick={() => onPharmacyClick()}
              className="bg-white/10 hover:bg-white/15 cursor-pointer backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-1.5 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-pills"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-display">24/7 Pharmacy</h3>
              <p className="text-xs text-purple-200">100% Genuine Medicines, Saline & Surgicals</p>
            </div>

            {/* Walk-in Saline & Injections */}
            <div
              onClick={() => {
                const el = document.getElementById('services-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 hover:bg-white/15 cursor-pointer backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-1.5 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-bottle-droplet"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-display">Saline & Injections</h3>
              <p className="text-xs text-purple-200">Walk-in emergency care & First Aid dressing</p>
            </div>

          </div>

        </div>

        {/* Live Search Bar for Quick Filtering */}
        <div className="mt-8 pt-4 border-t border-white/15 max-w-2xl">
          <label className="block text-xs font-bold text-purple-200 mb-1.5">
            Quick Health Finder (Search Doctors, Tests, Medicines, or Symptoms):
          </label>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-royal text-sm"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="e.g. blood test, pharmacy, fever, ultrasound, saline, baby, skin..."
              className="w-full bg-white text-royal-dark rounded-2xl pl-11 pr-10 py-3 text-xs md:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300 placeholder-slate-400 font-semibold"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-royal-dark text-sm"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
