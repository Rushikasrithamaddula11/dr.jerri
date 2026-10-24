import React from 'react';
import { clinicInfo, clinicalServices } from '../data/clinicData';

export default function ServicesPage({ onSelectService, onBookService }) {
  const getIconClass = (icon) => {
    switch (icon) {
      case 'vial': return 'fa-solid fa-vial';
      case 'pills': return 'fa-solid fa-pills';
      case 'droplet': return 'fa-solid fa-bottle-droplet';
      case 'syringe': return 'fa-solid fa-syringe';
      case 'radiation': return 'fa-solid fa-radiation';
      case 'first-aid': return 'fa-solid fa-kit-medical';
      case 'lungs': return 'fa-solid fa-lungs';
      default: return 'fa-solid fa-notes-medical';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Clean Header */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
            Clinical Procedures & Walk-in Care
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl mt-1">
            Day-care Saline IV drips, injections, wound dressing, and breathing nebulization @ ECIL.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 space-y-6">
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinicalServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg">
                    <i className={getIconClass(service.icon)}></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-royal border border-purple-100">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-royal-dark mb-1">
                  {service.title}
                </h3>
                
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {service.highlights && (
                  <div className="space-y-1 mb-4 bg-purple-50/50 p-2.5 rounded-xl border border-purple-50 text-[11px] text-slate-600">
                    {service.highlights.slice(0, 3).map((h, i) => (
                      <p key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal"></span>
                        <span>{h}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-purple-50 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-slate-600 hover:text-royal"
                >
                  View Details
                </button>
                <button
                  onClick={() => onBookService(service.title)}
                  className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
                >
                  Avail Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Notice Card */}
        <div className="bg-white rounded-2xl p-5 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg shrink-0">
              <i className="fa-solid fa-hospital-user"></i>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-royal-dark">Need Immediate Saline or First Aid?</h4>
              <p className="text-[11px] text-slate-500">Walk into Dr. Jerri Clinic during working hours. No prior appointment needed.</p>
            </div>
          </div>

          <a
            href={`tel:${clinicInfo.phone}`}
            className="w-full sm:w-auto bg-purple-50 hover:bg-royal hover:text-white text-royal border border-purple-200 font-bold text-xs px-4 py-2 rounded-xl transition text-center shrink-0"
          >
            Call Desk: {clinicInfo.phone}
          </a>
        </div>

      </div>

    </div>
  );
}
