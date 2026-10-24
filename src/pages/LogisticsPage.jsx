import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';
import { logisticsDeliveryZones } from '../data/medicinesData';

export default function LogisticsPage({ onNavigate }) {
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('drjerri_orders') || '[]');
      return orders.length > 0 ? orders[0] : {
        orderId: 'DJ-MED-84920',
        createdAt: '12:45 PM',
        date: 'Today',
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
        step: 3,
        riderName: 'Kishore Kumar (Dr. Jerri Delivery Partner)',
        riderPhone: clinicInfo.phone,
        vehicle: 'Hero Electric (TS 08 EK 4921)'
      };
    } catch {
      return null;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [etaMinutes, setEtaMinutes] = useState(18);
  const [progressPercent, setProgressPercent] = useState(72);

  // Real-time animation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 3 ? prev - 1 : 3));
      setProgressPercent((prev) => (prev < 94 ? prev + 1 : 94));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchOrder = (e) => {
    e.preventDefault();
    setSearchError('');
    if (!searchQuery.trim()) return;

    try {
      const stored = JSON.parse(localStorage.getItem('drjerri_orders') || '[]');
      const found = stored.find(
        (o) =>
          o.orderId.toLowerCase() === searchQuery.trim().toLowerCase() ||
          o.phone.includes(searchQuery.trim())
      );
      if (found) {
        setActiveOrder(found);
        setSearchQuery('');
      } else {
        setSearchError(`No active order found for "${searchQuery}". Showing live clinic dispatch demonstration.`);
      }
    } catch {
      setSearchError('Order lookup completed.');
    }
  };

  const steps = [
    {
      title: 'Order Placed & Payment Verified',
      desc: `Paid via UPI: ${clinicInfo.upiId} (Transaction Ref: ${activeOrder?.utr || 'Verified'})`,
      time: '12 mins ago',
      icon: 'fa-solid fa-receipt'
    },
    {
      title: 'Prescription & Packing Quality Checked',
      desc: 'Inspected and tamper-proof packed by Dr. Jerri Licensed Pharmacist @ ECIL Hub',
      time: '8 mins ago',
      icon: 'fa-solid fa-boxes-packing'
    },
    {
      title: 'Dispatched & Delivery Agent Assigned',
      desc: `Assigned to ${activeOrder?.riderName || 'Kishore Kumar'} (${activeOrder?.vehicle || 'Hero Electric'})`,
      time: '4 mins ago',
      icon: 'fa-solid fa-motorcycle'
    },
    {
      title: 'Out for Delivery (Live Transit)',
      desc: `En route to ${activeOrder?.area || 'ECIL South Kamala Nagar'} (Live ETA: ${etaMinutes} mins)`,
      time: 'Active Now',
      icon: 'fa-solid fa-location-dot',
      active: true
    },
    {
      title: 'Doorstep Delivered & Handed Over',
      desc: 'Contactless OTP delivery and verified temperature-safe handover',
      time: 'Pending',
      icon: 'fa-solid fa-house-circle-check'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Logistics Hero Banner with Real Photo */}
      <div className="relative bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white overflow-hidden py-10 md:py-16 border-b border-purple-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1600&auto=format&fit=crop&q=80"
            alt="Dr. Jerri Delivery Fleet"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-purple-200 border border-white/20">
              <i className="fa-solid fa-truck-fast text-pink-300"></i>
              <span>Realtime Medicine Delivery & Logistics Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Track Your Medicine Order <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-white">
                Live from Clinic to Doorstep
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
              Every order from Dr. Jerri In-House Pharmacy is tracked live in real-time. Our dedicated local delivery fleet delivers genuine medicines, emergency saline, and maternity care across ECIL in 30 to 45 minutes.
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${clinicInfo.phone}`}
                className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2"
              >
                <i className="fa-solid fa-phone text-royal"></i>
                <span>Call Delivery Coordinator ({clinicInfo.phone})</span>
              </a>

              <button
                onClick={() => onNavigate('store')}
                className="bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold px-4 py-3 rounded-2xl text-xs sm:text-sm transition border border-white/20 flex items-center gap-2 backdrop-blur-md"
              >
                <i className="fa-solid fa-store text-purple-200"></i>
                <span>Order More Medicines</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Order Search & Lookup Box */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-purple-200">
          <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-royal text-sm"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. DJ-MED-84920) or Mobile Number..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs sm:text-sm font-semibold text-royal-dark focus:outline-none focus:ring-2 focus:ring-royal"
              />
            </div>
            <button
              type="submit"
              className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-black px-6 py-3 rounded-2xl text-xs sm:text-sm transition shadow-md shadow-royal/30 shrink-0 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-crosshairs"></i>
              <span>Locate Order</span>
            </button>
          </form>

          {searchError && (
            <p className="text-xs text-amber-700 font-bold mt-2.5 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              {searchError}
            </p>
          )}
        </div>

        {/* Live Order Active Card */}
        {activeOrder && (
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-purple-200 shadow-xl space-y-6">
            
            {/* Top Order Metadata Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-purple-100 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black uppercase tracking-wider text-royal bg-purple-100 px-2.5 py-0.5 rounded-md">
                    Order Active & In-Transit
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span> Live Tracking
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-display text-royal-dark">
                  Order #{activeOrder.orderId}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ordered on {activeOrder.date || 'Today'} at {activeOrder.createdAt || '12:45 PM'} • Delivery to <strong className="text-slate-800">{activeOrder.address}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
                  <span className="text-xl sm:text-2xl font-black text-royal font-mono">₹{activeOrder.totalAmount}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">UPI Verified ({clinicInfo.upiId})</span>
                </div>
              </div>
            </div>

            {/* ETA & Progress Bar */}
            <div className="bg-gradient-to-r from-purple-50 via-purple-100/50 to-white rounded-2xl p-4 sm:p-6 border border-purple-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-royal bg-white px-2.5 py-0.5 rounded-md border border-purple-200">
                    Live Estimated Arrival
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-royal-dark font-display">
                      {etaMinutes} - {etaMinutes + 8} Mins
                    </span>
                    <span className="text-xs text-purple-800 font-semibold">
                      (Fast Express Delivery)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${activeOrder.riderPhone || clinicInfo.phone}`}
                    className="bg-royal hover:bg-royal-dark active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-phone text-xs"></i>
                    <span>Call Rider</span>
                  </a>
                  <a
                    href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Pharmacy,%20checking%20status%20for%20order%20${activeOrder.orderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-purple-50 text-royal-dark border border-purple-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5"
                  >
                    <i className="fa-brands fa-whatsapp text-royal text-base"></i>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Animated Progress Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-royal-dark">
                  <span>Picked Up from ECIL Clinic</span>
                  <span className="text-royal font-black">{progressPercent}% Completed</span>
                  <span>Patient Doorstep</span>
                </div>
                <div className="w-full h-3.5 bg-purple-200/80 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-royal via-purple-600 to-pink-500 rounded-full transition-all duration-700 relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Route Visualizer Card */}
            <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 text-white relative overflow-hidden shadow-inner border border-purple-900/60">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#c084fc 1px, transparent 1px), radial-gradient(#c084fc 1px, #0f172a 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px'
              }}></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Hub Point */}
                <div className="flex items-center gap-3.5 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white shrink-0 text-lg shadow-md shadow-purple-900">
                    <i className="fa-solid fa-clinic-medical"></i>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">Origin Hub</span>
                    <h4 className="text-sm font-black text-white">Dr. Jerri In-House Pharmacy</h4>
                    <p className="text-[11px] text-slate-400">ECIL South Kamala Nagar Hub</p>
                  </div>
                </div>

                {/* Animated Moving Bike */}
                <div className="flex-1 w-full px-2 md:px-6">
                  <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono mb-2">
                    <span>Electric Courier TS 08 EK 4921</span>
                    <span className="text-pink-300 font-bold">● Transit Active (26 km/h)</span>
                  </div>
                  <div className="relative h-2 bg-purple-950 rounded-full border border-purple-800">
                    <div
                      className="absolute -top-3.5 transition-all duration-700 text-pink-400 bg-white p-1.5 rounded-full shadow-xl"
                      style={{ left: `${Math.min(Math.max(progressPercent - 4, 4), 92)}%` }}
                    >
                      <i className="fa-solid fa-motorcycle text-sm text-royal"></i>
                    </div>
                  </div>
                </div>

                {/* Destination Point */}
                <div className="flex items-center gap-3.5 w-full md:w-auto text-left md:text-right md:flex-row-reverse">
                  <div className="w-12 h-12 rounded-2xl bg-pink-600 flex items-center justify-center text-white shrink-0 text-lg shadow-md shadow-pink-900">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <div>
                    <span className="text-[10px] text-pink-300 font-bold uppercase tracking-wider block">Destination Doorstep</span>
                    <h4 className="text-sm font-black text-white">{activeOrder.customerName || 'Patient'}</h4>
                    <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{activeOrder.address}</p>
                  </div>
                </div>

              </div>

              {/* Rider Bar Bottom */}
              <div className="mt-5 pt-4 border-t border-purple-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-xs text-white">
                    <i className="fa-solid fa-user-shield"></i>
                  </div>
                  <div>
                    <span className="text-white font-bold block">{activeOrder.riderName || 'Kishore Kumar'}</span>
                    <span className="text-[10px] text-purple-300">{activeOrder.vehicle || 'EV Two-Wheeler'} • Verified Delivery Partner</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-mono text-[11px]">
                    Status: <strong className="text-emerald-400">Paid via UPI ({clinicInfo.upiId})</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Milestones Timeline */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-royal-dark">
                Realtime Milestone Progress Log
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {steps.map((st, idx) => {
                  const isPassed = idx < 3;
                  const isCurrent = idx === 3;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition ${
                        isCurrent
                          ? 'border-royal bg-purple-50/70 shadow-sm ring-2 ring-royal/20'
                          : isPassed
                          ? 'border-purple-200 bg-white'
                          : 'border-slate-100 bg-slate-50/60 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isCurrent
                              ? 'bg-royal text-white'
                              : isPassed
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isPassed ? (
                            <i className="fa-solid fa-check text-[10px]"></i>
                          ) : (
                            <i className={`${st.icon} text-[10px]`}></i>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">{st.time}</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-800 leading-snug mb-0.5">{st.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{st.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Summary in Package */}
            <div className="bg-purple-50/50 rounded-2xl p-4 sm:p-5 border border-purple-100">
              <h4 className="text-xs font-black text-royal-dark uppercase tracking-wider mb-2">
                Medicines in this Package
              </h4>
              <div className="divide-y divide-purple-100">
                {(activeOrder.items || []).map((it, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{it.name}</p>
                      <p className="text-[10px] text-slate-500">{it.pack || 'Standard Pack'} • Qty: {it.qty}</p>
                    </div>
                    <span className="font-black text-royal font-mono">
                      ₹{it.price * it.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Local Coverage Delivery Zones Matrix */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase text-royal bg-purple-100 px-2.5 py-0.5 rounded-md">
                Fast Express Fleet
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display text-royal-dark mt-1">
                Dr. Jerri Delivery Zone Coverage
              </h3>
              <p className="text-xs text-slate-600">
                Guaranteed rapid delivery times from our ECIL South Kamala Nagar clinic hub.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
              Free Delivery on orders above ₹300
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {logisticsDeliveryZones.map((z, idx) => (
              <div
                key={idx}
                className="bg-purple-50/60 rounded-2xl p-4 border border-purple-200/80 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-royal-dark">{z.area}</h4>
                  <p className="text-[11px] text-purple-800 font-semibold mt-0.5 flex items-center gap-1">
                    <i className="fa-regular fa-clock text-royal text-[10px]"></i>
                    <span>{z.etaMins}</span>
                  </p>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-white text-royal border border-purple-200 shadow-xs">
                  {z.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Delivery Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-200 shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-royal text-white flex items-center justify-center text-xl mb-3 shadow-md shadow-royal/20">
              <i className="fa-solid fa-temperature-low"></i>
            </div>
            <h4 className="font-black text-sm sm:text-base text-royal-dark font-display mb-1">
              Cold Chain Safe Storage
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Temperature-sensitive injections, insulin, and vaccines are packed in insulated cooling pouches to guarantee potency.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-200 shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-royal text-white flex items-center justify-center text-xl mb-3 shadow-md shadow-royal/20">
              <i className="fa-solid fa-shield-virus"></i>
            </div>
            <h4 className="font-black text-sm sm:text-base text-royal-dark font-display mb-1">
              100% Sterile & Tamper-Proof
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Saline IV fluids, disposable syringes, and sterile bandages are sealed in tamper-evident hospital grade pouches.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-200 shadow-sm flex flex-col justify-between">
            <div className="w-12 h-12 rounded-2xl bg-royal text-white flex items-center justify-center text-xl mb-3 shadow-md shadow-royal/20">
              <i className="fa-solid fa-qrcode"></i>
            </div>
            <h4 className="font-black text-sm sm:text-base text-royal-dark font-display mb-1">
              Instant UPI & Doorstep Scan
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pay online in advance to <strong>{clinicInfo.upiId}</strong> or scan the delivery rider's live QR code on arrival.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
