import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

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

          {/* User Auth Info / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 px-2.5 py-1.5 rounded-xl text-xs">
              <div className="w-6 h-6 rounded-full bg-royal text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name ? currentUser.name.charAt(0) : 'P'}
              </div>
              <span className="font-bold text-royal-dark truncate max-w-[90px]">
                {currentUser.name.split(' ')[0]}
              </span>
              <button
                onClick={onLogout}
                className="text-slate-400 hover:text-rose-600 transition ml-1 p-0.5"
                title="Sign Out"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-[11px]"></i>
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                activePage === 'login'
                  ? 'bg-royal text-white border-royal'
                  : 'text-royal-dark hover:bg-purple-50 border-purple-200'
              }`}
            >
              <i className="fa-regular fa-user text-royal"></i>
              <span>Sign In</span>
            </button>
          )}

          {/* Basket */}
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

          {/* Book Token */}
          <button
            onClick={() => onBookClick('General Consultation')}
            className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow-sm transition"
          >
            Book Token
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Quick User / Auth Icon on Mobile */}
          <button
            onClick={() => handleNavClick(currentUser ? 'home' : 'login')}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs border ${
              activePage === 'login' ? 'bg-royal text-white border-royal' : 'bg-purple-50 text-royal border-purple-200'
            }`}
            aria-label="Account"
            title={currentUser ? currentUser.name : 'Sign In'}
          >
            <i className={`fa-solid ${currentUser ? 'fa-user-check' : 'fa-user'}`}></i>
          </button>

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
          
          {/* User Status Bar in Mobile Menu */}
          <div className="pb-2 mb-2 border-b border-purple-100 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-royal text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block leading-tight">{currentUser.name}</span>
                    <span className="text-[10px] text-purple-700 uppercase font-black">{currentUser.role || 'Patient'}</span>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-xs text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="w-full bg-purple-50 text-royal font-bold py-2 rounded-xl border border-purple-200 text-xs flex items-center justify-center gap-1.5"
              >
                <i className="fa-regular fa-user"></i>
                <span>Sign In / Register Account</span>
              </button>
            )}
          </div>

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
