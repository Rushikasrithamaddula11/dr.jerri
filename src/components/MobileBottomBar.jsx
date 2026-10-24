import React from 'react';

export default function MobileBottomBar({
  activePage = 'home',
  onNavigate,
  onBookClick,
  onOpenCart,
  cartCount = 0
}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-200 shadow-[0_-4px_20px_rgba(58,32,129,0.12)] pt-1.5 pb-2 px-2 flex items-center justify-around gap-1">
      
      {/* Home */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition ${
          activePage === 'home'
            ? 'text-royal font-black bg-purple-50'
            : 'text-slate-600 hover:text-royal'
        }`}
      >
        <i className="fa-solid fa-house text-sm mb-0.5"></i>
        <span className="text-[10px]">Home</span>
      </button>

      {/* Online Medicine Store */}
      <button
        onClick={() => onNavigate('store')}
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition relative ${
          activePage === 'store'
            ? 'text-royal font-black bg-purple-50'
            : 'text-slate-600 hover:text-royal'
        }`}
      >
        <i className="fa-solid fa-store text-sm mb-0.5"></i>
        <span className="text-[10px]">Store</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-pink-500"></span>
        )}
      </button>

      {/* Live Logistics */}
      <button
        onClick={() => onNavigate('logistics')}
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition ${
          activePage === 'logistics'
            ? 'text-royal font-black bg-purple-50'
            : 'text-slate-600 hover:text-royal'
        }`}
      >
        <i className="fa-solid fa-truck-fast text-sm mb-0.5"></i>
        <span className="text-[10px]">Logistics</span>
      </button>

      {/* Specialist Doctors */}
      <button
        onClick={() => onNavigate('doctors')}
        className={`flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition ${
          activePage === 'doctors'
            ? 'text-royal font-black bg-purple-50'
            : 'text-slate-600 hover:text-royal'
        }`}
      >
        <i className="fa-solid fa-user-doctor text-sm mb-0.5"></i>
        <span className="text-[10px]">Doctors</span>
      </button>

      {/* Book Token Primary Button */}
      <button
        onClick={() => onBookClick('General Consultation')}
        className="flex-[1.2] flex items-center justify-center gap-1 py-2.5 rounded-xl bg-gradient-to-r from-royal via-purple-700 to-royal-dark active:scale-95 text-white font-black text-xs shadow-md shadow-royal/30 transition"
      >
        <i className="fa-regular fa-calendar-check text-[11px]"></i>
        <span>Book</span>
      </button>

    </div>
  );
}
