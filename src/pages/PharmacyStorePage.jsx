import React, { useState, useMemo } from 'react';
import { clinicInfo } from '../data/clinicData';
import { medicineCategories, medicinesList } from '../data/medicinesData';

export default function PharmacyStorePage({
  medicines = medicinesList,
  cart,
  onAddToCart,
  onUpdateQty,
  onOpenCart,
  onOpenPharmacyModal,
  onNavigate,
  currentUser,
  onLoginSuccess
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // If patient is not logged in, enforce authentication before accessing medicines & payment
  if (!currentUser) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-royal text-white flex items-center justify-center text-2xl mx-auto shadow-md">
            <i className="fa-solid fa-lock"></i>
          </div>
          <div>
            <span className="text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Patient Authentication Required
            </span>
            <h2 className="text-2xl font-black text-royal-dark font-display mt-2">
              Access Dr. Jerri Medicine Store
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              To browse our licensed pharmaceutical inventory, view discounted clinic pricing, and order doorstep delivery with UPI payment, please sign in with your mobile number.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onNavigate('login')}
              className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-royal/30 flex items-center justify-center gap-2"
            >
              <i className="fa-regular fa-user"></i>
              <span>Sign In to Your Account</span>
            </button>

            <button
              onClick={() => onNavigate('signup')}
              className="w-full bg-purple-50 hover:bg-purple-100 text-royal font-bold py-2.5 rounded-xl border border-purple-200 text-xs transition"
            >
              Create New Patient Account
            </button>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="text-slate-400 hover:text-royal font-bold text-xs"
          >
            ← Return to Clinic Home
          </button>
        </div>
      </div>
    );
  }

  const getCartQty = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.qty : 0;
  };

  const filteredMedicines = useMemo(() => {
    const source = medicines && medicines.length > 0 ? medicines : medicinesList;
    return source.filter((med) => {
      const matchesCat = selectedCategory === 'all' || med.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        med.name.toLowerCase().includes(q) ||
        med.composition.toLowerCase().includes(q) ||
        med.manufacturer.toLowerCase().includes(q)
      );
    });
  }, [medicines, selectedCategory, searchQuery]);

  const totalCartCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const totalCartAmount = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Clean Header */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-0.5 rounded-full text-xs font-semibold text-purple-200 mb-2 border border-white/15">
              <i className="fa-solid fa-store text-pink-300"></i> Dr. Jerri In-House Medical Pharmacy
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              Online Medicine Store
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-lg">
              Genuine medicines, maternity care, and emergency saline with fast doorstep delivery across ECIL.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCart}
              className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-2"
            >
              <i className="fa-solid fa-basket-shopping text-royal"></i>
              <span>Basket ({totalCartCount})</span>
            </button>

            <button
              onClick={() => onNavigate('logistics')}
              className="bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition border border-white/20 flex items-center gap-1.5"
            >
              <i className="fa-solid fa-truck-fast text-purple-200"></i>
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 space-y-6">
        
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-3 shadow-md border border-purple-100 flex items-center gap-3">
          <i className="fa-solid fa-magnifying-glass text-royal ml-2"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines (e.g. Dolo, Shelcal, Saline, Augmentin)..."
            className="w-full text-xs sm:text-sm text-royal-dark font-medium focus:outline-none placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 mr-2 text-xs"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>

        {/* Clean Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {medicineCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-royal text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-purple-50 border border-purple-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredMedicines.map((med) => {
            const qty = getCartQty(med.id);
            return (
              <div
                key={med.id}
                className="bg-white rounded-2xl border border-purple-100 p-3 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  {/* Clean Photo */}
                  <div className="relative h-28 sm:h-36 w-full rounded-xl overflow-hidden bg-purple-50 mb-2.5">
                    <img
                      src={med.image}
                      alt={med.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80';
                      }}
                    />
                    {med.discountPercent > 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-royal text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        {med.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-2 leading-snug">
                    {med.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {med.pack}
                  </p>
                </div>

                {/* Price and Add button */}
                <div className="mt-3 pt-2 border-t border-purple-50 flex items-center justify-between gap-1">
                  <div>
                    <span className="text-sm font-black text-royal font-mono">
                      ₹{med.price}
                    </span>
                    {med.mrp && (
                      <span className="text-[10px] text-slate-400 line-through ml-1">
                        ₹{med.mrp}
                      </span>
                    )}
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => onAddToCart(med)}
                      className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition"
                    >
                      + Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 bg-purple-50 p-0.5 rounded-lg border border-purple-200">
                      <button
                        onClick={() => onUpdateQty(med.id, qty - 1)}
                        className="w-5 h-5 rounded bg-white text-royal flex items-center justify-center text-[10px] font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-black text-royal px-1">
                        {qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(med.id, qty + 1)}
                        className="w-5 h-5 rounded bg-white text-royal flex items-center justify-center text-[10px] font-bold"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Upload Prescription Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg shrink-0">
              <i className="fa-solid fa-camera"></i>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-royal-dark">Have a Doctor's Prescription?</h4>
              <p className="text-[11px] text-slate-500">Send photo on WhatsApp to our pharmacist for immediate packing & delivery.</p>
            </div>
          </div>

          <button
            onClick={onOpenPharmacyModal}
            className="w-full sm:w-auto bg-purple-50 hover:bg-royal hover:text-white text-royal border border-purple-200 font-bold text-xs px-4 py-2 rounded-xl transition shrink-0"
          >
            Upload Prescription
          </button>
        </div>

      </div>

      {/* Floating Checkout Button on Mobile */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-16 lg:bottom-5 left-4 right-4 z-40 max-w-sm mx-auto bg-royal text-white p-3 rounded-2xl shadow-xl flex items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold">{totalCartCount} items • ₹{totalCartAmount}</span>
            <p className="text-[9px] text-purple-200">Express 30-45m Delivery</p>
          </div>
          <button
            onClick={onOpenCart}
            className="bg-white text-royal-dark font-black text-xs px-3.5 py-1.5 rounded-xl shadow-xs"
          >
            Checkout →
          </button>
        </div>
      )}

    </div>
  );
}
