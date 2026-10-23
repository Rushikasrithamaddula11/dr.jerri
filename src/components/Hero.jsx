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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display leading-[1.18] tracking-tight text-white">
                Complete Healthcare, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-white">
                  Diagnostics Lab & 24/7 Pharmacy
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-purple-100/90 max-w-xl leading-relaxed pt-1">
                Consult 5+ Specialist Doctors daily, book certified <b className="text-white">Blood Tests & Ultrasound Scans</b>, receive immediate <b className="text-white">Saline & Injections</b>, and get genuine medicines from our in-house pharmacy under one roof @ ECIL South Kamala Nagar.
              </p>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-1 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onBookClick('General Consultation')}
                className="flex items-center justify-center gap-2 bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black py-3 px-5 rounded-2xl text-xs sm:text-sm transition shadow-xl shadow-purple-950/30"
              >
                <i className="fa-regular fa-calendar-check text-royal text-sm"></i>
                <span>Book Doctor</span>
              </button>

              <button
                onClick={() => onDiagnosticsClick()}
                className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition border border-white/25 backdrop-blur-md"
              >
                <i className="fa-solid fa-microscope text-purple-200 text-sm"></i>
                <span>Lab Test / Scan</span>
              </button>

              <button
                onClick={() => onPharmacyClick()}
                className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition border border-white/25 backdrop-blur-md"
              >
                <i className="fa-brands fa-whatsapp text-white text-base"></i>
                <span>Order Meds</span>
              </button>

              <a
                href={`tel:${clinicInfo.phone}`}
                className="flex items-center justify-center gap-2 bg-purple-900/60 hover:bg-purple-900/90 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition border border-purple-400/30"
              >
                <i className="fa-solid fa-phone text-purple-300 text-xs"></i>
                <span>{clinicInfo.phone}</span>
              </a>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-purple-200">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <i className="fa-solid fa-circle-check text-purple-300"></i>
                <span>5 Specialist Doctors Daily</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <i className="fa-solid fa-circle-check text-purple-300"></i>
                <span>Walk-in Saline & Injections</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <i className="fa-solid fa-circle-check text-purple-300"></i>
                <span>In-House 24/7 Pharmacy</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="pt-1 max-w-xl">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-royal text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search Doctors, Blood Tests, Medicines, or Symptoms..."
                  className="w-full bg-white text-royal-dark rounded-2xl pl-11 pr-10 py-3 text-xs md:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-slate-400 font-semibold"
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

          {/* Right Column: Active Doctor Spotlight Card + 4 High-Contrast Feature Badges */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* White Doctor Spotlight Card */}
            <div className="bg-white rounded-3xl p-5 shadow-2xl border border-purple-200/60 text-slate-800">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-purple-100 text-royal-dark text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200">
                  <span className="w-2 h-2 rounded-full bg-royal"></span> OPD Available Today
                </span>
                <span className="text-[11px] font-bold text-purple-700">
                  ECIL South Kamala Nagar
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-purple-50 shrink-0 border border-purple-200 shadow-sm">
                  <img
                    src="/images/dr_harika.jpg"
                    alt="Dr. Harika"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-black text-royal-dark font-display leading-tight truncate">
                    Dr. Harika, MBBS
                  </h3>
                  <p className="text-xs text-purple-800 font-bold">
                    General Physician & Family Health
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1 flex items-center gap-1">
                    <i className="fa-regular fa-clock text-royal text-[10px]"></i>
                    <span>9:00 AM – 4:00 PM • Walk-ins Welcomed</span>
                  </p>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500 font-medium">
                  Tokens given on first-come / booking
                </div>
                <button
                  onClick={() => onBookClick('Dr. Harika (General Physician [9 AM - 4 PM])')}
                  className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-md shadow-royal/20 transition flex items-center gap-1.5 shrink-0"
                >
                  <i className="fa-regular fa-calendar-check text-[11px]"></i>
                  <span>Book Token</span>
                </button>
              </div>
            </div>

            {/* 4 Feature Tiles with High-Contrast White Icon Badges */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Specialist Doctors */}
              <div
                onClick={() => {
                  const el = document.getElementById('doctors-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3.5 border border-white/20 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-royal flex items-center justify-center text-lg mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-purple-200 transition">Specialist Doctors</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">5 Daily Consultants (Gen, Gynaec, Derma, Pedia)</p>
              </div>

              {/* Diagnostics Lab */}
              <div
                onClick={() => onDiagnosticsClick()}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3.5 border border-white/20 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-royal flex items-center justify-center text-lg mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-microscope"></i>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-purple-200 transition">Diagnostics Lab</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">Blood Tests, Ultrasound Scans & Digital Reports</p>
              </div>

              {/* 24/7 Pharmacy */}
              <div
                onClick={() => onPharmacyClick()}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3.5 border border-white/20 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-royal flex items-center justify-center text-lg mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-pills"></i>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-purple-200 transition">24/7 Pharmacy</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">100% Genuine Medicines, Saline & Surgicals</p>
              </div>

              {/* Walk-in Saline & Injections */}
              <div
                onClick={() => {
                  const el = document.getElementById('services-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer backdrop-blur-md rounded-2xl p-3.5 border border-white/20 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-royal flex items-center justify-center text-lg mb-2 shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-bottle-droplet"></i>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-purple-200 transition">Saline & Injections</h4>
                <p className="text-[10px] text-purple-200 mt-0.5 leading-tight">Walk-in emergency care & First Aid dressing</p>
              </div>

            </div>

            {/* Doctors Avatar Strip */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 px-3.5 border border-white/15 flex items-center justify-between gap-3">
              <div className="flex -space-x-2">
                <img src="/images/dr_harika.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_supriya.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_subash_reddy.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_rama_krishna.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
                <img src="/images/dr_srilekha.jpg" alt="Doctor" className="w-7 h-7 rounded-full object-cover object-top border-2 border-white" />
              </div>
              <div className="text-[11px] text-purple-100 font-semibold truncate">
                <b className="text-white">5 Specialists</b> available daily @ ECIL
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
