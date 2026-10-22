import React from 'react';
import { clinicInfo } from '../data/clinicData';

export default function LocationSection() {
  return (
    <section id="contact-section" className="py-8 md:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <i className="fa-solid fa-location-dot text-[11px]"></i> Visit Our Clinic
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">
              Convenient Location in <span className="text-teal-700">ECIL South Kamala Nagar</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Drjerrri Poly Clinic is conveniently situated in South Kamala Nagar with smooth accessibility for families across ECIL, Moula Ali, AS Rao Nagar, and surrounding Secunderabad localities.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{clinicInfo.name}</h4>
                  <p className="text-slate-600 text-xs mt-0.5">{clinicInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-800 pt-2 border-t border-slate-200/60">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Emergency & Helpline</h4>
                  <a href={`tel:${clinicInfo.phone}`} className="text-emerald-700 font-bold hover:underline">
                    {clinicInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-800 pt-2 border-t border-slate-200/60">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Clinic Timings</h4>
                  <p className="text-slate-600 text-xs">Open Daily: 9:00 AM – 10:00 PM</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=ECIL+South+Kamala+Nagar+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition shadow"
              >
                <i className="fa-solid fa-map-location-dot text-teal-400"></i>
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${clinicInfo.phone}`}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm transition shadow"
              >
                <i className="fa-solid fa-phone"></i>
                <span>Call: 9533551700</span>
              </a>
            </div>

          </div>

          {/* Interactive Map Embed Visual Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-100 rounded-3xl p-3 border border-slate-200 shadow-md overflow-hidden">
              <div className="rounded-2xl overflow-hidden h-72 sm:h-80 w-full relative bg-slate-200">
                <iframe
                  title="Drjerrri Poly Clinic Location"
                  src="https://maps.google.com/maps?q=ECIL+South+Kamala+Nagar+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-3 text-center text-xs text-slate-500 font-medium">
                📍 Situated near prime landmark @ South Kamala Nagar, ECIL
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
