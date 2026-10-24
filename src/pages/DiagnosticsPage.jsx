import React from 'react';
import { diagnosticsPackages, clinicInfo } from '../data/clinicData';

export default function DiagnosticsPage({ onBookDiagnostics, onNavigate }) {
  const individualTests = [
    { name: "Complete Blood Picture (CBP / CBC)", time: "2 Hours", price: 250 },
    { name: "Blood Sugar (Fasting / Post-Prandial)", time: "1 Hour", price: 120 },
    { name: "HbA1c (3-Month Sugar Average)", time: "Same Day", price: 400 },
    { name: "Lipid Profile (Cholesterol)", time: "Same Day", price: 550 },
    { name: "Liver Function Test (LFT)", time: "Same Day", price: 650 },
    { name: "Kidney Function Test (KFT)", time: "Same Day", price: 600 },
    { name: "Thyroid Profile (T3, T4, TSH)", time: "Same Day", price: 450 },
    { name: "Dengue NS1 Antigen", time: "2 Hours", price: 600 },
    { name: "Typhoid (Widal Test)", time: "3 Hours", price: 200 },
    { name: "Urine Routine & Microscopic", time: "1 Hour", price: 150 },
    { name: "Obstetric / Pregnancy Ultrasound", time: "Prior Booking", price: 1200 },
    { name: "Abdomen & Pelvis Ultrasound Scan", time: "Same Day", price: 950 }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Clean Header */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
            Diagnostics Lab & Ultrasound Scans
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl mt-1">
            Automated blood tests & certified ultrasound scans with same-day reports on WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-4 space-y-6">
        
        {/* Master Checkup Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {diagnosticsPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-sm flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-50 text-royal border border-purple-100">
                  {pkg.badge}
                </span>

                <h3 className="font-bold text-sm sm:text-base text-royal-dark mt-2 mb-1 leading-snug">
                  {pkg.title}
                </h3>
                
                <p className="text-[11px] text-purple-700 font-semibold mb-2">
                  {pkg.highlight}
                </p>

                <p className="text-xs text-slate-500 bg-purple-50/50 p-2.5 rounded-xl border border-purple-50 leading-relaxed mb-4">
                  {pkg.tests}
                </p>
              </div>

              <button
                onClick={() => onBookDiagnostics(pkg.title)}
                className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold py-2 rounded-xl text-xs transition"
              >
                Book Package
              </button>
            </div>
          ))}
        </div>

        {/* Home Sample Collection Callout */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg shrink-0">
              <i className="fa-solid fa-house-medical"></i>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-royal-dark">Home Sample Collection in ECIL</h4>
              <p className="text-[11px] text-slate-500">Free digital report delivery directly to your WhatsApp.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Diagnostics,%20I%20would%20like%20to%20book%20a%20Home%20Sample%20Collection`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-purple-50 hover:bg-royal hover:text-white text-royal border border-purple-200 font-bold text-xs px-4 py-2 rounded-xl transition text-center shrink-0"
          >
            WhatsApp Booking
          </a>
        </div>

        {/* Popular Individual Tests List */}
        <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-royal-dark uppercase tracking-wider">
            Individual Pathology & Scan Price Menu
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {individualTests.map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-purple-50/40 border border-purple-50 flex items-center justify-between gap-2"
              >
                <div>
                  <h4 className="font-bold text-xs text-slate-800 leading-tight">{t.name}</h4>
                  <span className="text-[10px] text-slate-400">Report: {t.time}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-royal font-mono block">₹{t.price}</span>
                  <button
                    onClick={() => onBookDiagnostics(t.name)}
                    className="text-[10px] text-royal font-bold hover:underline"
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
