import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Hero({ onBookClick, onPharmacyClick, onDiagnosticsClick, onSearch, searchQuery }) {
  const [opdStatus, setOpdStatus] = useState({
    title: 'Dr. Jerri Poly Clinic Open Daily',
    subtitle: 'Consultations, Diagnostics & Online Pharmacy Active'
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
        title: 'Currently in OPD: Dr. Supriya (Gynecology & Maternity)',
        subtitle: 'Consultation Hours: 1:00 PM - 3:00 PM • Maternity & Prenatal Tokens Available'
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
        title: 'Dr. Jerri Poly Clinic, Diagnostics & Pharmacy',
        subtitle: 'Diagnostics, Saline, Injections, Online Store & UPI Pay Open Daily'
      });
    }
  }, []);

  const scrollToStore = () => {
    const el = document.getElementById('pharmacy-store-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-[#241258] via-[#3a2081] to-[#200e4e] text-white relative overflow-hidden py-8 md:py-14 border-b border-purple-900/60">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Main Grid: Left copy, Right Doctor Showcase & Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Subtitle, Actions */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Live OPD Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-300 pulse-glow shrink-0"></span>
              <span className="text-white font-bold">{opdStatus.title}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display leading-[1.18] tracking-tight text-white">
                Complete Healthcare, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-white">
                  Diagnostics Lab & Medicine Store
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-purple-100/90 max-w-xl leading-relaxed pt-0.5">
                Consult 5+ Specialist Doctors daily, get <b className="text-white">Maternity & Prenatal Checkups</b> with Dr. Supriya, order certified medicines online with instant UPI via <b className="text-white font-mono">{clinicInfo.upiId}</b>, and receive fast 45-min doorstep delivery in ECIL.
              </p>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-1 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => onBookClick('General Consultation')}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm transition shadow-lg shadow-black/20"
              >
                <i className="fa-regular fa-calendar-check text-royal text-xs sm:text-sm"></i>
                <span>Book Doctor</span>
              </button>

              <button
                onClick={scrollToStore}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-black py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm transition border border-white/30 backdrop-blur-md"
              >
                <i className="fa-solid fa-store text-pink-200 text-xs sm:text-sm"></i>
                <span>Medicine Store</span>
              </button>

              <button
                onClick={() => onDiagnosticsClick()}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm transition border border-white/20 backdrop-blur-md"
              >
                <i className="fa-solid fa-microscope text-purple-200 text-xs sm:text-sm"></i>
                <span>Diagnostics</span>
              </button>

              <a
                href={`tel:${clinicInfo.phone}`}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl text-[11px] sm:text-sm transition border border-white/20"
              >
                <i className="fa-solid fa-phone text-purple-300 text-xs"></i>
                <span>Call Clinic</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs text-purple-200">
              <div className="flex items-center gap-1.5 font-bold text-white text-[10px] sm:text-xs">
                <i className="fa-solid fa-circle-check text-purple-300"></i>
                <span>Maternity & Prenatal Care</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-white text-[10px] sm:text-xs">
                <i className="fa-solid fa-circle-check text-purple-300"></i>
                <span>UPI Pay: {clinicInfo.upiId}</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-white text-[10px] sm:text-xs">
                <i className="fa-solid fa-circle-check text-purple-300"></i>
                <span>Realtime Order Tracking</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="pt-1 max-w-xl">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-royal text-xs sm:text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search Doctors, Blood Tests, Medicines, or Symptoms..."
                  className="w-full bg-white text-royal-dark rounded-xl sm:rounded-2xl pl-9 sm:pl-11 pr-8 sm:pr-10 py-2.5 sm:py-3 text-xs sm:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-slate-400 font-semibold"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearch('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-royal-dark text-xs sm:text-sm"
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Active Doctor Spotlight Card + 4 High-Contrast Feature Badges */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            
            {/* White Doctor Spotlight Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-purple-200/60 text-slate-800">
              <div className="flex items-center justify-between gap-1.5 mb-2.5">
                <span className="inline-flex items-center gap-1.5 bg-purple-100 text-royal-dark text-[10px] sm:text-[11px] font-extrabold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200">
                  <span className="w-2 h-2 rounded-full bg-royal"></span> OPD Available Today
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-purple-700 truncate">
                  ECIL South Kamala Nagar
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-purple-50 shrink-0 border border-purple-200 shadow-sm">
                  <img
                    src="/images/dr_harika.jpg"
                    alt="Dr. Harika"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-lg font-black text-royal-dark font-display leading-tight truncate">
                    Dr. Harika, MBBS
                  </h3>
                  <p className="text-[11px] sm:text-xs text-purple-800 font-bold truncate">
                    General Physician & Family Health
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                    <i className="fa-regular fa-clock text-royal text-[10px] shrink-0"></i>
                    <span className="truncate">9:00 AM – 4:00 PM • Daily OPD</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-purple-100 flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                  Walk-ins & tokens welcomed
                </span>
                <button
                  onClick={() => onBookClick('Dr. Harika (General Physician [9 AM - 4 PM])')}
                  className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold text-xs py-2 px-3 rounded-xl shadow-md shadow-royal/20 transition flex items-center gap-1 shrink-0"
                >
                  <i className="fa-regular fa-calendar-check text-[10px]"></i>
                  <span>Book Token</span>
                </button>
              </div>
            </div>

            {/* 4 Feature Tiles with High-Contrast White Icon Badges */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              
              {/* Specialist Doctors */}
              <div
                onClick={() => {
                  const el = document.getElementById('doctors-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 transition group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white text-royal flex items-center justify-center text-sm sm:text-lg mb-1.5 sm:mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-purple-200 transition">Specialist Doctors</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">Maternity & Gynaec</p>
              </div>

              {/* Online Store & E-Commerce */}
              <div
                onClick={scrollToStore}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 transition group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white text-royal flex items-center justify-center text-sm sm:text-lg mb-1.5 sm:mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-store"></i>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-purple-200 transition">Medicine Store</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">Instant UPI Payment</p>
              </div>

              {/* Diagnostics Lab */}
              <div
                onClick={() => onDiagnosticsClick()}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 transition group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white text-royal flex items-center justify-center text-sm sm:text-lg mb-1.5 sm:mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-microscope"></i>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-purple-200 transition">Diagnostics Lab</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">Blood Tests & Scans</p>
              </div>

              {/* Walk-in Saline & Injections */}
              <div
                onClick={() => {
                  const el = document.getElementById('services-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-white/20 transition group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white text-royal flex items-center justify-center text-sm sm:text-lg mb-1.5 sm:mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-bottle-droplet"></i>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-purple-200 transition">Saline & Injections</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">IV Fluid & First Aid</p>
              </div>

            </div>

            {/* Doctors Avatar Strip */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 px-3 border border-white/15 flex items-center justify-between gap-2">
              <div className="flex -space-x-1.5 shrink-0">
                <img src="/images/dr_harika.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_supriya.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_subash.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_ramakrishna.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_srilekha.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
              </div>
              <div className="text-[10px] sm:text-[11px] text-purple-100 font-semibold truncate text-right">
                <b className="text-white">5 Specialists</b> daily @ ECIL
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
