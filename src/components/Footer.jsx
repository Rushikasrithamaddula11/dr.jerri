import React from 'react';
import { clinicInfo, doctors } from '../data/clinicData';

export default function Footer({ onBookClick, onPharmacyClick, onDiagnosticsClick, onOpenCart, onOpenTracker }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-royal-deep text-purple-200 text-xs py-12 md:py-16 pb-24 md:pb-16 border-t border-purple-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-royal-light flex items-center justify-center text-white text-xl">
                <i className="fa-solid fa-notes-medical"></i>
              </div>
              <span className="text-xl font-black text-white font-display">{clinicInfo.name}</span>
            </div>
            <p className="text-purple-300 text-xs leading-relaxed">
              Multi-Speciality Clinic, Advanced Diagnostic Lab, Ultrasound Scanning, and 24/7 In-House Pharmacy & Online Medicine Store serving ECIL and South Kamala Nagar.
            </p>
            <div className="pt-1 flex flex-col gap-1.5">
              <span className="bg-purple-900/60 text-purple-200 border border-purple-700/60 px-3 py-1 rounded-full text-[11px] font-bold w-fit">
                Healthy You Always
              </span>
              <span className="text-[11px] text-purple-300">
                Official UPI Gateway: <strong className="text-white font-mono">{clinicInfo.upiId}</strong>
              </span>
            </div>
          </div>

          {/* Core Facilities */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Core Facilities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('pharmacy-store-section')} className="hover:text-white transition flex items-center gap-1.5 font-bold text-purple-100">
                  <i className="fa-solid fa-store text-pink-400"></i> Online Medicine Store & UPI Pay
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-white transition flex items-center gap-1.5">
                  <i className="fa-solid fa-truck-fast text-purple-400"></i> Realtime Logistics Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onDiagnosticsClick('Diagnostics')} className="hover:text-white transition flex items-center gap-1.5">
                  <i className="fa-solid fa-microscope text-purple-400"></i> Diagnostic Lab & Scans
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services-section')} className="hover:text-white transition flex items-center gap-1.5">
                  <i className="fa-solid fa-bottle-droplet text-purple-400"></i> Saline & IV Fluid Therapy
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services-section')} className="hover:text-white transition flex items-center gap-1.5">
                  <i className="fa-solid fa-syringe text-purple-400"></i> Injections & Vaccinations
                </button>
              </li>
            </ul>
          </div>

          {/* Specialist Doctors */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Specialist Doctors</h4>
            <ul className="space-y-1.5 text-xs">
              {doctors.map(d => (
                <li key={d.id} className="text-purple-300">
                  <span className="font-semibold text-white">{d.name}</span> ({d.specialty})
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Contact & Location</h4>
            <p className="text-xs leading-relaxed text-purple-300">
              {clinicInfo.address}
            </p>
            <p className="text-xs text-white font-bold">
              <i className="fa-solid fa-phone mr-1.5 text-purple-300"></i>
              <a href={`tel:${clinicInfo.phone}`}>{clinicInfo.phone}</a>
            </p>
            <p className="text-xs text-purple-300">
              <i className="fa-regular fa-clock mr-1.5 text-purple-400"></i> Open 7 Days • Emergency Care Active
            </p>
            <div className="pt-2">
              <button
                onClick={() => onBookClick('General Consultation')}
                className="w-full bg-royal hover:bg-royal-light text-white font-bold py-2.5 rounded-xl text-xs transition shadow border border-purple-400/30"
              >
                Book Appointment Token
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-purple-900/50 text-center text-purple-400 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 {clinicInfo.fullName}. All Rights Reserved.</p>
          <p className="text-purple-300">
            ECIL South Kamala Nagar, Hyderabad • Your Health Our Priority
          </p>
        </div>

      </div>
    </footer>
  );
}
