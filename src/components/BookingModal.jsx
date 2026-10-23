import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function BookingModal({ isOpen, onClose, preselectedService }) {
  const [service, setService] = useState('Dr. Harika (MBBS - General Physician [9 AM - 4 PM])');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `🏥 *NEW APPOINTMENT / TOKEN REQUEST*\n` +
                `*${clinicInfo.fullName}*\n\n` +
                `👤 *Patient Name:* ${name}\n` +
                `📱 *Phone:* ${phone}\n` +
                `🎂 *Age / Gender:* ${age || 'Not specified'}\n` +
                `🩺 *Doctor / Service / Test:* ${service}\n` +
                `📅 *Preferred Date:* ${date}\n` +
                `📝 *Notes / Symptoms:* ${notes || 'None'}\n\n` +
                `Please confirm token / test time.`;

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
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-purple-200 text-lg">
              <i className="fa-regular fa-calendar-check"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base font-display">Book Token / Diagnostics Test</h3>
              <p className="text-[11px] text-purple-200">{clinicInfo.name} @ ECIL South Kamala Nagar</p>
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
          
          <div>
            <label className="block font-bold text-royal-dark mb-1">Select Doctor, Test or Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-3 text-xs font-semibold text-royal-dark focus:outline-none focus:border-royal focus:bg-white"
            >
              <optgroup label="Specialist Doctors OPD">
                <option value="Dr. Harika (MBBS - General Physician [9 AM - 4 PM])">Dr. Harika (MBBS - General Physician [9 AM - 4 PM])</option>
                <option value="Dr. Supriya (MBBS, DGO - Gynaecologist [1 PM - 3 PM])">Dr. Supriya (MBBS, DGO - Gynaecologist [1 PM - 3 PM])</option>
                <option value="Dr. Subash Reddy (MD - Dermatologist [6 PM - 6:30 PM])">Dr. Subash Reddy (MD - Dermatologist [6 PM - 6:30 PM])</option>
                <option value="Dr C Rama Krishna (MBBS, DCH - Pediatrician [7 PM - 9 PM])">Dr C Rama Krishna (MBBS, DCH - Pediatrician [7 PM - 9 PM])</option>
                <option value="Dr. Srilekha (MBBS - General & Mother-Child [9 PM - 10 PM])">Dr. Srilekha (MBBS - General & Mother-Child [9 PM - 10 PM])</option>
              </optgroup>
              <optgroup label="Diagnostics & Scanning">
                <option value="Diagnostics - Complete Fever Profile">Diagnostics - Complete Fever Profile</option>
                <option value="Diagnostics - Diabetes & Blood Sugar Care">Diagnostics - Diabetes & Blood Sugar Care</option>
                <option value="Diagnostics - Maternity & Pregnancy Ultrasound">Diagnostics - Maternity & Pregnancy Ultrasound</option>
                <option value="Diagnostics - Executive Master Health Checkup">Diagnostics - Executive Master Health Checkup</option>
                <option value="Diagnostics - Routine Blood Tests (CBC, Thyroid, LFT, KFT)">Diagnostics - Routine Blood Tests (CBC, Thyroid, LFT, KFT)</option>
              </optgroup>
              <optgroup label="Walk-in Clinical Procedures">
                <option value="Saline / IV Fluid Therapy (Immediate / Walk-in)">Saline / IV Fluid Therapy (Immediate Walk-in)</option>
                <option value="Injections & Vaccinations">Injections & Vaccinations</option>
                <option value="First Aid & Minor Wound Care">First Aid & Minor Wound Dressing</option>
                <option value="Nebulization Breathing Care">Nebulization Breathing Care</option>
              </optgroup>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-royal-dark mb-1">Preferred Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-royal-dark mb-1">Patient Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Reddy"
                required
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-royal-dark mb-1">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                required
                pattern="[0-9]{10}"
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-royal-dark mb-1">Age / Gender (Optional)</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 32 / Male"
                className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-royal-dark mb-1">Symptoms / Notes (Optional)</label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Fever since 2 days, blood test enquiry, scan appointment, saline..."
              className="w-full bg-purple-50/50 border border-purple-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-royal focus:bg-white"
            ></textarea>
          </div>

          <div className="bg-purple-50 rounded-2xl p-3 border border-purple-200 flex items-center gap-2.5 text-xs text-purple-950">
            <i className="fa-solid fa-bolt text-royal text-sm shrink-0"></i>
            <span>Submitting directly routes your token or test booking to our clinic desk on WhatsApp for instant confirmation.</span>
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
              className="w-2/3 py-3 rounded-xl bg-royal hover:bg-royal-dark text-white font-bold shadow-md transition flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>Confirm on WhatsApp</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
