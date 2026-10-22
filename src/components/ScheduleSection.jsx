import React from 'react';
import { doctors } from '../data/clinicData';

export default function ScheduleSection({ onBookClick, onScrollToDoctor }) {
  return (
    <section id="schedule-section" className="py-8 md:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
            <i className="fa-regular fa-calendar-days text-[11px]"></i> Doctor Availability
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">
            Daily OPD Consultation Schedule
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Choose your preferred doctor's consultation slot. Tokens are allocated on first-come or pre-booked basis.
          </p>
        </div>

        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto shadow-sm rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-100/90 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Doctor Name & Specialty</th>
                <th className="py-3.5 px-6">Qualifications</th>
                <th className="py-3.5 px-6">OPD Timings</th>
                <th className="py-3.5 px-6">Days / Availability</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.photo}
                        alt={doc.name}
                        className="w-10 h-10 rounded-xl object-cover object-top border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{doc.name}</div>
                        <div className="text-slate-500 text-[11px]">{doc.specialty}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-semibold">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">{doc.qualifications}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center gap-1.5 font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/60">
                      <i className="fa-regular fa-clock text-teal-600"></i>
                      <span>{doc.timings}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {doc.availability}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => onScrollToDoctor(doc.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold transition text-[11px]"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => onBookClick(`${doc.name} (${doc.specialty} - ${doc.timings})`)}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition shadow-sm text-[11px]"
                    >
                      Book Token
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Schedule Cards (Visible only on mobile screens) */}
        <div className="md:hidden space-y-2.5">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-12 h-14 rounded-xl object-cover object-top border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate">{doc.name}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{doc.specialty}</p>
                  <p className="text-[11px] font-bold text-teal-700 mt-1 flex items-center gap-1">
                    <i className="fa-regular fa-clock text-[10px]"></i>
                    <span>{doc.timings}</span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-1.5">
                <button
                  onClick={() => onBookClick(`${doc.name} (${doc.timings})`)}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-sm transition"
                >
                  Book
                </button>
                <button
                  onClick={() => onScrollToDoctor(doc.id)}
                  className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-1 rounded-lg text-center"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
