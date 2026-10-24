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
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'store', label: 'Medicine Store', highlight: true },
    { id: 'logistics', label: 'Track Order' },
    { id: 'diagnostics', label: 'Lab Tests' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs transition-all">
      {/* Sleek Emergency Strip */}
      <div className="bg-[#2a1662] text-white px-4 md:px-8 py-1.5 text-xs flex justify-between items-center">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-[11px] sm:text-xs text-purple-200 truncate">
            Open Daily • ECIL South Kamala Nagar, Hyderabad
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:inline text-[11px] text-purple-200">
            Instant UPI & Cards Accepted
          </span>
          <a
            href={`tel:${clinicInfo.phone}`}
            className="text-[11px] font-bold text-white bg-purple-700 hover:bg-purple-600 px-2.5 py-0.5 rounded-full transition flex items-center gap-1"
          >
            <i className="fa-solid fa-phone text-[9px]"></i>
            <span>{clinicInfo.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-royal flex items-center justify-center text-white text-lg shadow-sm">
            <i className="fa-solid fa-plus"></i>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-royal-dark tracking-tight font-display">
                Dr. Jerri
              </span>
              <span className="text-xs font-bold text-royal">Clinic</span>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold -mt-0.5">
              Diagnostics & 24/7 Pharmacy
            </p>
          </div>
        </div>

        {/* Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-xl transition ${
                  isActive
                    ? 'bg-royal text-white shadow-xs'
                    : item.highlight
                    ? 'text-royal font-extrabold hover:bg-purple-50'
                    : 'text-slate-600 hover:text-royal hover:bg-purple-50/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-royal-dark text-xs font-bold border border-purple-200 transition"
          >
            <i className="fa-solid fa-basket-shopping text-royal"></i>
            <span>Basket</span>
            {cartCount > 0 && (
              <span className="bg-royal text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onBookClick('General Consultation')}
            className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-sm transition"
          >
            Book Token
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCart}
            className="relative w-8 h-8 rounded-xl bg-purple-50 text-royal-dark flex items-center justify-center text-xs border border-purple-200"
            aria-label="Basket"
          >
            <i className="fa-solid fa-basket-shopping"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-royal text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onBookClick('General Consultation')}
            className="bg-royal text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
          >
            Book
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xs"
            aria-label="Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-purple-100 px-4 py-3 space-y-1 text-sm font-semibold shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2 px-3 rounded-xl transition ${
                activePage === item.id
                  ? 'bg-royal text-white font-bold'
                  : 'text-slate-700 hover:bg-purple-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex gap-2">
            <a
              href={`tel:${clinicInfo.phone}`}
              className="flex-1 py-2 text-center text-xs font-bold bg-purple-100 text-royal rounded-xl"
            >
              <i className="fa-solid fa-phone mr-1"></i> Call Clinic
            </a>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center text-xs font-bold bg-royal text-white rounded-xl"
            >
              <i className="fa-brands fa-whatsapp mr-1"></i> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
