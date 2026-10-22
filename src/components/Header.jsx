import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Header({ onBookClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Topmost emergency / contact strip */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-white px-4 md:px-8 py-2 text-xs flex justify-between items-center">
        <div className="flex items-center gap-2 truncate">
          <i className="fa-solid fa-location-dot text-emerald-400"></i>
          <span className="truncate font-medium">{clinicInfo.address}</span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:inline-block text-teal-200 text-[11px]">
            <i className="fa-solid fa-clock text-emerald-400 mr-1"></i> Open Daily
          </span>
          <a
            href={`tel:${clinicInfo.phone}`}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold px-3 py-1 rounded-full text-xs transition shadow-sm"
          >
            <i className="fa-solid fa-phone text-[10px]"></i>
            <span>{clinicInfo.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-md shadow-teal-600/20">
            <i className="fa-solid fa-notes-medical"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 font-display">
                Drjerrri
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] md:text-xs font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Poly Clinic
              </span>
            </div>
            <p className="text-[11px] md:text-xs text-slate-500 font-medium">
              Multi-Speciality Healthcare & Diagnostics @ ECIL
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-700">
          <button onClick={() => scrollToSection('services-section')} className="hover:text-teal-700 transition">
            Services & Procedures
          </button>
          <button onClick={() => scrollToSection('doctors-section')} className="hover:text-teal-700 transition">
            Doctors & Specialists
          </button>
          <button onClick={() => scrollToSection('schedule-section')} className="hover:text-teal-700 transition">
            OPD Timings
          </button>
          <button onClick={() => scrollToSection('reviews-section')} className="hover:text-teal-700 transition">
            Reviews
          </button>
          <button onClick={() => scrollToSection('contact-section')} className="hover:text-teal-700 transition">
            Location & Contact
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Drjerrri%20Poly%20Clinic,%20I%20would%20like%20to%20consult%20a%20doctor`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-3.5 py-2 rounded-xl text-xs transition"
          >
            <i className="fa-brands fa-whatsapp text-emerald-600 text-base"></i>
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => onBookClick('General Consultation')}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-teal-700/20 transition flex items-center gap-1.5"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>Book Token</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onBookClick('General Consultation')}
            className="sm:hidden bg-teal-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg shadow-sm"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm"
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 text-sm font-semibold text-slate-800 shadow-xl animate-in slide-in-from-top">
          <button
            onClick={() => scrollToSection('services-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-notes-medical text-teal-600 mr-2"></i> Clinic Services (Saline, Tests, Scans)
          </button>
          <button
            onClick={() => scrollToSection('doctors-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-user-doctor text-teal-600 mr-2"></i> Doctors & Specialists
          </button>
          <button
            onClick={() => scrollToSection('schedule-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-regular fa-clock text-teal-600 mr-2"></i> Daily OPD Timings
          </button>
          <button
            onClick={() => scrollToSection('reviews-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-star text-amber-400 mr-2"></i> Patient Reviews
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-map-location-dot text-teal-600 mr-2"></i> Directions & Location
          </button>
          <div className="pt-2 grid grid-cols-2 gap-2">
            <a
              href={`tel:${clinicInfo.phone}`}
              className="flex items-center justify-center gap-2 bg-slate-100 py-2.5 rounded-xl font-bold text-xs text-slate-800"
            >
              <i className="fa-solid fa-phone text-emerald-600"></i> Call: 9533551700
            </a>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Drjerrri%20Poly%20Clinic`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs"
            >
              <i className="fa-brands fa-whatsapp text-sm"></i> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
