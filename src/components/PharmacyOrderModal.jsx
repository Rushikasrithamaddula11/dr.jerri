import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function PharmacyOrderModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [medicines, setMedicines] = useState('');
  const [deliveryType, setDeliveryType] = useState('Counter Pickup @ ECIL');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `💊 *NEW PHARMACY MEDICINE ORDER*\n` +
                `*${clinicInfo.fullName}*\n\n` +
                `👤 *Customer Name:* ${name}\n` +
                `📱 *Phone Number:* ${phone}\n` +
                `📦 *Pickup / Delivery:* ${deliveryType}\n` +
                `📋 *Medicines / Prescription Details:*\n${medicines || 'Attaching Prescription Photo'}\n\n` +
                `Please check stock availability, price, and keep it packed.`;

    const url = `https://wa.me/${clinicInfo.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-purple-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-800 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white text-lg">
              <i className="fa-solid fa-pills text-purple-300"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-display">Order Medicines / Upload Prescription</h3>
              <p className="text-[11px] text-purple-200">{clinicInfo.name} In-House 24/7 Pharmacy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-3.5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-royal-dark mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh"
                required
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-royal-dark mb-1">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit number"
                required
                pattern="[0-9]{10}"
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-royal-dark mb-1">Preferred Option</label>
            <select
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value)}
              className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs font-semibold text-royal-dark focus:outline-none focus:border-royal"
            >
              <option value="Counter Pickup @ ECIL South Kamala Nagar">Counter Quick Pickup @ ECIL Clinic</option>
              <option value="Home Delivery (ECIL & South Kamala Nagar)">Home Delivery (ECIL / Kamala Nagar local area)</option>
              <option value="Price & Availability Enquiry">Price & Availability Enquiry</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-royal-dark mb-1">List Medicines or Prescription Note</label>
            <textarea
              rows="3"
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              placeholder="e.g. Paracetamol 650mg (1 strip), ORS sachet (5 packets), saline bottle, or write: 'I will send doctor prescription photo'"
              required
              className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
            ></textarea>
          </div>

          <div className="bg-purple-50 rounded-2xl p-3 border border-purple-200 flex items-center gap-2.5 text-xs text-purple-950">
            <i className="fa-solid fa-camera text-royal text-sm shrink-0"></i>
            <span>On the next screen in WhatsApp, you can attach and send your prescription photo directly!</span>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold shadow-md shadow-royal/30 transition flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>Send Order to WhatsApp</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
