import React from 'react';

export default function ServicesSection({ onSelectService, onBookService, filteredServices }) {
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
    <section id="services-section" className="py-8 md:py-14 bg-white border-b border-royal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-200">
              <i className="fa-solid fa-notes-medical text-royal"></i> On-Site Clinical Procedures
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-royal-dark font-display tracking-tight">
              Clinical Procedures & Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Walk-in immediate medical support, saline therapy, injections, sterile dressings, and diagnostics under experienced medical care.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold text-royal-dark bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
              <i className="fa-solid fa-circle-check text-purple-700 mr-1.5"></i> Open Daily 7 Days
            </span>
          </div>
        </div>

        {/* Services Grid (Responsive: 1 column on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-200 shadow-sm hover:shadow-lg hover:border-royal transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-bold bg-royal text-white shadow-sm shadow-royal/20 group-hover:scale-105 transition-transform">
                    <i className={getIconClass(service.icon)}></i>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-royal-dark border border-purple-100">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-black text-sm sm:text-base text-royal-dark mb-1.5 font-display">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-royal hover:text-royal-dark flex items-center gap-1 transition py-1"
                >
                  <span>Details & Highlights</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
                <button
                  onClick={() => onBookService(service.title)}
                  className="bg-royal hover:bg-royal-dark text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1"
                >
                  <i className="fa-regular fa-calendar-check text-[10px]"></i>
                  <span>Avail Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
