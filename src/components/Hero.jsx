import React from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Hero({ onBookClick, onNavigate, onSearch, searchQuery }) {
  return (
    <div className="bg-gradient-to-b from-[#2a1662] via-[#3a2081] to-[#241258] text-white py-10 md:py-16 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
        
        {/* Simple Live Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-semibold text-purple-200 mb-4 border border-white/15">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Doctors in OPD & 24/7 Pharmacy Active Today</span>
        </div>

        {/* Clean, Crisp Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Complete Clinic, Diagnostics & <br className="hidden sm:inline" />
          <span className="text-purple-200">Online Medicine Delivery</span>
        </h1>

        <p className="text-xs sm:text-base text-purple-100/90 max-w-xl mx-auto mt-3 leading-relaxed">
          Specialist doctor consultations daily, certified blood tests, and genuine pharmacy medicines delivered to your doorstep in 45 mins.
        </p>

        {/* 4 Big, Clean Action Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8">
          
          <button
            onClick={() => onNavigate ? onNavigate('doctors') : onBookClick('General Consultation')}
            className="bg-white hover:bg-purple-50 active:scale-95 text-slate-800 p-4 rounded-2xl shadow-md transition text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-royal-dark">Book Doctor</h4>
              <p className="text-[10px] text-slate-500">5 Daily Specialists</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('store')}
            className="bg-white hover:bg-purple-50 active:scale-95 text-slate-800 p-4 rounded-2xl shadow-md transition text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-pills"></i>
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-royal-dark">Buy Medicines</h4>
              <p className="text-[10px] text-slate-500">UPI Pay ({clinicInfo.upiId})</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('logistics')}
            className="bg-white hover:bg-purple-50 active:scale-95 text-slate-800 p-4 rounded-2xl shadow-md transition text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-royal-dark">Track Delivery</h4>
              <p className="text-[10px] text-slate-500">Live GPS Order Status</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('diagnostics')}
            className="bg-white hover:bg-purple-50 active:scale-95 text-slate-800 p-4 rounded-2xl shadow-md transition text-left flex flex-col justify-between group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-microscope"></i>
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-royal-dark">Lab Tests & Scans</h4>
              <p className="text-[10px] text-slate-500">Same-Day Reports</p>
            </div>
          </button>

        </div>

        {/* Clean Live Search Bar */}
        <div className="max-w-xl mx-auto mt-6">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-royal text-sm"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search Doctors, Medicines, Tests, or Symptoms..."
              className="w-full bg-white text-royal-dark rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium placeholder-slate-400"
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
