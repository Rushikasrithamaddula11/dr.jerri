import React from 'react';
import { clinicInfo } from '../data/clinicData';
import LocationSection from '../components/LocationSection';
import FAQSection from '../components/FAQSection';

export default function ContactPage({ onBookClick, onNavigate }) {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-12 md:py-16 border-b border-purple-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-purple-200">
              <i className="fa-solid fa-map-location-dot text-pink-300"></i> Easy Clinic Access
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Contact & Location @ ECIL
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
              Dr. Jerri Poly Clinic, Diagnostics & Pharmacy is situated in the heart of South Kamala Nagar, ECIL, Hyderabad. Walk in daily or connect directly with our front desk.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-10 space-y-8">
        
        {/* Contact Cards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-royal flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-1">Phone Helpline</h4>
            <a href={`tel:${clinicInfo.phone}`} className="text-xl font-black text-royal font-display hover:underline block">
              {clinicInfo.phone}
            </a>
            <p className="text-xs text-slate-500 mt-1">Direct OPD Token Booking & Medicine Dispatch</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-royal flex items-center justify-center text-xl mb-4">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-1">WhatsApp Desk</h4>
            <a
              href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Poly%20Clinic`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-black text-royal font-display hover:underline block"
            >
              +91 {clinicInfo.phone}
            </a>
            <p className="text-xs text-slate-500 mt-1">Prescription Upload & Report Delivery</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-royal flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-qrcode"></i>
            </div>
            <h4 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-1">Official UPI Gateway</h4>
            <span className="text-lg font-black text-royal font-mono block">
              {clinicInfo.upiId}
            </span>
            <p className="text-xs text-slate-500 mt-1">Google Pay, PhonePe, Paytm, BHIM</p>
          </div>

        </div>

        {/* Location Section Embed */}
        <LocationSection />

        {/* FAQ Section Embed */}
        <FAQSection />

      </div>

    </div>
  );
}
