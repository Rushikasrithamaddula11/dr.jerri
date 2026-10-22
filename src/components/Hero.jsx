import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Hero({ onBookClick, onSearch, searchQuery }) {
  const [opdStatus, setOpdStatus] = useState({
    title: 'Drjerrri Poly Clinic Open Daily',
    subtitle: 'Walk-ins Welcome for Saline, Injections & Lab or Book Token'
  });

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 is Sunday, 3 is Wednesday

    if (hour >= 9 && hour < 16) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Harika',
        subtitle: 'General Physician (9:00 AM - 4:00 PM) • Walk-ins Open'
      });
    } else if (hour >= 13 && hour < 15) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Supriya',
        subtitle: 'Gynaecologist & Obstetrician (1:00 PM - 3:00 PM) • Consult Now'
      });
    } else if (hour >= 18 && hour < 19 && day !== 0 && day !== 3) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Subash Reddy',
        subtitle: 'Dermatologist (6:00 PM - 6:30 PM)'
      });
    } else if (hour >= 19 && hour < 21) {
      setOpdStatus({
        title: 'Currently in OPD: Dr C Rama Krishna',
        subtitle: 'Pediatrician & General Physician (7:00 PM - 9:00 PM)'
      });
    } else if (hour >= 21 && hour < 22) {
      setOpdStatus({
        title: 'Currently in OPD: Dr. Srilekha',
        subtitle: 'General & Mother-Child Care (9:00 PM - 10:00 PM)'
      });
    } else {
      setOpdStatus({
        title: 'Drjerrri Poly Clinic Open Daily',
        subtitle: 'Emergency Care, Saline, Injections & Tests available'
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-teal-900 via-teal-850 to-slate-900 text-white relative overflow-hidden">
      {/* Background glow graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14 relative z-10">
        
        {/* Live OPD Status Pill */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-300 mb-5 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-glow shrink-0"></span>
          <span className="font-bold text-white">{opdStatus.title}</span>
          <span className="hidden sm:inline text-teal-200">| {opdStatus.subtitle}</span>
        </div>

        {/* Main Grid: Left copy, Right Quick Stats & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 uppercase tracking-widest">
              <i className="fa-solid fa-heart-pulse"></i> Your Health Our Priority
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display leading-tight tracking-tight text-white">
              Compassionate Care for a <span className="text-emerald-400">Healthier Tomorrow</span>
            </h1>

            <p className="text-sm md:text-base text-teal-100 max-w-2xl leading-relaxed">
              Consult experienced Specialist Doctors and avail walk-in clinical procedures:{' '}
              <b className="text-white">Saline, Injections, Blood Tests, Scanning & First Aid</b>{' '}
              under one clean and sterile roof @ ECIL South Kamala Nagar.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${clinicInfo.phone}`}
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold py-3 px-5 rounded-2xl text-xs md:text-sm transition shadow-lg shadow-emerald-900/40"
              >
                <i className="fa-solid fa-phone"></i>
                <span>Call: {clinicInfo.phone}</span>
              </a>

              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Drjerrri%20Poly%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold py-3 px-5 rounded-2xl text-xs md:text-sm transition border border-white/20 backdrop-blur-sm"
              >
                <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i>
                <span>WhatsApp Token</span>
              </a>

              <button
                onClick={() => onBookClick('General Consultation')}
                className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-bold py-3 px-5 rounded-2xl text-xs md:text-sm transition shadow-md"
              >
                <i className="fa-regular fa-calendar-check"></i>
                <span>Book Token Online</span>
              </button>
            </div>

            {/* Telugu Community Notice */}
            <div className="pt-2">
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-3 text-xs flex items-center gap-3 max-w-xl">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-circle-info"></i>
                </div>
                <div className="leading-snug">
                  <span className="font-bold text-emerald-200">మా క్లినిక్ సేవలు:</span>{' '}
                  <span className="text-teal-100">{clinicInfo.teluguNotice}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white font-display">5 Specialists</h3>
              <p className="text-xs text-teal-200">Physicians, Gynaec, Derma & Child Care</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-bottle-droplet"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white font-display">Fast Walk-in</h3>
              <p className="text-xs text-teal-200">Saline, Injections & First Aid Care</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-vial"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white font-display">Diagnostic Lab</h3>
              <p className="text-xs text-teal-200">CBC, Sugar, Scans & Rapid Reports</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-1">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg mb-2">
                <i className="fa-solid fa-shield-heart"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white font-display">4.9 ★ Rating</h3>
              <p className="text-xs text-teal-200">350+ Trusted Patients @ ECIL</p>
            </div>

          </div>

        </div>

        {/* Live Search Bar for Quick Filtering */}
        <div className="mt-8 pt-4 border-t border-white/10 max-w-2xl">
          <label className="block text-xs font-semibold text-teal-200 mb-1.5">
            Quick Finder (Search Doctors, Symptoms, or Services):
          </label>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-400 text-sm"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="e.g. fever, skin, baby, saline, gynaec, blood test, wound..."
              className="w-full bg-white text-slate-800 rounded-2xl pl-11 pr-10 py-3 text-xs md:text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-sm"
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
