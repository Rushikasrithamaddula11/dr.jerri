import React, { useState, useMemo } from 'react';
import { clinicInfo } from '../data/clinicData';
import { medicineCategories, medicinesList } from '../data/medicinesData';

export default function MedicineStoreSection({
  cart,
  onAddToCart,
  onUpdateQty,
  onOpenCart,
  onOpenTracker,
  onOpenPharmacyModal
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart quantity lookup helper
  const getCartQty = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.qty : 0;
  };

  const filteredMedicines = useMemo(() => {
    return medicinesList.filter((med) => {
      const matchesCat = selectedCategory === 'all' || med.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        med.name.toLowerCase().includes(q) ||
        med.composition.toLowerCase().includes(q) ||
        med.manufacturer.toLowerCase().includes(q) ||
        (med.desc && med.desc.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const totalCartCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const totalCartAmount = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <section id="pharmacy-store-section" className="py-8 md:py-14 bg-white border-b border-royal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-200">
              <i className="fa-solid fa-store text-royal"></i> Dr. Jerri Online Medicine Store
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-royal-dark font-display tracking-tight">
              Order Genuine Medicines & Maternity Essentials
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              100% authentic pharmacy medications, Dr. Supriya recommended prenatal care, emergency saline IV bottles, fever relief, and chronic health supplies with fast delivery across ECIL.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenTracker}
              className="bg-purple-50 hover:bg-purple-100 text-royal-dark border border-purple-200 font-bold px-3.5 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-truck-fast text-royal"></i>
              <span>Live Order Tracker</span>
            </button>

            <button
              onClick={onOpenCart}
              className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-royal/20 transition flex items-center gap-2"
            >
              <i className="fa-solid fa-basket-shopping text-sm"></i>
              <span>Medicine Basket</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-royal-dark text-[11px] font-black px-2 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Highlight Banner: Maternity & Prenatal Care Recommended by Dr. Supriya */}
        <div className="bg-gradient-to-r from-royal via-purple-800 to-royal-dark rounded-3xl p-5 sm:p-6 text-white mb-8 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0 text-pink-200">
                <i className="fa-solid fa-person-pregnant"></i>
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-200 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">
                  ⭐ Recommended by Dr. Supriya (Gynecologist)
                </span>
                <h3 className="text-base sm:text-xl font-black font-display text-white mt-1">
                  Maternity & Prenatal Care Package
                </h3>
                <p className="text-xs text-purple-100 max-w-xl">
                  Essential pregnancy supplements: Shelcal XT Calcium, Orofer XT Iron, Folvite Folic Acid, and Pregnacare Vitamins formulated for healthy baby development and maternal wellness.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCategory('maternity')}
              className="bg-white hover:bg-purple-50 active:scale-95 text-royal-dark font-black px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition shadow shrink-0 flex items-center gap-2"
            >
              <span>View Maternity Care</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Search Box */}
          <div className="max-w-xl">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-royal text-xs sm:text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines (e.g. Shelcal, Dolo, Saline, Augmentin, Paracetamol)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
            {medicineCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-royal text-white shadow-royal/30'
                    : 'bg-purple-50 hover:bg-purple-100 text-royal-dark border border-purple-200'
                }`}
              >
                <i className={`${cat.icon} text-[11px]`}></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredMedicines.map((med) => {
            const qty = getCartQty(med.id);
            return (
              <div
                key={med.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-200 shadow-xs hover:shadow-lg hover:border-royal transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Tags */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-royal border border-purple-200 truncate">
                      {med.badge || (med.rxRequired ? 'Rx Required' : 'OTC')}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold truncate">
                      {med.manufacturer}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-royal-subtle text-royal flex items-center justify-center text-base shrink-0 group-hover:scale-105 group-hover:bg-royal group-hover:text-white transition">
                      <i className={med.icon || 'fa-solid fa-tablets'}></i>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-xs sm:text-sm text-royal-dark font-display leading-snug">
                        {med.name}
                      </h3>
                      <p className="text-[10px] text-purple-800 font-semibold truncate">
                        {med.pack}
                      </p>
                    </div>
                  </div>

                  {/* Composition / Salt */}
                  <div className="bg-purple-50/50 p-2 rounded-xl border border-purple-100 text-[10px] text-slate-600 mb-3">
                    <span className="font-bold text-slate-800 block text-[9px] uppercase">Composition:</span>
                    <p className="line-clamp-2">{med.composition}</p>
                  </div>

                  {/* Dosage tip */}
                  {med.dosage && (
                    <p className="text-[10px] text-slate-500 italic mb-3 line-clamp-2">
                      "{med.dosage}"
                    </p>
                  )}
                </div>

                {/* Pricing & Add to Cart Action */}
                <div className="pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-royal font-mono">
                        ₹{med.price}
                      </span>
                      {med.mrp && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{med.mrp}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 block">
                      Save {med.discountPercent}% OFF
                    </span>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(med)}
                      className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i>
                      <span>Add to Cart</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-purple-50 p-1 rounded-xl border border-purple-200">
                      <button
                        onClick={() => onUpdateQty(med.id, qty - 1)}
                        className="w-6 h-6 rounded-lg bg-white text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-xs"
                      >
                        <i className="fa-solid fa-minus text-[9px]"></i>
                      </button>
                      <span className="text-xs font-black text-royal-dark px-1.5 min-w-[18px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(med.id, qty + 1)}
                        className="w-6 h-6 rounded-lg bg-white text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-xs"
                      >
                        <i className="fa-solid fa-plus text-[9px]"></i>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredMedicines.length === 0 && (
          <div className="bg-purple-50/50 rounded-3xl p-8 text-center border border-purple-200">
            <i className="fa-solid fa-magnifying-glass text-3xl text-purple-400 mb-2"></i>
            <h4 className="text-sm font-bold text-royal-dark">No medicines found matching "{searchQuery}"</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Need a specific medicine or brand? Upload your doctor's slip directly to our pharmacist.
            </p>
            <button
              onClick={onOpenPharmacyModal}
              className="bg-royal hover:bg-royal-dark text-white font-bold text-xs px-4 py-2 rounded-xl transition"
            >
              WhatsApp Prescription to Pharmacist
            </button>
          </div>
        )}

        {/* Sticky Mobile Cart Bar if cart has items */}
        {totalCartCount > 0 && (
          <div className="fixed bottom-16 lg:bottom-4 left-4 right-4 z-40 max-w-xl mx-auto bg-gradient-to-r from-royal via-purple-800 to-royal-dark text-white p-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-3 animate-in slide-in-from-bottom">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black">
                <span className="bg-white text-royal-dark px-2 py-0.5 rounded-md text-[11px] font-black">
                  {totalCartCount} Items
                </span>
                <span className="text-sm font-mono text-purple-100">
                  ₹{totalCartAmount}
                </span>
              </div>
              <p className="text-[10px] text-purple-200">
                Express 30-45m Doorstep Delivery
              </p>
            </div>

            <button
              onClick={onOpenCart}
              className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black text-xs px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5 shrink-0"
            >
              <span>View Cart & Pay</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
