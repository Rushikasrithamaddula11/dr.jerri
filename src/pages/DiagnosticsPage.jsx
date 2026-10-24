import React from 'react';
import { diagnosticsPackages, clinicInfo } from '../data/clinicData';

export default function DiagnosticsPage({ onBookDiagnostics, onNavigate }) {
  const individualTests = [
    { name: "Complete Blood Picture (CBP / CBC)", desc: "Hemoglobin, Platelets, RBC, WBC & Differential count", time: "2 Hours", price: 250 },
    { name: "Fasting & Post-Prandial Blood Sugar", desc: "Hexokinase method for precision glycemic tracking", time: "1 Hour", price: 120 },
    { name: "HbA1c (Glycosylated Hemoglobin)", desc: "Gold standard 3-month average blood glucose level", time: "Same Day", price: 400 },
    { name: "Lipid Profile (Cholesterol & Triglycerides)", desc: "Total Cholesterol, HDL, LDL, VLDL & Cardiac Risk Ratio", time: "Same Day", price: 550 },
    { name: "Liver Function Test (LFT)", desc: "Bilirubin, SGOT, SGPT, Alkaline Phosphatase & Total Proteins", time: "Same Day", price: 650 },
    { name: "Kidney Function Test (KFT / RFT)", desc: "Serum Creatinine, Blood Urea, Uric Acid & Electrolytes", time: "Same Day", price: 600 },
    { name: "Thyroid Profile (T3, T4, TSH)", desc: "Ultra-sensitive chemiluminescence assay", time: "Same Day", price: 450 },
    { name: "Dengue NS1 Antigen & Antibody", desc: "Rapid diagnostic card test with platelet correlation", time: "2 Hours", price: 600 },
    { name: "Widal Test (Typhoid Fever)", desc: "Slide & tube agglutination for enteric fever diagnosis", time: "3 Hours", price: 200 },
    { name: "Urine Complete Routine & Microscopic", desc: "Pus cells, Albumin, Sugar, Casts & Crystal examination", time: "1 Hour", price: 150 },
    { name: "Obstetric / Pregnancy Ultrasound", desc: "Fetal viability, NT scan, growth & anomaly review", time: "Prior Booking", price: 1200 },
    { name: "Abdomen & Pelvis Ultrasound Scan", desc: "Liver, Gallbladder, Kidneys, Spleen & Urinary Bladder", time: "Same Day", price: 950 }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-12 md:py-16 border-b border-purple-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-purple-200">
              <i className="fa-solid fa-microscope text-pink-300"></i> Certified Clinical Laboratory & Scans
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Diagnostics Lab & Ultrasound Center
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
              Automated high-precision pathology analyzers, certified ultrasound scans, same-day digital reports via WhatsApp, and free home blood sample collection across ECIL South Kamala Nagar.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-10 space-y-8">
        
        {/* Master Diagnostics Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {diagnosticsPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-5 border border-purple-200 shadow-md hover:shadow-xl hover:border-royal transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-royal-dark border border-purple-200 uppercase">
                    {pkg.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-royal-subtle text-royal flex items-center justify-center text-sm group-hover:bg-royal group-hover:text-white transition">
                    <i className="fa-solid fa-vial"></i>
                  </div>
                </div>

                <h3 className="font-black text-base text-royal-dark font-display mb-1.5">
                  {pkg.title}
                </h3>
                
                <p className="text-[11px] text-royal font-bold mb-3">
                  <i className="fa-solid fa-sparkles mr-1 text-pink-500"></i> {pkg.highlight}
                </p>

                <div className="bg-purple-50/60 p-3 rounded-2xl border border-purple-100 text-xs text-slate-600 mb-4 leading-relaxed">
                  <strong className="font-bold text-slate-800 text-[11px] block mb-1">Tests Included:</strong>
                  {pkg.tests}
                </div>
              </div>

              <div className="pt-2 border-t border-purple-100">
                <button
                  onClick={() => onBookDiagnostics(pkg.title)}
                  className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <i className="fa-regular fa-calendar-check"></i>
                  <span>Book This Package</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Home Sample Collection Banner */}
        <div className="bg-gradient-to-r from-royal via-purple-800 to-royal-dark rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center text-2xl shrink-0">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-200 bg-white/10 px-2 py-0.5 rounded-md">Doorstep Phlebotomy</span>
              <h3 className="font-black text-lg sm:text-xl font-display text-white mt-1">
                Home Sample Collection for Blood Tests
              </h3>
              <p className="text-xs text-purple-100 max-w-xl">
                Our trained, vaccinated phlebotomists visit your home in ECIL, South Kamala Nagar, and Moula Ali for sterile, painless blood sample collection.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Diagnostics,%20I%20would%20like%20to%20book%20a%20Home%20Sample%20Collection`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black py-3 px-6 rounded-2xl text-xs sm:text-sm transition shadow shrink-0 flex items-center gap-2"
          >
            <i className="fa-brands fa-whatsapp text-royal text-lg"></i>
            <span>Book Home Collection</span>
          </a>
        </div>

        {/* Complete Test Catalog Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-display text-royal-dark">
                Popular Individual Pathology & Scan Tests
              </h3>
              <p className="text-xs text-slate-500">
                Transparent clinic pricing with verified report delivery.
              </p>
            </div>
            <span className="text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              Same-Day WhatsApp Delivery
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {individualTests.map((test, idx) => (
              <div
                key={idx}
                className="bg-purple-50/50 hover:bg-purple-50 rounded-2xl p-4 border border-purple-100 flex items-center justify-between gap-3 transition"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-royal-dark">{test.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{test.desc}</p>
                  <span className="text-[10px] font-semibold text-purple-700 bg-white px-2 py-0.5 rounded-md border border-purple-200 mt-1.5 inline-block">
                    Report Time: {test.time}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-royal font-mono block">₹{test.price}</span>
                  <button
                    onClick={() => onBookDiagnostics(test.name)}
                    className="mt-1.5 bg-royal hover:bg-royal-dark text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition shadow-xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
