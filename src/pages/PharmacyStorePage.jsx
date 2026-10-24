import React, { useState, useMemo } from 'react';
import { clinicInfo } from '../data/clinicData';
import { medicineCategories, medicinesList, categoryVisuals } from '../data/medicinesData';

export default function PharmacyStorePage({
  cart,
  onAddToCart,
  onUpdateQty,
  onOpenCart,
  onOpenTracker,
  onOpenPharmacyModal,
  onNavigate
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const getCartQty = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.qty : 0;
  };

  const filteredMedicines = useMemo(() => {
    let list = medicinesList.filter((med) => {
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

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      list = [...list].sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const totalCartAmount = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const currentCategoryVisual = categoryVisuals[selectedCategory];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Pharmacy Hero Banner with Real Photo */}
      <div className="relative bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white overflow-hidden py-10 md:py-16 border-b border-purple-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&auto=format&fit=crop&q=80"
            alt="Dr. Jerri Medical Store"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-purple-200 border border-white/20">
              <i className="fa-solid fa-store text-pink-300"></i>
              <span>Dr. Jerri In-House 24/7 Medical Pharmacy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Online Medicine Store & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white">
                Doorstep Delivery in 45 Mins
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
              Order 100% genuine doctor-prescribed medications, Dr. Supriya recommended prenatal vitamins, emergency saline IV bottles, fever relief, and everyday wellness supplies with <strong>instant UPI payment via {clinicInfo.upiId}</strong>.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenCart}
                className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2"
              >
                <i className="fa-solid fa-basket-shopping text-royal"></i>
                <span>Open Medicine Basket ({totalCartCount})</span>
              </button>

              <button
                onClick={() => onNavigate('logistics')}
                className="bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold px-4 py-3 rounded-2xl text-xs sm:text-sm transition border border-white/20 flex items-center gap-2 backdrop-blur-md"
              >
                <i className="fa-solid fa-truck-fast text-purple-200"></i>
                <span>Track Live Logistics</span>
              </button>

              <button
                onClick={onOpenPharmacyModal}
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold px-4 py-3 rounded-2xl text-xs sm:text-sm transition border border-white/15 flex items-center gap-2"
              >
                <i className="fa-brands fa-whatsapp text-pink-300 text-base"></i>
                <span>WhatsApp Prescription</span>
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-purple-200">
              <span className="flex items-center gap-1.5 font-bold">
                <i className="fa-solid fa-circle-check text-purple-300"></i> 100% Genuine Medicines
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <i className="fa-solid fa-circle-check text-purple-300"></i> UPI Pay: {clinicInfo.upiId}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <i className="fa-solid fa-circle-check text-purple-300"></i> Free Delivery above ₹300
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        
        {/* Search & Sort Controls Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-3 mb-8">
          
          <div className="relative w-full md:w-96">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-royal text-sm"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by medicine name, salt or brand..."
              className="w-full pl-10 pr-8 py-2.5 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-royal transition font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-royal-dark text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-bold text-slate-500 shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-purple-50 border border-purple-200 text-royal-dark font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-royal"
            >
              <option value="popular">Most Popular</option>
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Featured Dr. Supriya Maternity & Prenatal Care Recommended Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-royal to-purple-800 rounded-3xl p-5 sm:p-6 text-white mb-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80"
                alt="Maternity & Prenatal Care"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-pink-200 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/15">
                ⭐ Gynecologist Recommended: Dr. Supriya
              </span>
              <h2 className="text-lg sm:text-2xl font-black font-display text-white mt-1">
                Maternity & Prenatal Care Essentials
              </h2>
              <p className="text-xs text-purple-100 max-w-xl mt-0.5">
                Shelcal XT Calcium, Orofer XT Iron, Folvite Folic Acid, and Pregnacare mother & baby supplements. Essential for healthy embryonic growth and maternal strength.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategory('maternity')}
            className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl transition shadow shrink-0"
          >
            Filter Maternity Items
          </button>
        </div>

        {/* Category Pills Navigation (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-3 mb-6">
          {medicineCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-royal text-white shadow-md shadow-royal/30'
                  : 'bg-white hover:bg-purple-50 text-royal-dark border border-purple-200'
              }`}
            >
              <i className={`${cat.icon} text-xs`}></i>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid with Pictures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredMedicines.map((med) => {
            const qty = getCartQty(med.id);
            return (
              <div
                key={med.id}
                className="bg-white rounded-3xl overflow-hidden border border-purple-200 shadow-xs hover:shadow-xl hover:border-royal transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Product Picture Container */}
                  <div className="relative h-44 sm:h-48 w-full bg-purple-50 overflow-hidden">
                    <img
                      src={med.image}
                      alt={med.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80';
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>

                    {/* Category & Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-royal-dark shadow-xs">
                        {med.badge || (med.rxRequired ? 'Rx Required' : 'OTC')}
                      </span>
                      <span className="text-[10px] font-black text-white bg-royal/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        {med.discountPercent}% OFF
                      </span>
                    </div>

                    {/* Pack size bottom strip */}
                    <div className="absolute bottom-2 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {med.pack}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 sm:p-5">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                      {med.manufacturer}
                    </div>

                    <h3 className="font-black text-sm sm:text-base text-royal-dark font-display leading-snug mb-1.5">
                      {med.name}
                    </h3>

                    {/* Active Salt Composition */}
                    <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 text-[10px] text-slate-600 mb-2.5">
                      <strong className="text-slate-800 block text-[9px] uppercase">Composition:</strong>
                      <p className="line-clamp-2 leading-relaxed">{med.composition}</p>
                    </div>

                    {/* Short Usage Description */}
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {med.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Pricing & Add to Cart Action */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-black text-royal font-mono">
                          ₹{med.price}
                        </span>
                        {med.mrp && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{med.mrp}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-bold text-emerald-600 block">
                        Save ₹{Math.round((med.mrp || med.price * 1.2) - med.price)}
                      </span>
                    </div>

                    {qty === 0 ? (
                      <button
                        onClick={() => onAddToCart(med)}
                        className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm shadow-royal/20 flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-plus text-[10px]"></i>
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-purple-50 p-1 rounded-xl border border-purple-200">
                        <button
                          onClick={() => onUpdateQty(med.id, qty - 1)}
                          className="w-7 h-7 rounded-lg bg-white text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-xs"
                          aria-label="Decrease"
                        >
                          <i className="fa-solid fa-minus text-[10px]"></i>
                        </button>
                        <span className="text-xs font-black text-royal-dark px-2 min-w-[20px] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(med.id, qty + 1)}
                          className="w-7 h-7 rounded-lg bg-white text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-xs"
                          aria-label="Increase"
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Prescription Direct Upload Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-royal flex items-center justify-center text-2xl shrink-0">
              <i className="fa-solid fa-prescription"></i>
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-royal-dark font-display">
                Have a Doctor's Prescription?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-xl leading-relaxed">
                Send a quick picture of your doctor's slip to our pharmacy desk via WhatsApp. Our licensed pharmacist will verify, pack, and calculate your total with instant UPI payment.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPharmacyModal}
            className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition shadow-md shadow-royal/30 shrink-0 flex items-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            <span>Upload on WhatsApp</span>
          </button>
        </div>

      </div>

      {/* Floating Cart Button on Mobile if items present */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-16 lg:bottom-5 left-4 right-4 z-40 max-w-md mx-auto bg-gradient-to-r from-royal via-purple-800 to-royal-dark text-white p-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-3 animate-in slide-in-from-bottom">
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
              UPI Gateway: {clinicInfo.upiId} • 45m Express
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black text-xs px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5 shrink-0"
          >
            <span>Checkout</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}

    </div>
  );
}
