import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function LogisticsTrackerModal({ isOpen, onClose, activeOrder, onSelectOrder }) {
  if (!isOpen) return null;

  // Use active order or demo default
  const [order, setOrder] = useState(
    activeOrder || {
      orderId: 'DJ-MED-84920',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName: 'Valued Patient',
      phone: '9949339391',
      address: 'Plot 42, South Kamala Nagar, ECIL, Hyderabad',
      area: 'ECIL South Kamala Nagar',
      paymentMethod: 'UPI (9949339391-3@ybl)',
      utr: '9949339391-TXN',
      totalAmount: 505,
      items: [
        { name: 'Shelcal XT (Calcium + Vitamin D3 + Folate)', qty: 1, price: 310, pack: 'Strip of 15 Tablets' },
        { name: 'Orofer-XT (Ferrous Ascorbate + Folic Acid)', qty: 1, price: 195, pack: 'Strip of 10 Tablets' }
      ],
      riderName: 'Kishore Kumar (Dr. Jerri Delivery Partner)',
      riderPhone: '9949339391',
      vehicle: 'Electric Two-Wheeler (TS 08 EK 4921)'
    }
  );

  // Status index: 0 = Confirmed, 1 = Packed, 2 = Dispatched, 3 = Out for delivery, 4 = Delivered
  const [currentStep, setCurrentStep] = useState(3);
  const [progressPercent, setProgressPercent] = useState(72);
  const [etaMinutes, setEtaMinutes] = useState(16);
  const [searchIdInput, setSearchIdInput] = useState('');
  const [searchError, setSearchError] = useState('');

  // Update order if prop changes
  useEffect(() => {
    if (activeOrder) {
      setOrder(activeOrder);
      setCurrentStep(activeOrder.step || 3);
      setProgressPercent(activeOrder.step === 4 ? 100 : activeOrder.step === 3 ? 72 : activeOrder.step === 2 ? 48 : 25);
    }
  }, [activeOrder]);

  // Realtime simulation effect (decreases ETA and animates progress)
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 2 ? prev - 1 : 2));
      setProgressPercent((prev) => (prev < 92 ? prev + 1 : 92));
    }, 12000); // updates every 12 seconds
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      title: 'Order Confirmed & Paid',
      desc: `Verified payment via UPI: ${clinicInfo.upiId}`,
      time: '10 mins ago',
      icon: 'fa-solid fa-receipt'
    },
    {
      title: 'Prescription & Packing Done',
      desc: 'Quality checked by Dr. Jerri Licensed Pharmacist @ ECIL Clinic',
      time: '6 mins ago',
      icon: 'fa-solid fa-boxes-packing'
    },
    {
      title: 'Rider Dispatched',
      desc: `Picked up by ${order.riderName || 'Kishore Kumar'} (${order.vehicle || 'EV Bike'})`,
      time: '3 mins ago',
      icon: 'fa-solid fa-motorcycle'
    },
    {
      title: 'Out for Delivery (Live)',
      desc: `En route to ${order.area || 'South Kamala Nagar, ECIL'} (Live ETA: ${etaMinutes} mins)`,
      time: 'In transit',
      icon: 'fa-solid fa-location-dot',
      active: true
    },
    {
      title: 'Doorstep Delivered',
      desc: 'Contactless handoff with OTP verification',
      time: 'Pending',
      icon: 'fa-solid fa-house-circle-check'
    }
  ];

  const handleSearchOrder = (e) => {
    e.preventDefault();
    setSearchError('');
    if (!searchIdInput.trim()) return;

    try {
      const stored = JSON.parse(localStorage.getItem('drjerri_orders') || '[]');
      const found = stored.find(
        (o) =>
          o.orderId.toLowerCase() === searchIdInput.trim().toLowerCase() ||
          o.phone.includes(searchIdInput.trim())
      );
      if (found) {
        setOrder(found);
        setCurrentStep(found.step || 3);
        setSearchIdInput('');
      } else {
        setSearchError('Order not found. Showing latest clinic dispatch.');
      }
    } catch {
      setSearchError('Order lookup completed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-purple-200">
        
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-800 text-white p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/15 flex items-center justify-center text-lg sm:text-xl shrink-0">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider text-purple-200">
                  Live Logistics Tracker
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-200 bg-pink-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span> Live Active
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black font-display tracking-tight text-white mt-0.5">
                Order #{order.orderId}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Quick Search Another Order */}
          <form onSubmit={handleSearchOrder} className="flex gap-2">
            <div className="relative flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-xs text-purple-500"></i>
              <input
                type="text"
                value={searchIdInput}
                onChange={(e) => setSearchIdInput(e.target.value)}
                placeholder="Track by Order ID (e.g. DJ-MED-84920) or Phone"
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/50"
              />
            </div>
            <button
              type="submit"
              className="bg-royal hover:bg-royal-dark text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shrink-0"
            >
              Track
            </button>
          </form>
          {searchError && <p className="text-[11px] text-amber-600 font-semibold">{searchError}</p>}

          {/* Live ETA & Progress Card */}
          <div className="bg-gradient-to-br from-purple-50 via-purple-100/40 to-white rounded-2xl p-4 sm:p-5 border border-purple-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-royal bg-white px-2 py-0.5 rounded-md border border-purple-200">
                  Estimated Delivery Time
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-royal-dark font-display">
                    {etaMinutes} - {etaMinutes + 10} Mins
                  </span>
                  <span className="text-xs text-purple-800 font-semibold">
                    (Express Delivery by Dr. Jerri Rider)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${order.riderPhone || clinicInfo.phone}`}
                  className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
                >
                  <i className="fa-solid fa-phone text-xs"></i>
                  <span>Call Rider</span>
                </a>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Pharmacy,%20checking%20status%20for%20order%20${order.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-purple-50 text-royal-dark border border-purple-200 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <i className="fa-brands fa-whatsapp text-royal text-sm"></i>
                  <span>WhatsApp Help</span>
                </a>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-bold text-royal-dark">
                <span>Dispatched from ECIL Clinic</span>
                <span>{progressPercent}% on the way</span>
                <span>Destination</span>
              </div>
              <div className="w-full h-3 bg-purple-200/80 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-royal via-purple-600 to-pink-500 rounded-full transition-all duration-700 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Live Map Visualizer */}
          <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden shadow-inner border border-purple-900/60">
            {/* Background gridlines simulating road map */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px), radial-gradient(#a855f7 1px, #0f172a 1px)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Point A: Dr. Jerri Clinic */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-9 h-9 rounded-xl bg-purple-600/80 flex items-center justify-center text-white shrink-0 text-xs shadow-md">
                  <i className="fa-solid fa-clinic-medical"></i>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-purple-300 font-bold uppercase">Pickup Hub</p>
                  <p className="text-xs font-bold text-white leading-tight">Dr. Jerri In-House Pharmacy</p>
                  <p className="text-[10px] text-slate-400">ECIL South Kamala Nagar</p>
                </div>
              </div>

              {/* Transit Line with moving Rider */}
              <div className="flex-1 flex flex-col items-center justify-center w-full sm:px-4">
                <div className="w-full flex items-center justify-between text-[10px] text-purple-300 font-mono mb-1">
                  <span>Speed: ~24 km/h</span>
                  <span className="text-pink-300 font-bold">● Transit Active</span>
                </div>
                <div className="w-full relative h-1.5 bg-purple-800/80 rounded-full">
                  <div
                    className="absolute -top-3 transition-all duration-700 text-pink-400 bg-white p-1 rounded-full shadow-lg"
                    style={{ left: `${Math.min(Math.max(progressPercent - 5, 5), 90)}%` }}
                  >
                    <i className="fa-solid fa-motorcycle text-xs text-royal"></i>
                  </div>
                </div>
              </div>

              {/* Point B: Patient Doorstep */}
              <div className="flex items-center gap-3 w-full sm:w-auto text-left sm:text-right sm:flex-row-reverse">
                <div className="w-9 h-9 rounded-xl bg-pink-600/80 flex items-center justify-center text-white shrink-0 text-xs shadow-md">
                  <i className="fa-solid fa-house"></i>
                </div>
                <div>
                  <p className="text-[10px] text-pink-300 font-bold uppercase">Delivery Destination</p>
                  <p className="text-xs font-bold text-white leading-tight">{order.customerName || 'Patient Doorstep'}</p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[160px]">{order.address || 'ECIL South Kamala Nagar'}</p>
                </div>
              </div>

            </div>

            {/* Rider Details Bar */}
            <div className="mt-3 pt-3 border-t border-purple-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center text-[10px] text-white">
                  <i className="fa-solid fa-user-shield"></i>
                </div>
                <span className="text-white font-medium text-[11px]">
                  Rider: <strong className="text-purple-200">{order.riderName || 'Kishore Kumar'}</strong>
                </span>
                <span className="text-[10px] text-purple-300 bg-purple-800/60 px-2 py-0.5 rounded-full">
                  {order.vehicle || 'EV Two-Wheeler'}
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-mono">
                Payment: <strong className="text-emerald-400 font-bold">Verified UPI ({clinicInfo.upiId})</strong>
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-royal-dark mb-4">
              Realtime Order Milestone Log
            </h4>
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-purple-100">
              {steps.map((st, idx) => {
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={idx} className="relative flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-all z-10 ${
                        isCurrent
                          ? 'bg-royal text-white ring-4 ring-purple-100 shadow-md'
                          : isPassed
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isPassed ? (
                        <i className="fa-solid fa-check text-[10px]"></i>
                      ) : (
                        <i className={`${st.icon} text-[10px]`}></i>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <h5
                          className={`text-xs font-black ${
                            isCurrent
                              ? 'text-royal'
                              : isPassed
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {st.title}
                        </h5>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">
                          {st.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ordered Medicine Items Summary */}
          <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black text-royal-dark uppercase tracking-wider">
                Prescription & Medicines in this Package
              </h4>
              <span className="text-xs font-black text-royal font-mono">
                Total Paid: ₹{order.totalAmount || 505}
              </span>
            </div>

            <div className="divide-y divide-purple-100">
              {(order.items || []).map((it, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{it.name}</p>
                    <p className="text-[10px] text-slate-500">{it.pack || 'Standard Pack'} • Qty: {it.qty}</p>
                  </div>
                  <span className="font-bold text-royal shrink-0">
                    ₹{it.price * it.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-purple-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
              <span>Delivery Address: <strong className="text-slate-800">{order.address}</strong></span>
              <span>Payment: <strong className="text-royal font-mono">{order.paymentMethod || 'UPI: 9949339391-3@ybl'}</strong></span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-purple-100 p-3.5 sm:p-4 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 truncate">
            Need urgent assistance? Call Dr. Jerri Desk: <a href={`tel:${clinicInfo.phone}`} className="font-bold text-royal underline">{clinicInfo.phone}</a>
          </div>

          <button
            onClick={onClose}
            className="bg-royal hover:bg-royal-dark text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm active:scale-95 shrink-0"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
}
