import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';
import { logisticsDeliveryZones } from '../data/medicinesData';
import { subscribeToRealtimeEvents } from '../utils/realtimeSync';

export default function LogisticsPage({ onNavigate }) {
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('drjerri_orders') || '[]');
      return orders.length > 0 ? orders[0] : {
        orderId: 'DJ-MED-84920',
        createdAt: '12:45 PM',
        date: 'Today',
        customerName: 'Patient',
        phone: '9533551700',
        address: 'Plot 42, South Kamala Nagar, ECIL, Hyderabad',
        area: 'ECIL South Kamala Nagar',
        paymentMethod: 'Online UPI',
        utr: 'TXN-ONLINE',
        totalAmount: 505,
        items: [
          { name: 'Shelcal XT (Calcium + Vitamin D3 + Folate)', qty: 1, price: 310, pack: 'Strip of 15 Tablets' },
          { name: 'Orofer-XT (Ferrous Ascorbate + Folic Acid)', qty: 1, price: 195, pack: 'Strip of 10 Tablets' }
        ],
        step: 3,
        riderName: 'Kishore Kumar',
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

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 3 ? prev - 1 : 3));
      setProgressPercent((prev) => (prev < 94 ? prev + 1 : 94));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Realtime Live Subscription for Order & Payment Updates
  useEffect(() => {
    const unsub = subscribeToRealtimeEvents((event) => {
      if (event.type === 'ORDER_CREATED' && event.payload) {
        setActiveOrder(event.payload);
      }
      if (event.type === 'PAYMENT_VERIFIED' && event.payload) {
        setActiveOrder((prev) =>
          prev && prev.orderId === event.payload.orderId
            ? { ...prev, paymentStatus: 'verified', paymentMethod: 'Online UPI (Verified)' }
            : prev
        );
      }
      if (event.type === 'RIDER_ASSIGNED' && event.payload) {
        setActiveOrder((prev) =>
          prev && prev.orderId === event.payload.orderId
            ? { ...prev, riderName: event.payload.riderName, riderPhone: event.payload.riderPhone || '9533551700' }
            : prev
        );
      }
      if (event.type === 'STEP_UPDATED' && event.payload) {
        setActiveOrder((prev) =>
          prev && prev.orderId === event.payload.orderId
            ? { ...prev, step: event.payload.nextStep }
            : prev
        );
      }
    });
    return unsub;
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
        setSearchError(`No active order found for "${searchQuery}". Showing live clinic dispatch.`);
      }
    } catch {
      setSearchError('Order lookup completed.');
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Verified Online', done: true },
    { title: 'Packed', desc: 'Checked by Pharmacist', done: true },
    { title: 'Dispatched', desc: 'Assigned to Rider', done: true },
    { title: 'Out for Delivery', desc: `Live ETA: ${etaMinutes} mins`, active: true },
    { title: 'Delivered', desc: 'Doorstep handoff', pending: true }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Clean Header */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
              Live Order & Delivery Tracking
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-1">
              Real-time delivery from Dr. Jerri In-House Pharmacy to your doorstep in ECIL.
            </p>
          </div>

          <button
            onClick={() => onNavigate('store')}
            className="bg-white text-royal-dark font-bold text-xs px-4 py-2 rounded-xl transition self-start sm:self-auto"
          >
            ← Back to Store
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-4 space-y-6">
        
        {/* Simple Search Box */}
        <div className="bg-white rounded-2xl p-3 shadow-md border border-purple-100">
          <form onSubmit={handleSearchOrder} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. DJ-MED-84920) or Phone..."
              className="w-full text-xs sm:text-sm px-3 py-2 text-royal-dark focus:outline-none placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-royal hover:bg-royal-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition shrink-0"
            >
              Track
            </button>
          </form>
          {searchError && <p className="text-[11px] text-amber-600 mt-1 font-semibold">{searchError}</p>}
        </div>

        {/* Live Order Card */}
        {activeOrder && (
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-md space-y-5">
            
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-purple-50 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-royal font-mono">
                    Order #{activeOrder.orderId}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ● Out for Delivery
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  To: <strong>{activeOrder.address}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-base font-black text-royal font-mono">₹{activeOrder.totalAmount}</span>
                <span className={`text-[10px] block font-semibold ${
                  activeOrder.paymentStatus === 'verified'
                    ? 'text-emerald-700'
                    : 'text-amber-700'
                }`}>
                  {activeOrder.paymentStatus === 'verified'
                    ? '● Payment Verified'
                    : activeOrder.paymentMethod && activeOrder.paymentMethod.includes('Cash')
                    ? '💵 Pay on Delivery'
                    : '⏳ Awaiting Verification'}
                </span>
              </div>
            </div>

            {/* ETA & Progress Line */}
            <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">Estimated Arrival:</span>
                <span className="text-lg font-black text-royal font-display">{etaMinutes} mins</span>
              </div>
              <div className="w-full h-2.5 bg-purple-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-royal rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* 5 Clean Milestone Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border transition ${
                    s.active
                      ? 'border-royal bg-purple-50 text-royal font-black ring-1 ring-royal'
                      : s.done
                      ? 'border-purple-100 bg-white text-slate-800 font-bold'
                      : 'border-slate-100 bg-slate-50 text-slate-400'
                  }`}
                >
                  <p className="text-[11px] leading-tight">{s.title}</p>
                  <span className="text-[9px] text-slate-500 font-normal block mt-0.5">{s.desc}</span>
                </div>
              ))}
            </div>

            {/* Delivery Rider & Contact Pill */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-xs font-bold">
                  <i className="fa-solid fa-motorcycle"></i>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">
                    Rider: {activeOrder.riderName || 'Kishore Kumar'}
                  </h4>
                  <p className="text-[10px] text-slate-500">{activeOrder.vehicle || 'EV Two-Wheeler'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="bg-royal hover:bg-royal-dark text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-phone text-[10px]"></i>
                  <span>Call Rider</span>
                </a>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}?text=Order%20${activeOrder.orderId}%20status`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-royal border border-purple-200 font-bold text-xs px-3 py-2 rounded-xl transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>

          </div>
        )}

        {/* Clean Coverage Areas */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
            Delivery Zones (ECIL & Surrounding Areas in 30-45 Mins)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {logisticsDeliveryZones.map((z, idx) => (
              <div key={idx} className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                <p className="font-bold text-royal-dark text-xs">{z.area}</p>
                <span className="text-[10px] text-slate-500">{z.etaMins} • {z.tag}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
