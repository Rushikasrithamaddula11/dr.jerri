import React from 'react';
import { clinicInfo } from '../data/clinicData';

export default function LocationSection() {
  return (
    <section id="contact-section" className="py-8 md:py-14 bg-white border-b border-royal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200">
              <i className="fa-solid fa-location-dot text-royal"></i> Clinic & Store Location
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-royal-dark font-display tracking-tight">
              Convenient Landmark in <span className="text-royal">ECIL South Kamala Nagar</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Drjerrri Poly Clinic, Diagnostics & Pharmacy is easily accessible for patients and families from South Kamala Nagar, Moula Ali, Kushaiguda, A.S. Rao Nagar, and surrounding Hyderabad localities.
            </p>

            <div className="bg-purple-50/70 rounded-3xl p-5 border border-purple-200 space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5 text-slate-800">
                <div className="w-9 h-9 rounded-xl bg-royal text-white flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <div>
                  <h4 className="font-bold text-royal-dark text-sm">{clinicInfo.fullName}</h4>
                  <p className="text-slate-600 text-xs mt-0.5">{clinicInfo.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-slate-800 pt-3 border-t border-purple-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-bold text-royal-dark">Call Helpline & Pharmacy Desk</h4>
                  <a href={`tel:${clinicInfo.phone}`} className="text-royal font-black text-sm hover:underline">
                    {clinicInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-slate-800 pt-3 border-t border-purple-200">
                <div className="w-9 h-9 rounded-xl bg-royal text-white flex items-center justify-center shrink-0">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <h4 className="font-bold text-royal-dark">Working Hours</h4>
                  <p className="text-slate-600 text-xs">Open Daily: 9:00 AM – 10:00 PM (Emergency & Pharmacy 24/7 Support)</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=ECIL+South+Kamala+Nagar+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-royal hover:bg-royal-dark text-white font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition shadow-md shadow-royal/20"
              >
                <i className="fa-solid fa-map-location-dot"></i>
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`tel:${clinicInfo.phone}`}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-2xl text-xs sm:text-sm transition shadow"
              >
                <i className="fa-solid fa-phone"></i>
                <span>Call: 9533551700</span>
              </a>
            </div>

          </div>

          {/* Interactive Map Visual Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-3 border border-purple-200 shadow-xl overflow-hidden">
              <div className="rounded-2xl overflow-hidden h-72 sm:h-80 w-full relative bg-purple-50">
                <iframe
                  title="Drjerrri Poly Clinic Location"
                  src="https://maps.google.com/maps?q=ECIL+South+Kamala+Nagar+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-3 text-center text-xs text-royal font-bold">
                📍 Situated near prime landmark @ South Kamala Nagar, ECIL
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
