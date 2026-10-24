import React from 'react';
import Hero from '../components/Hero';
import DoctorsSection from '../components/DoctorsSection';
import DiagnosticsSection from '../components/DiagnosticsSection';
import PharmacySection from '../components/PharmacySection';
import ServicesSection from '../components/ServicesSection';
import ScheduleSection from '../components/ScheduleSection';
import ReviewsSection from '../components/ReviewsSection';
import LocationSection from '../components/LocationSection';
import FAQSection from '../components/FAQSection';
import { clinicInfo } from '../data/clinicData';
import { medicinesList } from '../data/medicinesData';

export default function HomePage({
  onBookClick,
  onPharmacyClick,
  onDiagnosticsClick,
  onViewFlyer,
  onSelectService,
  onNavigate,
  onAddToCart,
  filteredDoctors,
  filteredServices,
  searchQuery,
  setSearchQuery,
  onScrollToDoctor
}) {
  const featuredMeds = medicinesList.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <Hero
        onBookClick={onBookClick}
        onPharmacyClick={onPharmacyClick}
        onDiagnosticsClick={onDiagnosticsClick}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* 5 Multi-Page Navigation Quick Gateway Cards */}
      <div className="bg-white py-6 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            <button
              onClick={() => onNavigate('store')}
              className="bg-purple-50 hover:bg-royal hover:text-white group p-3.5 rounded-2xl border border-purple-200 text-left transition flex items-center gap-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-royal group-hover:bg-white/20 group-hover:text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                <i className="fa-solid fa-store"></i>
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs text-royal-dark group-hover:text-white truncate">Medicine Store</h4>
                <p className="text-[10px] text-purple-700 group-hover:text-purple-200 truncate">UPI Pay & Delivery</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('logistics')}
              className="bg-purple-50 hover:bg-royal hover:text-white group p-3.5 rounded-2xl border border-purple-200 text-left transition flex items-center gap-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-royal group-hover:bg-white/20 group-hover:text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs text-royal-dark group-hover:text-white truncate">Logistics & Track</h4>
                <p className="text-[10px] text-purple-700 group-hover:text-purple-200 truncate">Live GPS Dispatch</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('doctors')}
              className="bg-purple-50 hover:bg-royal hover:text-white group p-3.5 rounded-2xl border border-purple-200 text-left transition flex items-center gap-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-royal group-hover:bg-white/20 group-hover:text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs text-royal-dark group-hover:text-white truncate">Specialist Doctors</h4>
                <p className="text-[10px] text-purple-700 group-hover:text-purple-200 truncate">5 Daily OPDs</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('diagnostics')}
              className="bg-purple-50 hover:bg-royal hover:text-white group p-3.5 rounded-2xl border border-purple-200 text-left transition flex items-center gap-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-royal group-hover:bg-white/20 group-hover:text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                <i className="fa-solid fa-microscope"></i>
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs text-royal-dark group-hover:text-white truncate">Diagnostics Lab</h4>
                <p className="text-[10px] text-purple-700 group-hover:text-purple-200 truncate">Blood Tests & Scans</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('services')}
              className="col-span-2 sm:col-span-1 bg-purple-50 hover:bg-royal hover:text-white group p-3.5 rounded-2xl border border-purple-200 text-left transition flex items-center gap-3 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-royal group-hover:bg-white/20 group-hover:text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
                <i className="fa-solid fa-bottle-droplet"></i>
              </div>
              <div className="min-w-0">
                <h4 className="font-black text-xs text-royal-dark group-hover:text-white truncate">Saline & Injections</h4>
                <p className="text-[10px] text-purple-700 group-hover:text-purple-200 truncate">Walk-in Procedures</p>
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Online Medicine Store Teaser with Real Photos */}
      <section className="py-10 md:py-14 bg-white border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-royal bg-purple-100 px-2.5 py-0.5 rounded-md">
                E-Commerce Medicine Store
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-royal-dark font-display tracking-tight mt-1">
                Popular Medicines & Maternity Supplies
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Genuine medicines sourced directly from top pharmaceutical manufacturers with instant UPI payment via <strong>{clinicInfo.upiId}</strong>.
              </p>
            </div>

            <button
              onClick={() => onNavigate('store')}
              className="bg-royal hover:bg-royal-dark text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md shadow-royal/20 transition flex items-center gap-2 self-start md:self-auto"
            >
              <span>Visit Full Medical Store</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredMeds.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-3xl overflow-hidden border border-purple-200 shadow-xs hover:shadow-lg hover:border-royal transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-purple-50">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-royal/90 text-white text-[9px] font-black px-2 py-0.5 rounded">
                      {med.discountPercent}% OFF
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{med.manufacturer}</span>
                    <h3 className="font-bold text-xs sm:text-sm text-royal-dark mt-0.5 mb-1 leading-snug">{med.name}</h3>
                    <p className="text-[10px] text-slate-500 line-clamp-2">{med.desc}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-black text-royal font-mono">₹{med.price}</span>
                      <span className="text-[10px] text-slate-400 line-through ml-1.5">₹{med.mrp}</span>
                    </div>
                    <button
                      onClick={() => onAddToCart(med)}
                      className="bg-royal hover:bg-royal-dark text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Realtime Logistics Teaser Banner */}
      <section className="py-8 bg-gradient-to-r from-royal via-purple-800 to-royal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-pink-200 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/20">
                  Dedicated Logistics Hub
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                  Realtime Order & Delivery Tracking
                </h3>
                <p className="text-xs text-purple-100 max-w-xl">
                  Track your medicine packages in live real-time with GPS transit, rider contact details, and automated delivery milestone logs.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('logistics')}
              className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black text-xs sm:text-sm px-6 py-3 rounded-2xl transition shadow-lg shrink-0 flex items-center gap-2"
            >
              <i className="fa-solid fa-crosshairs text-royal"></i>
              <span>Open Logistics Hub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Specialist Doctors Section Preview */}
      <DoctorsSection
        doctors={filteredDoctors}
        onBookClick={onBookClick}
        onViewFlyer={onViewFlyer}
      />

      {/* Diagnostics Section Preview */}
      <DiagnosticsSection
        onBookDiagnostics={onDiagnosticsClick}
      />

      {/* Clinical Procedures Preview */}
      <ServicesSection
        filteredServices={filteredServices}
        onSelectService={onSelectService}
        onBookService={onBookClick}
      />

      {/* OPD Timings Matrix */}
      <ScheduleSection
        onBookClick={onBookClick}
        onScrollToDoctor={onScrollToDoctor}
      />

      {/* Reviews */}
      <ReviewsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Location */}
      <LocationSection />

    </div>
  );
}
