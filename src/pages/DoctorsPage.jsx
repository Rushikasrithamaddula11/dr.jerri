import React, { useState } from 'react';
import { clinicInfo, doctors } from '../data/clinicData';
import ScheduleSection from '../components/ScheduleSection';

export default function DoctorsPage({ onBookClick, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Doctors' },
    { id: 'gynaec', label: '⭐ Gynecology & Maternity' },
    { id: 'general', label: 'General Physicians' },
    { id: 'derma', label: 'Dermatology' },
    { id: 'pediatric', label: 'Pediatrics' },
  ];

  const filtered = doctors.filter((doc) => {
    if (activeCategory === 'all') return true;
    return doc.category === activeCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Clean Header */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
            Specialist Doctors Directory
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl mt-1">
            Consult experienced doctors daily at Dr. Jerri Clinic, ECIL South Kamala Nagar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 space-y-6">
        
        {/* Category Pills */}
        <div className="bg-white rounded-2xl p-3 shadow-md border border-purple-100 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-royal text-white shadow-xs'
                  : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((doc) => {
            const isGynac = doc.id === 'dr-supriya' || doc.category === 'gynaec';
            return (
              <div
                key={doc.id}
                id={doc.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all hover:shadow-md ${
                  isGynac ? 'border-royal shadow-sm' : 'border-purple-100'
                }`}
              >
                <div>
                  <div className="flex gap-3.5 items-start">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover object-top border border-purple-100 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      {isGynac && (
                        <span className="text-[10px] font-black text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md inline-block mb-1 border border-pink-200">
                          ⭐ Recommended: Maternity & Prenatal
                        </span>
                      )}

                      <h3 className="text-base font-black text-royal-dark leading-snug">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-purple-800 font-bold">
                        {doc.specialty}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">
                        <i className="fa-regular fa-clock text-royal mr-1 text-[10px]"></i>
                        {doc.timings}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                        ● {doc.availability}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-purple-50 flex flex-wrap gap-1.5">
                    {(doc.treatments || []).slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-50 text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="text-xs font-bold text-slate-600 hover:text-royal flex items-center gap-1 p-1"
                  >
                    <i className="fa-solid fa-phone text-[10px]"></i>
                    <span>{clinicInfo.phone}</span>
                  </a>

                  <button
                    onClick={() => onBookClick(`${doc.name} (${doc.specialty} - ${doc.timings})`)}
                    className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
                  >
                    Book Token
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Schedule Matrix */}
        <div className="pt-2">
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
