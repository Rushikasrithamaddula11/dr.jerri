import React from 'react';
import Hero from '../components/Hero';
import DoctorsSection from '../components/DoctorsSection';
import DiagnosticsSection from '../components/DiagnosticsSection';
import ServicesSection from '../components/ServicesSection';
import ReviewsSection from '../components/ReviewsSection';
import LocationSection from '../components/LocationSection';
import FAQSection from '../components/FAQSection';
import { clinicInfo } from '../data/clinicData';
import { medicinesList } from '../data/medicinesData';

export default function HomePage({
  onBookClick,
  onDiagnosticsClick,
  onViewFlyer,
  onSelectService,
  onNavigate,
  onAddToCart,
  filteredDoctors,
  filteredServices,
  searchQuery,
  setSearchQuery
}) {
  const featuredMeds = medicinesList.slice(0, 4);

  return (
    <div>
      {/* Clean Hero with 4 Action Cards */}
      <Hero
        onBookClick={onBookClick}
        onNavigate={onNavigate}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Online Medicine Store Preview (Clean, 4 items) */}
      <section className="py-10 bg-white border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-royal-dark font-display tracking-tight">
                Online Medicine Store
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Genuine medicines & maternity supplies delivered to your doorstep in 30-45 mins.
              </p>
            </div>

            <button
              onClick={() => onNavigate('store')}
              className="text-xs font-bold text-royal hover:underline flex items-center gap-1"
            >
              <span>View All Medicines</span>
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {featuredMeds.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-2xl border border-purple-100 p-3 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="relative h-28 sm:h-36 w-full rounded-xl overflow-hidden bg-purple-50 mb-2">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 bg-royal text-white text-[9px] font-black px-1.5 py-0.2 rounded">
                      {med.discountPercent}% OFF
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-800 line-clamp-1">{med.name}</h3>
                  <p className="text-[10px] text-slate-400 truncate">{med.pack}</p>
                </div>

                <div className="mt-2 pt-2 border-t border-purple-50 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-black text-royal font-mono">₹{med.price}</span>
                  <button
                    onClick={() => onAddToCart(med)}
                    className="bg-royal hover:bg-royal-dark text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Specialist Doctors Section (Clean) */}
      <DoctorsSection
        doctors={filteredDoctors}
        onBookClick={onBookClick}
        onViewFlyer={onViewFlyer}
      />

      {/* Diagnostics Section */}
      <DiagnosticsSection
        onBookDiagnostics={onDiagnosticsClick}
      />

      {/* Clinical Procedures Preview */}
      <ServicesSection
        filteredServices={filteredServices}
        onSelectService={onSelectService}
        onBookService={onBookClick}
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
