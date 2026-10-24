import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Header({
  onBookClick,
  onPharmacyClick,
  onDiagnosticsClick,
  cartCount = 0,
  onOpenCart,
  onOpenTracker
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-royal-border shadow-sm transition-all">
      {/* Topmost emergency / contact strip */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 text-xs flex justify-between items-center gap-2">
        <div className="flex items-center gap-1.5 truncate min-w-0">
          <i className="fa-solid fa-location-dot text-purple-300 text-xs shrink-0"></i>
          <span className="truncate font-medium text-[11px] sm:text-xs">ECIL South Kamala Nagar, Hyderabad</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-purple-200 text-[11px] font-semibold bg-white/10 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> 24/7 Pharmacy & Diagnostics
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-purple-200">
            UPI: <strong className="text-white font-mono">{clinicInfo.upiId}</strong>
          </span>
          <a
            href={`tel:${clinicInfo.phone}`}
            className="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold px-2.5 py-1 rounded-full text-[11px] sm:text-xs transition shadow-sm border border-purple-400/40"
          >
            <i className="fa-solid fa-phone text-[9px]"></i>
            <span>{clinicInfo.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-royal flex items-center justify-center text-white text-lg sm:text-2xl shadow-md shadow-royal/30 shrink-0">
            <i className="fa-solid fa-notes-medical"></i>
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1 truncate">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-royal-dark font-display">
                {clinicInfo.name}
              </span>
              <span className="text-xs sm:text-sm font-bold text-royal font-display truncate">
                Poly Clinic
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-purple-800 font-semibold tracking-tight truncate">
              Diagnostics & 24/7 Pharmacy • ECIL
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-bold text-slate-700">
          <button onClick={() => scrollToSection('pharmacy-store-section')} className="hover:text-royal transition flex items-center gap-1.5 text-royal font-black">
            <i className="fa-solid fa-store"></i>
            <span>Medicine Store</span>
          </button>
          <button onClick={() => scrollToSection('diagnostics-section')} className="hover:text-royal transition flex items-center gap-1.5">
            <i className="fa-solid fa-microscope text-royal"></i>
            <span>Diagnostics Lab</span>
          </button>
          <button onClick={() => scrollToSection('doctors-section')} className="hover:text-royal transition flex items-center gap-1.5">
            <i className="fa-solid fa-user-doctor text-royal"></i>
            <span>Specialist Doctors</span>
          </button>
          <button onClick={() => scrollToSection('services-section')} className="hover:text-royal transition">
            Clinical Services
          </button>
          <button onClick={() => scrollToSection('schedule-section')} className="hover:text-royal transition">
            OPD Timings
          </button>
          <button onClick={() => scrollToSection('contact-section')} className="hover:text-royal transition">
            Location
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          {/* Realtime Logistics Tracking button */}
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-royal-dark border border-purple-200 font-bold px-3 py-2 rounded-xl text-xs transition"
            title="Track Your Medicine Delivery"
          >
            <i className="fa-solid fa-truck-fast text-royal"></i>
            <span>Track Order</span>
          </button>

          {/* Cart Basket Button with live counter */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-royal-dark border border-purple-200 font-bold px-3 py-2 rounded-xl text-xs transition"
          >
            <i className="fa-solid fa-basket-shopping text-royal"></i>
            <span>Basket</span>
            {cartCount > 0 && (
              <span className="bg-royal text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Poly%20Clinic,%20I%20would%20like%20to%20consult%20a%20doctor`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-royal-dark border border-purple-200 font-bold px-3 py-2 rounded-xl text-xs transition"
          >
            <i className="fa-brands fa-whatsapp text-royal text-base"></i>
            <span>WhatsApp</span>
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={() => onBookClick('General Consultation')}
            className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-md shadow-royal/25 transition flex items-center gap-1.5"
          >
            <i className="fa-regular fa-calendar-check"></i>
            <span>Book Token</span>
          </button>
        </div>

        {/* Mobile Actions: Cart + Book + Hamburger */}
        <div className="flex items-center gap-1.5 lg:hidden shrink-0">
          <button
            onClick={onOpenCart}
            className="relative w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 active:scale-95 text-royal-dark flex items-center justify-center text-xs border border-purple-200"
            aria-label="View Cart"
          >
            <i className="fa-solid fa-basket-shopping text-royal"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-royal text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onBookClick('General Consultation')}
            className="bg-royal active:scale-95 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl shadow-sm transition flex items-center gap-1"
          >
            <i className="fa-regular fa-calendar-check text-[10px]"></i>
            <span>Book</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 active:scale-95 text-royal-dark flex items-center justify-center text-xs border border-purple-200"
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-royal-border px-4 py-4 space-y-3 text-sm font-semibold text-royal-dark shadow-xl animate-in slide-in-from-top">
          
          <button
            onClick={() => scrollToSection('pharmacy-store-section')}
            className="block w-full text-left py-2.5 px-3 rounded-xl bg-royal text-white font-bold shadow-sm"
          >
            <i className="fa-solid fa-store mr-2"></i> Online Medicine Store & UPI Pay
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="block w-full text-left py-2 px-3 rounded-xl bg-purple-50 text-royal font-bold"
          >
            <i className="fa-solid fa-truck-fast text-royal mr-2"></i> Track Live Medicine Delivery
          </button>

          <button
            onClick={() => scrollToSection('diagnostics-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-microscope text-royal mr-2"></i> Diagnostics & Scanning Center
          </button>

          <button
            onClick={() => scrollToSection('doctors-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-user-doctor text-royal mr-2"></i> Specialist Doctors & Timings
          </button>

          <button
            onClick={() => scrollToSection('services-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-notes-medical text-royal mr-2"></i> Clinic Services (Saline, Injections, First Aid)
          </button>

          <button
            onClick={() => scrollToSection('schedule-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-regular fa-clock text-royal mr-2"></i> Daily OPD Schedule
          </button>

          <button
            onClick={() => scrollToSection('contact-section')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
          >
            <i className="fa-solid fa-map-location-dot text-royal mr-2"></i> Location & Google Map
          </button>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="flex items-center justify-center gap-1.5 bg-purple-100 text-royal font-bold py-2.5 rounded-xl text-xs"
            >
              <i className="fa-solid fa-basket-shopping"></i> View Basket ({cartCount})
            </button>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Poly%20Clinic`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-royal text-white font-bold py-2.5 rounded-xl text-xs"
            >
              <i className="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
