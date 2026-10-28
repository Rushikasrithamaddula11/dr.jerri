import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';
import { logisticsDeliveryZones } from '../data/medicinesData';
import { broadcastRealtimeEvent } from '../utils/realtimeSync';

export default function MedicineCartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  currentUser,
  onNavigate
}) {
  if (!isOpen) return null;

  // Checkout step: 'cart' | 'checkout' | 'payment' | 'confirmed'
  const [step, setStep] = useState('cart');

  // Customer Delivery Info
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.area ? `${currentUser.area}` : '',
    landmark: '',
    area: currentUser?.area || 'ECIL South Kamala Nagar',
    deliveryMode: 'express', // express | standard | pickup
    prescriptionFile: null,
    prescriptionNote: 'Doctor Consultation @ Dr. Jerri'
  });

  // Sync user profile when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || '',
        phone: prev.phone || currentUser.phone || '',
        area: prev.area || currentUser.area || 'ECIL South Kamala Nagar'
      }));
    }
  }, [currentUser]);

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi | cod | clinic
  const [utrNumber, setUtrNumber] = useState('');
  const [verifiedPayment, setVerifiedPayment] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Payment Status: 'waiting' | 'verifying' | 'completed'
  const [qrStatus, setQrStatus] = useState('waiting');
  const [autoUtr, setAutoUtr] = useState('');

  // Reset QR state whenever payment step is entered or payment method changes
  useEffect(() => {
    if (step === 'payment') {
      setQrStatus('waiting');
    }
  }, [step, paymentMethod]);

  // Calculations
  const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const mrpTotal = cart.reduce((acc, item) => acc + (item.mrp || item.price * 1.2) * item.qty, 0);
  const subTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const savings = Math.max(0, Math.round(mrpTotal - subTotal));

  const selectedZone = logisticsDeliveryZones.find((z) => z.area === formData.area) || logisticsDeliveryZones[0];
  const deliveryFee = formData.deliveryMode === 'pickup' ? 0 : subTotal >= 300 ? 0 : selectedZone.fee || 25;
  const grandTotal = Math.round(subTotal + deliveryFee);
  const rawUpi = clinicInfo.upiId || 'Jpkprasanth-2@ybl';
  const activeUpiId = rawUpi.includes('@') ? rawUpi : `${rawUpi}@ybl`;

  const hasRxItems = cart.some((i) => i.rxRequired);

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your Name and Mobile Number.');
      return;
    }
    if (formData.deliveryMode !== 'pickup' && !formData.address.trim()) {
      setErrorMsg('Please provide your complete delivery address.');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  // Realtime Gateway Stage Message
  const [gatewayStage, setGatewayStage] = useState('');

  // UPI QR code payment verification (Requires customer to enter actual 12-digit bank UTR)
  const handleVerifyAndCompletePayment = (customUtr) => {
    if (qrStatus === 'verifying' || qrStatus === 'completed') return;
    
    const utrToUse = (customUtr || utrNumber || '').trim();
    if (!utrToUse) {
      setErrorMsg('⚠️ Please enter the 12-digit UPI Reference Number (UTR) from your PhonePe/GPay app before submitting.');
      return;
    }
    if (utrToUse.length < 8) {
      setErrorMsg('⚠️ Please enter a valid UPI Reference / UTR number (8 to 12 digits).');
      return;
    }

    setQrStatus('verifying');
    setErrorMsg('');
    setGatewayStage('Recording UTR Reference for Clinic Bank Reconciliation...');

    setTimeout(() => {
      setAutoUtr(utrToUse);
      setQrStatus('completed');
      setGatewayStage('UTR Reference Recorded • Awaiting Clinic Verification');

      // Order is saved as 'pending' clinic verification
      setTimeout(() => {
        createConfirmedOrder(utrToUse, false);
      }, 1400);
    }, 700);
  };

  const createConfirmedOrder = (confirmedUtr, isInstantVerified = false) => {
    const orderId = 'DJ-MED-' + Math.floor(10000 + Math.random() * 90000);
    const finalUtrVal = confirmedUtr || utrNumber.trim() || (paymentMethod === 'upi' ? '429188492019' : 'COD');
    const newOrder = {
      orderId,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName: formData.name,
      phone: formData.phone || clinicInfo.phone,
      address: formData.deliveryMode === 'pickup' ? 'Self Pickup @ Dr. Jerri Clinic Counter' : `${formData.address}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.area}`,
      area: formData.area,
      deliveryMode: formData.deliveryMode,
      paymentMethod: isInstantVerified
        ? 'Realtime Instant UPI (Verified)'
        : paymentMethod === 'upi'
        ? 'Online UPI (Direct QR)'
        : paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : 'Pay at Clinic Counter',
      paymentStatus: isInstantVerified ? 'verified' : 'pending', // Verified if instant gateway used; pending if manual UTR
      utr: finalUtrVal,
      totalAmount: grandTotal,
      subTotal,
      savings,
      deliveryFee,
      items: [...cart],
      step: 1, // 1: Packed & verified
      riderName: 'Kishore Kumar (Dr. Jerri Delivery Partner)',
      riderPhone: clinicInfo.phone,
      vehicle: 'Hero Electric (TS 08 EK 4921)'
    };

    // Save to localStorage for realtime tracking persistence
    try {
      const existing = JSON.parse(localStorage.getItem('drjerri_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('drjerri_orders', JSON.stringify(existing.slice(0, 20)));
    } catch {
      // Ignore storage error
    }

    // Broadcast Realtime Event to Admin Portal and Logistics Trackers
    broadcastRealtimeEvent('ORDER_CREATED', newOrder);

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    if (onOrderSuccess) {
      onOrderSuccess(newOrder);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'upi') {
      handleVerifyAndCompletePayment(utrNumber);
    } else {
      createConfirmedOrder('COD', false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl border-l border-purple-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-800 text-white p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-lg shrink-0">
              <i className="fa-solid fa-basket-shopping"></i>
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg font-display leading-tight">
                {step === 'cart' && 'Your Medicine Basket'}
                {step === 'checkout' && 'Delivery Information'}
                {step === 'payment' && 'Payment Gateway (UPI)'}
                {step === 'confirmed' && 'Order Placed & Tracking'}
              </h3>
              <p className="text-xs text-purple-200">
                Dr. Jerri In-House Pharmacy • 24/7 Dispatch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* STEP 1: CART ITEMS */}
        {step === 'cart' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-purple-50 text-royal flex items-center justify-center text-3xl mb-4 border border-purple-200">
                  <i className="fa-solid fa-pills"></i>
                </div>
                <h4 className="font-black text-lg text-royal-dark mb-1 font-display">Your Basket is Empty</h4>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Explore our medicine catalog to order maternity care, antibiotics, fever relief, saline bottles or everyday health supplies.
                </p>
                <button
                  onClick={onClose}
                  className="bg-royal hover:bg-royal-dark text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-sm"
                >
                  Browse Medicines
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-4 divide-y divide-purple-100">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {item.rxRequired ? (
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                              Rx Required
                            </span>
                          ) : (
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-100 text-royal border border-purple-200">
                              OTC
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 truncate">{item.manufacturer}</span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-purple-800 font-semibold truncate">
                          {item.pack}
                        </p>

                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-black text-royal font-mono">
                            ₹{item.price}
                          </span>
                          {item.mrp && (
                            <span className="text-[10px] text-slate-400 line-through">
                              ₹{item.mrp}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 bg-purple-50 p-1 rounded-xl border border-purple-200 shrink-0">
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-lg bg-white text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-xs"
                          aria-label="Decrease quantity"
                        >
                          <i className="fa-solid fa-minus text-[9px]"></i>
                        </button>
                        <span className="text-xs font-black text-royal-dark px-1.5 min-w-[20px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-lg bg-white text-royal hover:bg-royal hover:text-white flex items-center justify-center text-xs transition shadow-xs"
                          aria-label="Increase quantity"
                        >
                          <i className="fa-solid fa-plus text-[9px]"></i>
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition p-1"
                        title="Remove"
                      >
                        <i className="fa-solid fa-trash-can text-xs"></i>
                      </button>
                    </div>
                  ))}

                  {/* Rx notice if present */}
                  {hasRxItems && (
                    <div className="py-3 bg-amber-50 rounded-2xl p-3 border border-amber-200 mt-2 text-xs text-amber-900 flex items-start gap-2.5">
                      <i className="fa-solid fa-prescription-bottle-medical text-amber-600 mt-0.5"></i>
                      <div>
                        <strong className="block font-bold">Prescription Items Detected:</strong>
                        <span>You can upload your doctor's slip in next step or our pharmacist will verify during consultation.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Summary & Proceed Footer */}
                <div className="bg-purple-50/70 border-t border-purple-100 p-4 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Items MRP Total ({itemsCount} items):</span>
                      <span className="line-through text-slate-400">₹{mrpTotal}</span>
                    </div>
                    <div className="flex justify-between text-royal font-bold">
                      <span>Total Savings (Clinic Discount):</span>
                      <span>-₹{savings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span className="font-bold text-slate-800">
                        {subTotal >= 300 ? <strong className="text-royal">FREE</strong> : '₹25 (Free above ₹300)'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-royal-dark pt-1 border-t border-purple-200">
                      <span>Grand Total:</span>
                      <span className="text-base text-royal font-mono">₹{subTotal >= 300 ? subTotal : subTotal + 25}</span>
                    </div>
                  </div>

                  {currentUser ? (
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition shadow-md shadow-royal/30 flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Delivery & Payment</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onClose();
                        if (onNavigate) onNavigate('login');
                      }}
                      className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition shadow-md shadow-royal/30 flex items-center justify-center gap-2"
                    >
                      <i className="fa-regular fa-user"></i>
                      <span>Sign In to Checkout (Required)</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 2: CHECKOUT & ADDRESS */}
        {step === 'checkout' && (
          <form onSubmit={handleProceedToPayment} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              
              {/* Back to Cart Button */}
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="text-xs font-bold text-royal hover:underline flex items-center gap-1.5"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back to Medicine Basket</span>
              </button>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Patient Contact Info */}
              <div className="bg-purple-50/50 rounded-2xl p-3.5 sm:p-4 border border-purple-100 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-royal-dark">
                  1. Patient Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9533551700"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed / Mode */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-wider text-royal-dark">
                  2. Choose Delivery Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMode: 'express' })}
                    className={`p-3 rounded-2xl border text-center transition ${
                      formData.deliveryMode === 'express'
                        ? 'border-royal bg-royal text-white shadow-sm'
                        : 'border-purple-200 bg-white text-slate-700 hover:bg-purple-50'
                    }`}
                  >
                    <i className="fa-solid fa-bolt text-base mb-1 block"></i>
                    <span className="text-[11px] font-black block">Express 45m</span>
                    <span className="text-[9px] opacity-80 block">Local Rider</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMode: 'standard' })}
                    className={`p-3 rounded-2xl border text-center transition ${
                      formData.deliveryMode === 'standard'
                        ? 'border-royal bg-royal text-white shadow-sm'
                        : 'border-purple-200 bg-white text-slate-700 hover:bg-purple-50'
                    }`}
                  >
                    <i className="fa-solid fa-clock text-base mb-1 block"></i>
                    <span className="text-[11px] font-black block">Same Day</span>
                    <span className="text-[9px] opacity-80 block">Standard Slot</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMode: 'pickup' })}
                    className={`p-3 rounded-2xl border text-center transition ${
                      formData.deliveryMode === 'pickup'
                        ? 'border-royal bg-royal text-white shadow-sm'
                        : 'border-purple-200 bg-white text-slate-700 hover:bg-purple-50'
                    }`}
                  >
                    <i className="fa-solid fa-hospital-user text-base mb-1 block"></i>
                    <span className="text-[11px] font-black block">Clinic Pickup</span>
                    <span className="text-[9px] opacity-80 block">Free 0 Fee</span>
                  </button>
                </div>
              </div>

              {/* Address Fields (if not pickup) */}
              {formData.deliveryMode !== 'pickup' && (
                <div className="bg-purple-50/50 rounded-2xl p-3.5 sm:p-4 border border-purple-100 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-royal-dark">
                    3. Delivery Address (Hyderabad Local)
                  </h4>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Select Area / Locality
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                    >
                      {logisticsDeliveryZones.map((z, idx) => (
                        <option key={idx} value={z.area}>
                          {z.area} ({z.etaMins} - {z.tag})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Flat / House No. & Street Name *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="e.g. Flat 302, Sai Residency, Main Road"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nearby Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Kamala Nagar Water Tank"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Optional Prescription Upload / Note */}
              <div className="bg-white rounded-2xl p-3.5 border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-royal-dark uppercase">
                    Prescription / Doctor Slip
                  </span>
                  <span className="text-[10px] text-purple-700 font-semibold bg-purple-100 px-2 py-0.5 rounded-full">
                    Optional
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Doctor's name or prescription note (e.g. Dr. Harika / Dr. Supriya)"
                  value={formData.prescriptionNote}
                  onChange={(e) => setFormData({ ...formData, prescriptionNote: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/50"
                />
              </div>

            </div>

            {/* Sticky Next Button */}
            <div className="p-4 bg-purple-50/70 border-t border-purple-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Total to Pay:</span>
                <span className="text-base font-black text-royal font-mono">₹{grandTotal}</span>
              </div>
              <button
                type="submit"
                className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-2.5 px-6 rounded-xl text-xs sm:text-sm transition shadow-md shadow-royal/30 flex items-center gap-2"
              >
                <span>Continue to Payment</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT GATEWAY (UPI & REAL QR CODE) */}
        {step === 'payment' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="text-xs font-bold text-royal hover:underline flex items-center gap-1.5"
              >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back to Delivery Details</span>
              </button>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'upi'
                      ? 'border-royal bg-royal text-white shadow-sm'
                      : 'border-purple-200 bg-white text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  <i className="fa-solid fa-qrcode text-lg"></i>
                  <span className="text-xs font-black">UPI Instant Pay</span>
                  <span className="text-[9px] opacity-80">PhonePe / GPay / Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                    paymentMethod === 'cod'
                      ? 'border-royal bg-royal text-white shadow-sm'
                      : 'border-purple-200 bg-white text-slate-700 hover:bg-purple-50'
                  }`}
                >
                  <i className="fa-solid fa-hand-holding-dollar text-lg"></i>
                  <span className="text-xs font-black">Cash on Delivery</span>
                  <span className="text-[9px] opacity-80">Pay on Arrival</span>
                </button>
              </div>

              {/* UPI PAYMENT GATEWAY DETAILS */}
              {paymentMethod === 'upi' ? (
                <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl p-4 sm:p-5 border-2 border-royal/30 shadow-md space-y-4">
                  
                  {/* Merchant & Amount Banner */}
                  <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-royal bg-purple-100 px-2 py-0.5 rounded-md">
                        Official Payment Gateway
                      </span>
                      <h4 className="font-black text-sm text-royal-dark mt-1">
                        Dr. Jerri Poly Clinic & Pharmacy
                      </h4>
                      <p className="text-[11px] text-slate-500">ECIL South Kamala Nagar Desk</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Payable</span>
                      <span className="text-xl font-black text-royal font-mono">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Verified Payment Gateway Notice */}
                  <div className="bg-purple-100/70 rounded-2xl p-3 border border-purple-200 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-royal text-white flex items-center justify-center text-sm shrink-0">
                      <i className="fa-solid fa-shield-halved"></i>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-royal uppercase tracking-wider block">
                        Verified Instant Payment
                      </span>
                      <p className="text-xs font-bold text-slate-800">
                        Scan the QR code or tap your preferred UPI app below
                      </p>
                    </div>
                  </div>

                  {/* QR Code / Payment Verification Container */}
                  <div className="relative">
                    {qrStatus === 'completed' ? (
                      /* PAYMENT SUBMITTED VIEW */
                      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 rounded-3xl border-2 border-emerald-400 shadow-xl text-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-3 shadow-md ring-4 ring-emerald-200">
                          <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1 border border-emerald-300">
                          Payment Broadcasted Live
                        </span>
                        <h4 className="text-xl font-black text-slate-900 font-display mt-1">
                          UTR #{autoUtr || utrNumber}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Amount: ₹{grandTotal} • Updated in Admin Portal in Realtime
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-emerald-200">
                          <i className="fa-solid fa-circle-notch fa-spin text-emerald-600"></i>
                          <span>Order Broadcasted to Fleet! Launching live tracker...</span>
                        </div>
                      </div>
                    ) : qrStatus === 'verifying' ? (
                      /* VERIFYING PAYMENT IN PROGRESS */
                      <div className="flex flex-col items-center justify-center p-8 bg-purple-50/80 rounded-3xl border-2 border-purple-300 text-center space-y-3">
                        <div className="w-14 h-14 rounded-full bg-purple-100 text-royal flex items-center justify-center text-2xl mx-auto shadow-inner">
                          <i className="fa-solid fa-circle-notch fa-spin"></i>
                        </div>
                        <h4 className="text-sm font-black text-royal-dark font-display">
                          {gatewayStage || 'Processing Realtime UPI Payment...'}
                        </h4>
                        <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                          Communicating in realtime with Dr. Jerri Clinic banking gateway & accounts desk.
                        </p>
                      </div>
                    ) : (
                      /* ACTIVE QR CODE SCANNER VIEW (Awaiting user payment) */
                      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-3xl border-2 border-purple-200 shadow-inner space-y-3">
                        
                        {/* Status Instruction Banner */}
                        <div className="w-full flex items-center justify-between text-[11px] bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200 font-semibold text-royal-dark">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
                            <span>Direct UPI QR Code</span>
                          </div>
                          <span className="font-mono font-bold text-purple-700">
                            Pay ₹{grandTotal}
                          </span>
                        </div>

                        <div className="relative p-3 bg-white rounded-2xl border border-purple-100 shadow-md">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(
                              `upi://pay?pa=${activeUpiId}&pn=Dr.%20Jerri%20Poly%20Clinic&am=${grandTotal}&cu=INR`
                            )}`}
                            alt="Dr. Jerri UPI QR Code"
                            className="w-44 h-44 object-contain mx-auto"
                          />
                        </div>

                        <div className="text-center">
                          <p className="text-xs font-black text-royal-dark">
                            Scan with PhonePe, Google Pay, Paytm, or BHIM
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Pay exact amount: <strong className="text-royal font-mono font-bold text-xs">₹{grandTotal}</strong>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct Mobile UPI Intent Buttons */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block text-center">
                      Or Open Installed UPI App on your phone:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`phonepe://pay?pa=${activeUpiId}&pn=Dr%20Jerri%20Pharmacy&am=${grandTotal}&cu=INR`}
                        className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-2 px-3 rounded-xl text-center shadow-xs transition"
                      >
                        <i className="fa-solid fa-mobile-screen mr-1"></i> PhonePe
                      </a>
                      <a
                        href={`gpay://upi/pay?pa=${activeUpiId}&pn=Dr%20Jerri%20Pharmacy&am=${grandTotal}&cu=INR`}
                        className="bg-slate-800 hover:bg-black text-white text-xs font-bold py-2 px-3 rounded-xl text-center shadow-xs transition"
                      >
                        <i className="fa-brands fa-google mr-1"></i> Google Pay
                      </a>
                    </div>
                  </div>

                  {/* Transaction ID / UTR Input Required */}
                  <div className="space-y-2 pt-3 border-t border-purple-100 bg-purple-50/50 p-3.5 rounded-2xl border">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black text-royal-dark">
                        Step 2: Enter 12-Digit UPI Reference (UTR) *
                      </label>
                      <span className="text-[10px] text-rose-700 font-bold bg-rose-100 px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 429188492019 (from PhonePe / GPay screen)"
                      value={utrNumber}
                      onChange={(e) => {
                        setUtrNumber(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                    />
                    <p className="text-[10px] text-slate-500 leading-snug">
                      ℹ️ To prevent fraudulent or unconfirmed orders, you must provide the 12-digit UTR from your bank app. Our clinic staff will verify this before dispatch.
                    </p>
                  </div>

                </div>
              ) : (
                /* Cash on Delivery Information */
                <div className="bg-purple-50/60 rounded-3xl p-5 border border-purple-200 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-royal text-white flex items-center justify-center text-xl">
                    <i className="fa-solid fa-hand-holding-dollar"></i>
                  </div>
                  <h4 className="font-black text-base text-royal-dark font-display">
                    Cash on Doorstep Delivery
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You can pay the total amount of <strong className="text-royal font-mono font-bold">₹{grandTotal}</strong> in cash or scan the delivery rider's live UPI QR code upon arrival.
                  </p>
                  <div className="text-[11px] text-purple-900 bg-white p-3 rounded-xl border border-purple-200">
                    <i className="fa-solid fa-circle-check text-royal mr-1"></i> Exact change appreciated. Digital receipt sent immediately to your WhatsApp.
                  </div>
                </div>
              )}

            </div>

            {/* Confirm Order Button */}
            <div className="p-4 bg-purple-50/70 border-t border-purple-100 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Amount to Pay</span>
                <span className="text-base font-black text-royal font-mono">₹{grandTotal}</span>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={qrStatus === 'verifying' || qrStatus === 'completed'}
                className={`active:scale-95 text-white font-black py-3 px-6 rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center gap-2 ${
                  qrStatus === 'completed'
                    ? 'bg-amber-600 shadow-amber-600/30'
                    : qrStatus === 'verifying'
                    ? 'bg-purple-400 cursor-wait'
                    : 'bg-royal hover:bg-royal-dark shadow-royal/30'
                }`}
              >
                {qrStatus === 'completed' ? (
                  <>
                    <i className="fa-solid fa-hourglass-half text-xs"></i>
                    <span>Submitted • Launching Tracker...</span>
                  </>
                ) : qrStatus === 'verifying' ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                    <span>Submitting UTR...</span>
                  </>
                ) : paymentMethod === 'upi' ? (
                  <>
                    <i className="fa-solid fa-check text-xs"></i>
                    <span>Submit UTR & Confirm Order</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-lock text-xs"></i>
                    <span>Confirm Order (Cash on Delivery)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMED ORDER & REALTIME LOGISTICS LAUNCH */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 flex flex-col overflow-y-auto p-5 sm:p-6 text-center space-y-5">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md ${
              confirmedOrder.paymentStatus === 'verified'
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-amber-100 text-amber-600'
            }`}>
              <i className={`fa-solid ${confirmedOrder.paymentStatus === 'verified' ? 'fa-circle-check' : 'fa-clock'}`}></i>
            </div>

            <div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                confirmedOrder.paymentStatus === 'verified'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {confirmedOrder.paymentStatus === 'verified'
                  ? 'Payment Verified & Confirmed'
                  : confirmedOrder.paymentMethod.includes('UPI')
                  ? '⏳ UPI Submitted • Pending Clinic Verification'
                  : '📦 Order Confirmed • Pay on Delivery'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-royal-dark font-display mt-2">
                Order #{confirmedOrder.orderId}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {confirmedOrder.paymentMethod.includes('UPI') ? (
                  <>Thank you, <strong>{confirmedOrder.customerName}</strong>! Your UPI UTR <strong>{confirmedOrder.utr}</strong> has been submitted. Dr. Jerri pharmacy accounts desk will verify the credit in our bank statement before medicine dispatch.</>
                ) : (
                  <>Thank you, <strong>{confirmedOrder.customerName}</strong>! Our licensed pharmacist at Dr. Jerri Clinic is currently preparing your package.</>
                )}
              </p>
            </div>

            {/* Order Brief Box */}
            <div className="bg-purple-50/70 rounded-2xl p-4 text-left border border-purple-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-royal">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-bold text-slate-800">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status:</span>
                <span className={`font-bold ${
                  confirmedOrder.paymentStatus === 'verified' ? 'text-emerald-700' : 'text-amber-700'
                }`}>
                  {confirmedOrder.paymentStatus === 'verified' ? '● Verified' : '⏳ Pending Bank Verification'}
                </span>
              </div>
              {confirmedOrder.utr && confirmedOrder.utr !== 'COD' && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Submitted UTR:</span>
                  <span className="font-mono font-bold text-royal">{confirmedOrder.utr}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-purple-100 pt-1.5">
                <span className="text-slate-700 font-bold">Total Amount:</span>
                <span className="font-mono font-black text-royal text-sm">₹{confirmedOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-slate-800">30 - 45 Mins (Express)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onClearCart();
                }}
                className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm transition shadow-lg shadow-royal/30 flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-truck-fast"></i>
                <span>Open Live Logistics Tracker</span>
              </button>

              <a
                href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Pharmacy,%20my%20order%20is%20${confirmedOrder.orderId}%20for%20Rs.${confirmedOrder.totalAmount}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-purple-50 text-royal-dark border border-purple-200 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition"
              >
                <i className="fa-brands fa-whatsapp text-royal text-sm"></i>
                <span>Send WhatsApp Receipt</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
