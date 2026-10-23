import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function DoctorsSection({ doctors, onBookClick, onViewFlyer }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Specialists' },
    { id: 'general', label: 'General Physicians' },
    { id: 'gynaec', label: 'Gynaecology & Maternity' },
    { id: 'derma', label: 'Dermatology (Skin & Hair)' },
    { id: 'pediatric', label: 'Pediatrics (Child Care)' },
  ];

  const filtered = doctors.filter((doc) => {
    if (activeCategory === 'all') return true;
    return doc.category === activeCategory;
  });

  return (
    <section id="doctors-section" className="py-8 md:py-14 bg-royal-subtle border-b border-royal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-white px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-200">
              <i className="fa-solid fa-user-doctor text-royal"></i> Qualified Specialists
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-royal-dark font-display tracking-tight">
              Consult Our Expert Doctors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Daily OPD consultations with experienced General Physicians, Gynaecologists, Dermatologists, and Pediatricians.
            </p>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                activeCategory === cat.id
                  ? 'bg-royal text-white shadow-royal/30'
                  : 'bg-white text-royal-dark hover:bg-purple-100 border border-purple-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Doctors Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              id={doc.id}
              className="bg-white rounded-3xl border border-purple-200 shadow-sm hover:shadow-xl hover:border-royal transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Head Info */}
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
                    <p className="text-xs text-purple-800 font-semibold">
                      {doc.specialty}
                    </p>

                    <div className="mt-2.5 inline-flex items-center gap-1.5 bg-purple-50 text-royal-dark text-[11px] font-bold px-2.5 py-1 rounded-lg border border-purple-200">
                      <i className="fa-regular fa-clock text-royal"></i>
                      <span>{doc.timings}</span>
                    </div>

                    <div className="mt-1 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{doc.availability}</span>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Quote */}
                <div className="px-5 pb-2 text-[11px] text-purple-900 italic font-medium">
                  "{doc.subtitle}"
                </div>

                {/* Treatments List */}
                <div className="px-5 pb-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Focus Areas & Treatments:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.treatments.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-royal-subtle hover:bg-purple-100 text-royal-dark text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-purple-100 transition"
                      >
                        {t}
                      </span>
                    ))}
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
                  <span>View Poster</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="w-8 h-8 rounded-xl bg-white border border-purple-200 text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-sm"
                    title="Call Clinic"
                  >
                    <i className="fa-solid fa-phone"></i>
                  </a>
                  <button
                    onClick={() => onBookClick(`${doc.name} (${doc.specialty} - ${doc.timings})`)}
                    className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <i className="fa-regular fa-calendar-check text-[11px]"></i>
                    <span>Book Token</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
