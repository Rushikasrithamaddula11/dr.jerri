import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function Header({
  activePage = 'home',
  onNavigate,
  onBookClick,
  cartCount = 0,
  onOpenCart
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-solid fa-house' },
    { id: 'store', label: 'Medicine Store', icon: 'fa-solid fa-store', highlight: true },
    { id: 'logistics', label: 'Logistics & Track', icon: 'fa-solid fa-truck-fast' },
    { id: 'doctors', label: 'Specialist Doctors', icon: 'fa-solid fa-user-doctor' },
    { id: 'diagnostics', label: 'Diagnostics Lab', icon: 'fa-solid fa-microscope' },
    { id: 'services', label: 'Clinical Services', icon: 'fa-solid fa-notes-medical' },
    { id: 'contact', label: 'Contact', icon: 'fa-solid fa-location-dot' },
  ];

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-royal-border shadow-sm transition-all">
      
      {/* Topmost strip */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 text-xs flex justify-between items-center gap-2">
        <div className="flex items-center gap-1.5 truncate min-w-0">
          <i className="fa-solid fa-location-dot text-purple-300 text-xs shrink-0"></i>
          <span className="truncate font-medium text-[11px] sm:text-xs">ECIL South Kamala Nagar, Hyderabad</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-purple-200 text-[11px] font-semibold bg-white/10 px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span> 24/7 Pharmacy & In-House Lab
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
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
          onClick={() => handleNavClick('home')}
        >
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

        {/* Desktop Multi-Page Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-slate-700">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-royal text-white shadow-sm shadow-royal/30'
                    : item.highlight
                    ? 'text-royal font-black hover:bg-purple-50'
                    : 'hover:text-royal hover:bg-purple-50/70 text-slate-700'
                }`}
              >
                <i className={`${item.icon} text-[11px]`}></i>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Header Actions */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          
          {/* Medicine Basket Drawer button */}
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

        {/* Mobile Header Actions: Basket + Book + Hamburger */}
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
        <div className="lg:hidden bg-white border-b border-royal-border px-4 py-4 space-y-2 text-sm font-semibold text-royal-dark shadow-xl animate-in slide-in-from-top">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2.5 px-3 rounded-xl transition flex items-center justify-between ${
                  isActive
                    ? 'bg-royal text-white font-bold'
                    : item.highlight
                    ? 'bg-purple-50 text-royal font-bold'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <i className={`${item.icon} text-sm ${isActive ? 'text-white' : 'text-royal'}`}></i>
                  <span>{item.label}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-xs opacity-60"></i>
              </button>
            );
          })}

          <div className="pt-3 border-t border-purple-100 grid grid-cols-2 gap-2">
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
