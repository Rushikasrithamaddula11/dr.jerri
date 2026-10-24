import React, { useState } from 'react';
import { clinicInfo, doctors } from '../data/clinicData';
import ScheduleSection from '../components/ScheduleSection';

export default function DoctorsPage({ onBookClick, onViewFlyer, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Specialists' },
    { id: 'gynaec', label: '⭐ Gynecology & Maternity (Recommended)' },
    { id: 'general', label: 'General Physicians' },
    { id: 'derma', label: 'Dermatology (Skin & Hair)' },
    { id: 'pediatric', label: 'Pediatrics (Child Care)' },
  ];

  const filtered = doctors.filter((doc) => {
    if (activeCategory === 'all') return true;
    return doc.category === activeCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-12 md:py-16 border-b border-purple-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-purple-200">
              <i className="fa-solid fa-user-doctor text-pink-300"></i> Qualified Medical Faculty
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Specialist Doctors & Daily OPD
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
              Consult 5+ specialist doctors daily at Dr. Jerri Poly Clinic. Walk-ins welcomed and priority online tokens available for General Medicine, Gynecology, Dermatology, and Pediatrics.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-10 space-y-8">
        
        {/* Category Filter Pills Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-purple-200 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                activeCategory === cat.id
                  ? 'bg-royal text-white shadow-md shadow-royal/30'
                  : 'bg-purple-50 hover:bg-purple-100 text-royal-dark border border-purple-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Doctors Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => {
            const isGynac = doc.id === 'dr-supriya' || doc.category === 'gynaec';
            return (
              <div
                key={doc.id}
                id={doc.id}
                className={`bg-white rounded-3xl border shadow-sm hover:shadow-xl hover:border-royal transition-all overflow-hidden flex flex-col justify-between group relative ${
                  isGynac ? 'border-2 border-royal shadow-purple-200/50' : 'border-purple-200'
                }`}
              >
                {/* Recommended Badge for Gynecology (Dr. Supriya) */}
                {isGynac && (
                  <div className="bg-gradient-to-r from-royal via-purple-700 to-pink-600 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider py-1.5 px-4 text-center shadow-sm flex items-center justify-center gap-1.5">
                    <i className="fa-solid fa-star text-amber-300 text-[10px]"></i>
                    <span>Recommended: Maternity & Prenatal Checkup</span>
                  </div>
                )}

                <div>
                  <div className="p-5 flex gap-4 items-start">
                    <div className="relative w-24 h-32 rounded-2xl overflow-hidden bg-purple-50 shrink-0 border border-purple-200 shadow-inner">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-1.5 bg-royal/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                        {doc.qualifications}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-royal bg-purple-100 px-2.5 py-0.5 rounded-md truncate border border-purple-200">
                          {doc.categoryLabel}
                        </span>
                        {doc.regNo && (
                          <span className="text-[10px] text-purple-700 font-mono shrink-0">
                            {doc.regNo}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-royal-dark font-display leading-snug">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-purple-800 font-semibold truncate">
                        {doc.specialty}
                      </p>

                      <div className="mt-2 inline-flex items-center gap-1.5 bg-purple-50 text-royal-dark text-[11px] font-bold px-2.5 py-1 rounded-lg border border-purple-200 max-w-full">
                        <i className="fa-regular fa-clock text-royal text-[10px] shrink-0"></i>
                        <span className="truncate">{doc.timings}</span>
                      </div>

                      <div className="mt-1 text-[11px] text-royal font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal shrink-0"></span>
                        <span className="truncate">{doc.availability}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtitle / Quote */}
                  <div className="px-5 pb-2 text-xs text-purple-900 italic font-medium leading-relaxed">
                    "{doc.subtitle}"
                  </div>

                  {/* Treatments List */}
                  <div className="px-5 pb-5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Focus Areas & Treatments:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.treatments.map((t, idx) => {
                        const isRecommendedItem = t.toLowerCase().includes('maternity') || t.toLowerCase().includes('prenatal');
                        return (
                          <span
                            key={idx}
                            className={`text-[11px] font-medium px-2.5 py-1 rounded-md border transition ${
                              isRecommendedItem
                                ? 'bg-purple-100 text-royal font-extrabold border-royal/40 shadow-xs ring-1 ring-royal/20'
                                : 'bg-royal-subtle hover:bg-purple-100 text-royal-dark border-purple-100'
                            }`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="bg-purple-50/70 border-t border-purple-100 p-3.5 px-5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewFlyer(doc.flyer, `${doc.name} - ${doc.specialty}`)}
                    className="text-xs font-bold text-royal hover:text-royal-dark flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-white transition"
                  >
                    <i className="fa-regular fa-image"></i>
                    <span>Poster</span>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${clinicInfo.phone}`}
                      className="w-9 h-9 rounded-xl bg-white border border-purple-200 text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-sm shrink-0"
                      title="Call Clinic"
                    >
                      <i className="fa-solid fa-phone text-xs"></i>
                    </a>
                    <button
                      onClick={() => onBookClick(`${doc.name} (${doc.specialty} - ${doc.timings})`)}
                      className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
                    >
                      <i className="fa-regular fa-calendar-check text-[11px]"></i>
                      <span>Book Token</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Schedule Matrix Component */}
        <div className="pt-4">
          <ScheduleSection
            onBookClick={onBookClick}
            onScrollToDoctor={(id) => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          />
        </div>

      </div>

    </div>
  );
}
