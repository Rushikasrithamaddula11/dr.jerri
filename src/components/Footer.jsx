import React from 'react';
import { clinicInfo, doctors } from '../data/clinicData';

export default function Footer({ onBookClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-12 md:py-16 pb-24 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white text-lg">
                <i className="fa-solid fa-notes-medical"></i>
              </div>
              <span className="text-xl font-black text-white font-display">{clinicInfo.name}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Your trusted multi-speciality neighborhood polyclinic providing dedicated doctor OPDs, emergency saline, injections, blood testing and scanning.
            </p>
            <div className="pt-1">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold">
                Healthy You Always
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('services-section')} className="hover:text-teal-400 transition">
                  Clinical Services & Procedures
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('doctors-section')} className="hover:text-teal-400 transition">
                  Specialist Doctors
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('schedule-section')} className="hover:text-teal-400 transition">
                  Daily OPD Schedule
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('reviews-section')} className="hover:text-teal-400 transition">
                  Patient Reviews & Ratings
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact-section')} className="hover:text-teal-400 transition">
                  Clinic Location & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Specialist Doctors */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Our Doctors</h4>
            <ul className="space-y-1.5 text-xs">
              {doctors.map(d => (
                <li key={d.id} className="text-slate-300">
                  <span className="font-semibold text-white">{d.name}</span> ({d.specialty})
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Emergency & Location</h4>
            <p className="text-xs leading-relaxed text-slate-300">
              {clinicInfo.address}
            </p>
            <p className="text-xs text-emerald-400 font-bold">
              <i className="fa-solid fa-phone mr-1.5"></i>
              <a href={`tel:${clinicInfo.phone}`}>{clinicInfo.phone}</a>
            </p>
            <p className="text-xs text-slate-400">
              <i className="fa-regular fa-clock mr-1.5 text-teal-400"></i> Open 7 Days a Week
            </p>
            <div className="pt-2">
              <button
                onClick={() => onBookClick('General Consultation')}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 rounded-xl text-xs transition shadow"
              >
                Book Appointment Token
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 {clinicInfo.name}. All Rights Reserved.</p>
          <p className="text-slate-400">
            ECIL South Kamala Nagar, Hyderabad • Healthy You Always
          </p>
        </div>

      </div>
    </footer>
  );
}
