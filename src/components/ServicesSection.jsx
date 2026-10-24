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
    <section id="services-section" className="py-10 md:py-14 bg-white border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-royal-dark font-display tracking-tight">
              Clinical Procedures & Walk-in Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Immediate medical support, saline therapy, injections, and sterile wound dressings.
            </p>
          </div>
        </div>

        {/* Clean Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-4 border border-purple-100 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-base">
                    <i className={getIconClass(service.icon)}></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-royal border border-purple-100">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-royal-dark mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-purple-50 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-slate-600 hover:text-royal"
                >
                  Details
                </button>
                <button
                  onClick={() => onBookService(service.title)}
                  className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
                >
                  Avail Service
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
