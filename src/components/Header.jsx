import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';
import BrandLogo from './BrandLogo';

export default function Header({
  activePage = 'home',
  onNavigate,
  onBookClick,
  cartCount = 0,
  onOpenCart,
  currentUser,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pure patient navigation items (no admin in public navbar)
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'store', label: 'Medicine Store', highlight: true },
    { id: 'logistics', label: 'Track Order' },
    { id: 'diagnostics', label: 'Lab Tests' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs transition-all">
      {/* Sleek Emergency Strip */}
      <div className="bg-[#2e1a55] text-white px-4 md:px-8 py-1.5 text-xs flex justify-between items-center border-b border-purple-950">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#00a651] animate-pulse"></span>
          <span className="text-[11px] sm:text-xs text-purple-200 truncate font-semibold">
            DR. JERRI SPECIALITY CLINIC AND DIAGNOSTICS • ECIL South Kamala Nagar, Hyderabad
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:inline text-[11px] text-purple-200">
            Instant UPI & Cards Accepted
          </span>
          <a
            href={`tel:${clinicInfo.phone}`}
            className="text-[11px] font-bold text-white bg-[#0153a2] hover:bg-[#014282] px-2.5 py-0.5 rounded-full transition flex items-center gap-1 shadow-xs"
          >
            <i className="fa-solid fa-phone text-[9px]"></i>
            <span>{clinicInfo.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Real Fixed Identity */}
        <BrandLogo
          variant="light"
          onClick={() => handleNavClick('home')}
        />

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
                    ? 'bg-[#2e1a55] text-white shadow-xs'
                    : item.highlight
                    ? 'text-[#0153a2] font-extrabold hover:bg-blue-50'
                    : 'text-slate-600 hover:text-[#2e1a55] hover:bg-purple-50/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Desktop */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          
          {/* If Logged in as Admin, show Admin Badge */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-xs font-extrabold px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                activePage === 'admin'
                  ? 'bg-purple-900 text-white'
                  : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
              }`}
            >
              <i className="fa-solid fa-shield-halved"></i>
              <span>Admin Portal</span>
            </button>
          )}

          {/* Logged In Patient Badge & Logout */}
          {currentUser && currentUser.role !== 'admin' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-xs">
              <i className="fa-solid fa-circle-user text-royal"></i>
              <span className="font-bold text-slate-800 max-w-[110px] truncate">
                {currentUser.name || currentUser.phone || 'Patient'}
              </span>
              <button
                type="button"
                onClick={onLogout}
                title="Log Out"
                className="text-slate-400 hover:text-rose-600 transition ml-1"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          )}

          {/* Basket */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#2e1a55] text-xs font-bold border border-purple-200 transition"
          >
            <i className="fa-solid fa-basket-shopping text-[#0153a2]"></i>
            <span>Basket</span>
            {cartCount > 0 && (
              <span className="bg-[#00a651] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Book Token */}
          <button
            onClick={() => onBookClick('General Consultation')}
            className="bg-[#00a651] hover:bg-[#008f45] active:scale-95 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-xs shadow-[#00a651]/20 transition flex items-center gap-1.5"
          >
            <i className="fa-solid fa-calendar-check text-[11px]"></i>
            <span>Book Token</span>
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Cart Icon on Mobile */}
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

          {/* Mobile Menu Hamburger */}
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
        <div className="lg:hidden bg-white border-b border-purple-100 px-4 py-3 space-y-1 text-sm font-semibold shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2 px-3 rounded-xl transition flex items-center justify-between ${
                activePage === item.id
                  ? 'bg-royal text-white font-bold'
                  : 'text-slate-700 hover:bg-purple-50'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}

          {/* Admin link only for logged in admin */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left py-2 px-3 rounded-xl transition flex items-center justify-between bg-purple-50 text-purple-900 font-bold"
            >
              <span>Admin Portal</span>
              <span className="text-[10px] bg-purple-200 px-2 py-0.5 rounded-full">Staff</span>
            </button>
          )}

          {/* Patient Account Pill & Logout Mobile */}
          {currentUser && currentUser.role !== 'admin' && (
            <div className="py-2.5 px-3 rounded-xl bg-purple-50 text-slate-800 text-xs flex items-center justify-between border border-purple-200 mt-2">
              <div className="flex items-center gap-2 truncate">
                <i className="fa-solid fa-circle-user text-royal text-sm"></i>
                <span className="font-bold truncate">{currentUser.name || currentUser.phone || 'Patient'}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-rose-600 font-bold hover:underline text-xs flex items-center gap-1"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-[10px]"></i>
                <span>Logout</span>
              </button>
            </div>
          )}

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
