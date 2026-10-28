import React, { useState, useEffect, useMemo } from 'react';
import { clinicInfo } from '../data/clinicData';
import { medicineCategories, medicinesList } from '../data/medicinesData';
import { broadcastRealtimeEvent, subscribeToRealtimeEvents } from '../utils/realtimeSync';

export default function AdminPortalPage({
  currentUser,
  onLogout,
  onNavigate,
  onLoginSuccess,
  customMedicines,
  onAddMedicine,
  onDeleteMedicine,
  onToggleMedicineStock
}) {
  // If not logged in as admin, show clean lock / authorization screen
  const isAdmin = currentUser && currentUser.role === 'admin';

  // Admin login states
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('drjerri@2026');
  const [adminAuthError, setAdminAuthError] = useState('');

  const handleAdminAuthSubmit = (e) => {
    e.preventDefault();
    setAdminAuthError('');
    if (adminUsername.trim().toLowerCase() === 'admin' && adminPassword.trim() === 'drjerri@2026') {
      const adminObj = {
        name: 'Dr. Jerri Admin Desk',
        username: 'admin',
        role: 'admin',
        phone: '9533551700'
      };
      localStorage.setItem('drjerri_auth', JSON.stringify(adminObj));
      if (onLoginSuccess) {
        onLoginSuccess(adminObj);
      }
    } else {
      setAdminAuthError('Invalid credentials. Use username: admin and password: drjerri@2026');
    }
  };

  // Active Admin Tabs: 'dashboard' | 'medicines' | 'payments' | 'logistics' | 'users'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('drjerri_orders') || '[]');
      if (stored.length > 0) return stored;
    } catch {
      // Fallback
    }
    return [
      {
        orderId: 'DJ-MED-84920',
        createdAt: '12:45 PM',
        date: 'Today',
        customerName: 'Ramesh Varma',
        phone: '9849012345',
        address: 'Plot 42, South Kamala Nagar, ECIL, Hyderabad',
        area: 'ECIL South Kamala Nagar',
        paymentMethod: 'Online UPI',
        utr: 'UTR-9482910482',
        paymentStatus: 'verified', // 'verified' | 'pending'
        totalAmount: 505,
        items: [
          { name: 'Shelcal XT (Calcium + Vitamin D3 + Folate)', qty: 1, price: 310, pack: 'Strip of 15 Tablets' },
          { name: 'Orofer-XT (Ferrous Ascorbate + Folic Acid)', qty: 1, price: 195, pack: 'Strip of 10 Tablets' }
        ],
        step: 3, // 1: Packed, 2: Dispatched, 3: Out for delivery, 4: Delivered
        riderName: 'Kishore Kumar',
        riderPhone: '9533551700',
        vehicle: 'Hero Electric (TS 08 EK 4921)'
      },
      {
        orderId: 'DJ-MED-71829',
        createdAt: '11:15 AM',
        date: 'Today',
        customerName: 'Pravallika K.',
        phone: '9440123456',
        address: 'Flat 201, Srinivasa Heights, ECIL Cross Roads',
        area: 'ECIL Cross Roads',
        paymentMethod: 'Online UPI',
        utr: 'UTR-8172940291',
        paymentStatus: 'verified',
        totalAmount: 388,
        items: [
          { name: 'Folvite 5mg (High Potency Folic Acid)', qty: 2, price: 78, pack: 'Strip of 45 Tablets' },
          { name: 'Dolo 650mg Tablet', qty: 2, price: 32, pack: 'Strip of 15 Tablets' },
          { name: 'Electral ORS Powder (WHO Formula)', qty: 4, price: 22, pack: '21.8g Sachet' }
        ],
        step: 4,
        riderName: 'Ramesh Reddy',
        riderPhone: '9533551700',
        vehicle: 'TVS iQube (TS 08 AB 1102)'
      },
      {
        orderId: 'DJ-MED-63910',
        createdAt: '10:30 AM',
        date: 'Today',
        customerName: 'Srinivas Rao',
        phone: '9849011223',
        address: 'House No. 12-4, Kamala Nagar Main Road',
        area: 'ECIL South Kamala Nagar',
        paymentMethod: 'Cash on Delivery (COD)',
        utr: 'COD-PENDING',
        paymentStatus: 'pending',
        totalAmount: 430,
        items: [
          { name: 'Augmentin 625 Duo Tablet', qty: 1, price: 210, pack: 'Strip of 10 Tablets' },
          { name: 'Normal Saline 0.9% IV Infusion (100ml)', qty: 2, price: 55, pack: '100ml Sterile Infusion Bottle' }
        ],
        step: 2,
        riderName: 'Suresh Varma',
        riderPhone: '9533551700',
        vehicle: 'Ather 450X (TS 08 EV 8831)'
      }
    ];
  });

  // Persist orders to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('drjerri_orders', JSON.stringify(orders));
    } catch {
      // Ignore
    }
  }, [orders]);

  // Realtime listener for incoming patient orders & payments
  useEffect(() => {
    const unsub = subscribeToRealtimeEvents((event) => {
      if (event.type === 'ORDER_CREATED' && event.payload) {
        setOrders((prev) => {
          if (prev.some((o) => o.orderId === event.payload.orderId)) return prev;
          return [event.payload, ...prev];
        });
      }
    });
    return unsub;
  }, []);

  // Delivery riders list
  const deliveryFleet = [
    { id: 'rider-1', name: 'Kishore Kumar', phone: '9533551700', vehicle: 'Hero Electric (TS 08 EK 4921)', status: 'Active (On Delivery)', ordersDelivered: 14 },
    { id: 'rider-2', name: 'Ramesh Reddy', phone: '9533551700', vehicle: 'TVS iQube (TS 08 AB 1102)', status: 'Available', ordersDelivered: 9 },
    { id: 'rider-3', name: 'Suresh Varma', phone: '9533551700', vehicle: 'Ather 450X (TS 08 EV 8831)', status: 'Active (In Transit)', ordersDelivered: 11 },
    { id: 'rider-4', name: 'Mohammed Ali', phone: '9533551700', vehicle: 'Bajaj Chetak (TS 08 EC 5540)', status: 'Available', ordersDelivered: 8 }
  ];

  // Users state
  const [users, setUsers] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('drjerri_users') || '[]');
      if (stored.length > 0) return stored;
    } catch {
      // Fallback
    }
    return [
      { id: 'u1', name: 'Ramesh Varma', phone: '9849012345', area: 'ECIL South Kamala Nagar', ordersCount: 3, totalSpent: 1250, joinedDate: '18 Oct 2026' },
      { id: 'u2', name: 'Pravallika K.', phone: '9440123456', area: 'ECIL Cross Roads', ordersCount: 2, totalSpent: 890, joinedDate: '20 Oct 2026' },
      { id: 'u3', name: 'Srinivas Rao', phone: '9849011223', area: 'Kamala Nagar', ordersCount: 4, totalSpent: 1980, joinedDate: '15 Oct 2026' },
      { id: 'u4', name: 'Madhavi L.', phone: '9988776655', area: 'A.S. Rao Nagar', ordersCount: 1, totalSpent: 450, joinedDate: '22 Oct 2026' },
      { id: 'u5', name: 'Kavitha Devi', phone: '9123456789', area: 'Sainikpuri', ordersCount: 2, totalSpent: 820, joinedDate: '23 Oct 2026' }
    ];
  });

  // Medicines tab state
  const [medicineSearch, setMedicineSearch] = useState('');
  const [medicineCatFilter, setMedicineCatFilter] = useState('all');
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);

  // New Medicine Form State
  const [newMed, setNewMed] = useState({
    name: '',
    category: 'fever-pain',
    composition: '',
    manufacturer: '',
    pack: 'Strip of 10 Tablets',
    mrp: '',
    price: '',
    rxRequired: false,
    stockQty: 50,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    desc: ''
  });

  // Order Search / Filter
  const [orderFilter, setOrderFilter] = useState('all'); // 'all' | 'verified' | 'pending'

  // Summary Metrics
  const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus === 'verified' ? sum + o.totalAmount : sum), 0);
  const pendingOrdersCount = orders.filter((o) => o.paymentStatus === 'pending').length;
  const verifiedOrdersCount = orders.filter((o) => o.paymentStatus === 'verified').length;
  const allMedsList = useMemo(() => [...customMedicines, ...medicinesList], [customMedicines]);

  const filteredMedicines = useMemo(() => {
    return allMedsList.filter((med) => {
      const matchCat = medicineCatFilter === 'all' || med.category === medicineCatFilter;
      if (!matchCat) return false;
      if (!medicineSearch.trim()) return true;
      const q = medicineSearch.toLowerCase().trim();
      return (
        med.name.toLowerCase().includes(q) ||
        (med.composition && med.composition.toLowerCase().includes(q)) ||
        (med.manufacturer && med.manufacturer.toLowerCase().includes(q))
      );
    });
  }, [allMedsList, medicineCatFilter, medicineSearch]);

  // Handle Add Medicine Submit
  const handleCreateMedicine = (e) => {
    e.preventDefault();
    if (!newMed.name.trim() || !newMed.price) return;

    const priceNum = parseFloat(newMed.price);
    const mrpNum = newMed.mrp ? parseFloat(newMed.mrp) : Math.round(priceNum * 1.2);
    const discount = mrpNum > priceNum ? Math.round(((mrpNum - priceNum) / mrpNum) * 100) : 0;

    const created = {
      id: 'med-custom-' + Date.now(),
      name: newMed.name.trim(),
      category: newMed.category,
      composition: newMed.composition.trim() || 'Active Pharmaceutical Formula',
      manufacturer: newMed.manufacturer.trim() || 'Dr. Jerri Verified Pharmacy',
      pack: newMed.pack.trim(),
      mrp: mrpNum,
      price: priceNum,
      discountPercent: discount,
      rxRequired: Boolean(newMed.rxRequired),
      inStock: true,
      stockQty: parseInt(newMed.stockQty) || 50,
      image: newMed.image.trim() || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      desc: newMed.desc.trim() || 'Authentic medication stocked at Dr. Jerri In-House Pharmacy.',
      isCustom: true
    };

    onAddMedicine(created);
    setIsAddMedModalOpen(false);
    setNewMed({
      name: '',
      category: 'fever-pain',
      composition: '',
      manufacturer: '',
      pack: 'Strip of 10 Tablets',
      mrp: '',
      price: '',
      rxRequired: false,
      stockQty: 50,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      desc: ''
    });
  };

  // Order Actions: Mark Payment Verified
  const handleVerifyPayment = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? { ...o, paymentStatus: 'verified', paymentMethod: 'Online UPI (Verified)' }
          : o
      )
    );
    broadcastRealtimeEvent('PAYMENT_VERIFIED', { orderId });
  };

  // Order Actions: Allocate Rider
  const handleAssignRider = (orderId, riderName) => {
    const rider = deliveryFleet.find((r) => r.name === riderName);
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? {
              ...o,
              riderName,
              riderPhone: rider ? rider.phone : '9533551700',
              vehicle: rider ? rider.vehicle : 'Hero Electric (TS 08 EK 4921)'
            }
          : o
      )
    );
    broadcastRealtimeEvent('RIDER_ASSIGNED', { orderId, riderName, riderPhone: rider ? rider.phone : '9533551700' });
  };

  // Order Actions: Update Delivery Stage
  const handleUpdateStep = (orderId, nextStep) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, step: nextStep } : o))
    );
    broadcastRealtimeEvent('STEP_UPDATED', { orderId, nextStep });
  };

  // If NOT authorized as admin, display clean login prompt
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-purple-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-royal text-white flex items-center justify-center text-2xl mx-auto shadow-md">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div>
            <span className="text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Staff Authorization Required
            </span>
            <h2 className="text-2xl font-black text-royal-dark font-display mt-2">
              Dr. Jerri Admin Portal
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Internal clinic management: stock inventory, verify payments, assign riders, and view patient database.
            </p>
          </div>

          {adminAuthError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
              {adminAuthError}
            </div>
          )}

          <form onSubmit={handleAdminAuthSubmit} className="space-y-3 text-xs text-left">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Username</label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="drjerri@2026"
                className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-royal/30 flex items-center justify-center gap-2 mt-2"
            >
              <i className="fa-solid fa-lock text-xs"></i>
              <span>Sign In as Admin</span>
            </button>
          </form>

          <div className="pt-2 border-t border-purple-100">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-slate-400 hover:text-royal font-bold text-xs block mx-auto pt-1"
            >
              ← Return to Clinic Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Admin Top Navigation Strip */}
      <div className="bg-royal-dark text-white border-b border-purple-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center text-base">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base font-display">Dr. Jerri Admin Portal</span>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Live Operations
                </span>
              </div>
              <p className="text-[10px] text-purple-200">
                Logged in as: <strong>{currentUser.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-house text-[10px]"></i>
              <span className="hidden sm:inline">View Website</span>
            </button>

            <button
              onClick={onLogout}
              className="bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-[10px]"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-1 overflow-x-auto hide-scrollbar text-xs font-bold pt-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-t-xl transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'dashboard' ? 'bg-slate-50 text-royal-dark font-black shadow-xs' : 'text-purple-200 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-chart-pie text-xs"></i>
            <span>Overview Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-4 py-2.5 rounded-t-xl transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'medicines' ? 'bg-slate-50 text-royal-dark font-black shadow-xs' : 'text-purple-200 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-pills text-xs"></i>
            <span>Medicines Inventory ({allMedsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2.5 rounded-t-xl transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'payments' ? 'bg-slate-50 text-royal-dark font-black shadow-xs' : 'text-purple-200 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-credit-card text-xs"></i>
            <span>Payments & Orders</span>
            {pendingOrdersCount > 0 && (
              <span className="bg-amber-400 text-slate-900 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('logistics')}
            className={`px-4 py-2.5 rounded-t-xl transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'logistics' ? 'bg-slate-50 text-royal-dark font-black shadow-xs' : 'text-purple-200 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-motorcycle text-xs"></i>
            <span>Delivery Allocation ({deliveryFleet.length} Riders)</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2.5 rounded-t-xl transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'users' ? 'bg-slate-50 text-royal-dark font-black shadow-xs' : 'text-purple-200 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-users text-xs"></i>
            <span>Patients & Users ({users.length})</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* 4 Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Sales</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-xs">
                    <i className="fa-solid fa-indian-rupee-sign"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-royal-dark font-mono">₹{totalRevenue}</h3>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">
                  ● Verified payments collected
                </p>
              </div>

              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-xs">
                    <i className="fa-solid fa-basket-shopping"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-royal-dark font-display">{orders.length}</h3>
                <p className="text-[10px] text-slate-500 mt-1">
                  <strong className="text-emerald-600">{verifiedOrdersCount} Verified</strong> • <strong className="text-amber-600">{pendingOrdersCount} Pending</strong>
                </p>
              </div>

              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Catalog Medicines</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-xs">
                    <i className="fa-solid fa-pills"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-royal-dark font-display">{allMedsList.length}</h3>
                <p className="text-[10px] text-purple-700 font-semibold mt-1">
                  {customMedicines.length} added by admin
                </p>
              </div>

              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">EV Delivery Fleet</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-xs">
                    <i className="fa-solid fa-motorcycle"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-royal-dark font-display">{deliveryFleet.length} Riders</h3>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">
                  ● 100% active in ECIL area
                </p>
              </div>

            </div>

            {/* Quick Action Buttons Strip */}
            <div className="bg-gradient-to-r from-royal-dark to-purple-800 rounded-3xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div>
                <h3 className="font-black text-base sm:text-lg font-display">Quick Management Actions</h3>
                <p className="text-xs text-purple-200 mt-0.5">
                  Direct shortcuts to perform clinic administrative tasks in one click.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => { setActiveTab('medicines'); setIsAddMedModalOpen(true); }}
                  className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus text-royal"></i>
                  <span>Add Medicine</span>
                </button>

                <button
                  onClick={() => setActiveTab('payments')}
                  className="bg-purple-700 hover:bg-purple-600 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition border border-purple-400/30 flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-receipt"></i>
                  <span>Check Payments</span>
                </button>

                <button
                  onClick={() => setActiveTab('logistics')}
                  className="bg-purple-700 hover:bg-purple-600 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition border border-purple-400/30 flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-truck-fast"></i>
                  <span>Assign Riders</span>
                </button>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-purple-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-sm sm:text-base text-royal-dark font-display">Recent Customer Dispatches</h3>
                  <p className="text-[11px] text-slate-500">Live feed of orders placed through the pharmacy store.</p>
                </div>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="text-xs font-bold text-royal hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-purple-50 text-royal-dark uppercase text-[10px] font-black border-y border-purple-100">
                    <tr>
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Items</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Payment</th>
                      <th className="py-2.5 px-3">Delivery Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.orderId} className="hover:bg-purple-50/40">
                        <td className="py-3 px-3 font-mono font-bold text-royal">{o.orderId}</td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-800">{o.customerName}</p>
                          <span className="text-[10px] text-slate-400">{o.phone}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-slate-600 font-medium">{o.items.length} items</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-royal">₹{o.totalAmount}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.paymentStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {o.paymentStatus === 'verified' ? 'Verified' : 'Pending Verification'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-xs font-bold text-slate-700">
                            {o.step === 4 ? '✅ Delivered' : o.step === 3 ? '🚚 Out for Delivery' : o.step === 2 ? '📦 Dispatched' : '⏳ Packed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MEDICINES INVENTORY */}
        {/* ========================================================= */}
        {activeTab === 'medicines' && (
          <div className="space-y-5">
            
            {/* Header Strip & Add Medicine Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-royal-dark font-display">
                  Medicine Catalog & Stock Management
                </h2>
                <p className="text-xs text-slate-500">
                  Add new medicines, adjust prices, toggle stock availability, and manage prescription items.
                </p>
              </div>

              <button
                onClick={() => setIsAddMedModalOpen(true)}
                className="bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Add New Medicine</span>
              </button>
            </div>

            {/* Search & Category Filter */}
            <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-xs flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-xs text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search by medicine name, salts, manufacturer..."
                  value={medicineSearch}
                  onChange={(e) => setMedicineSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                />
              </div>

              <select
                value={medicineCatFilter}
                onChange={(e) => setMedicineCatFilter(e.target.value)}
                className="w-full sm:w-auto text-xs px-3 py-1.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/50 font-semibold"
              >
                {medicineCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Medicines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredMedicines.map((med) => (
                <div
                  key={med.id}
                  className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="w-14 h-14 rounded-xl object-cover bg-purple-50 shrink-0 border border-purple-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                          med.rxRequired ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-royal'
                        }`}>
                          {med.rxRequired ? 'Rx Required' : 'OTC'}
                        </span>
                        {med.isCustom && (
                          <span className="text-[9px] font-bold bg-pink-100 text-pink-800 px-1.5 py-0.2 rounded">
                            Custom Added
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 leading-snug line-clamp-1">{med.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{med.manufacturer}</p>
                      <p className="text-[10px] text-purple-700 font-semibold truncate">{med.pack}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-purple-50 text-xs">
                    <div>
                      <span className="font-mono font-black text-royal text-sm">₹{med.price}</span>
                      {med.mrp && <span className="text-[10px] text-slate-400 line-through ml-1">₹{med.mrp}</span>}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleMedicineStock(med.id)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg transition ${
                          med.inStock !== false
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                        }`}
                      >
                        {med.inStock !== false ? 'In Stock' : 'Out of Stock'}
                      </button>

                      {med.isCustom && (
                        <button
                          onClick={() => onDeleteMedicine(med.id)}
                          className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center text-xs transition"
                          title="Delete Medicine"
                        >
                          <i className="fa-solid fa-trash-can text-[10px]"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add New Medicine */}
            {isAddMedModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-purple-200">
                  <div className="bg-gradient-to-r from-royal-dark to-purple-800 text-white p-4 sm:p-5 flex items-center justify-between">
                    <h3 className="font-black text-base font-display">Add Medicine to Store Catalog</h3>
                    <button
                      onClick={() => setIsAddMedModalOpen(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>

                  <form onSubmit={handleCreateMedicine} className="p-4 sm:p-6 overflow-y-auto space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Medicine Brand Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Paracetamol 650mg / Dolo 650"
                        value={newMed.name}
                        onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Category *</label>
                        <select
                          value={newMed.category}
                          onChange={(e) => setNewMed({ ...newMed, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-white"
                        >
                          {medicineCategories.filter(c => c.id !== 'all').map((c) => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Packaging *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Strip of 15 Tablets"
                          value={newMed.pack}
                          onChange={(e) => setNewMed({ ...newMed, pack: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Selling Price (₹) *</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 45"
                          value={newMed.price}
                          onChange={(e) => setNewMed({ ...newMed, price: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">MRP (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g. 55"
                          value={newMed.mrp}
                          onChange={(e) => setNewMed({ ...newMed, mrp: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Manufacturer</label>
                        <input
                          type="text"
                          placeholder="e.g. Micro Labs / Torrent Pharma"
                          value={newMed.manufacturer}
                          onChange={(e) => setNewMed({ ...newMed, manufacturer: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Stock Quantity</label>
                        <input
                          type="number"
                          placeholder="50"
                          value={newMed.stockQty}
                          onChange={(e) => setNewMed({ ...newMed, stockQty: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Salt / Chemical Composition</label>
                      <input
                        type="text"
                        placeholder="e.g. Paracetamol IP 650mg"
                        value={newMed.composition}
                        onChange={(e) => setNewMed({ ...newMed, composition: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="rxReq"
                        checked={newMed.rxRequired}
                        onChange={(e) => setNewMed({ ...newMed, rxRequired: e.target.checked })}
                        className="w-4 h-4 text-royal rounded"
                      />
                      <label htmlFor="rxReq" className="font-bold text-slate-700 cursor-pointer">
                        Prescription Required (Doctor Slip Needed)
                      </label>
                    </div>

                    <div className="pt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddMedModalOpen(false)}
                        className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-2.5 rounded-xl bg-royal hover:bg-royal-dark text-white font-black shadow"
                      >
                        Publish to Store
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PAYMENTS & ORDERS */}
        {/* ========================================================= */}
        {activeTab === 'payments' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-royal-dark font-display">
                  Payments & Order Verification
                </h2>
                <p className="text-xs text-slate-500">
                  Verify customer UPI payments, review transaction receipts, and acknowledge orders for packing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOrderFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    orderFilter === 'all' ? 'bg-royal text-white' : 'bg-white text-slate-700 border'
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setOrderFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    orderFilter === 'pending' ? 'bg-amber-500 text-white' : 'bg-white text-slate-700 border'
                  }`}
                >
                  Pending ({pendingOrdersCount})
                </button>
                <button
                  onClick={() => setOrderFilter('verified')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    orderFilter === 'verified' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border'
                  }`}
                >
                  Verified ({verifiedOrdersCount})
                </button>
              </div>
            </div>

            <div className="space-y-3.5">
              {orders
                .filter((o) => (orderFilter === 'all' ? true : o.paymentStatus === orderFilter))
                .map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-royal">{order.orderId}</span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            order.paymentStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {order.paymentStatus === 'verified' ? '● Payment Verified' : '⏳ Verification Pending'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Placed by <strong>{order.customerName}</strong> ({order.phone}) • {order.createdAt || '12:00 PM'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-royal font-mono">₹{order.totalAmount}</span>
                        {order.paymentStatus === 'pending' ? (
                          <button
                            onClick={() => handleVerifyPayment(order.orderId)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 shadow-xs"
                          >
                            <i className="fa-solid fa-check text-[10px]"></i>
                            <span>Approve & Verify</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Payment Method & UTR</span>
                        <p className="font-bold text-royal-dark mt-0.5">{order.paymentMethod}</p>
                        <p className="font-mono text-[11px] text-purple-700 font-semibold">{order.utr || 'N/A'}</p>
                      </div>

                      <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Delivery Destination</span>
                        <p className="font-bold text-slate-800 mt-0.5 truncate">{order.address}</p>
                        <p className="text-[10px] text-slate-500">{order.area}</p>
                      </div>

                      <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Assigned Rider</span>
                        <p className="font-bold text-slate-800 mt-0.5">{order.riderName || 'Unassigned'}</p>
                        <p className="text-[10px] text-slate-500">{order.vehicle || 'EV Two-Wheeler'}</p>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-slate-50 p-3 rounded-2xl space-y-1.5 text-xs">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Items in Basket ({order.items.length})</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-slate-700">
                          <span>{item.name} <strong className="text-royal">x{item.qty}</strong></span>
                          <span className="font-mono font-bold">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <a
                        href={`https://wa.me/91${order.phone}?text=Hello%20${encodeURIComponent(order.customerName)},%20your%20Dr.%20Jerri%20Clinic%20Order%20${order.orderId}%20is%20${order.paymentStatus === 'verified' ? 'confirmed' : 'being verified'}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-purple-50 text-royal border border-purple-200 font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
                      >
                        <i className="fa-brands fa-whatsapp text-emerald-600"></i>
                        <span>Send WhatsApp Confirmation</span>
                      </a>

                      <a
                        href={`tel:${order.phone}`}
                        className="bg-white hover:bg-purple-50 text-slate-700 border border-slate-200 font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-phone text-xs"></i>
                        <span>Call Customer</span>
                      </a>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: DELIVERY PARTNER ALLOCATION */}
        {/* ========================================================= */}
        {activeTab === 'logistics' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-royal-dark font-display">
                  Delivery Partner Allocation & Live Dispatch
                </h2>
                <p className="text-xs text-slate-500">
                  Assign active delivery riders to patient orders and update live shipment milestones in real-time.
                </p>
              </div>
            </div>

            {/* Riders Fleet Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {deliveryFleet.map((rider) => (
                <div key={rider.id} className="bg-white p-3.5 rounded-2xl border border-purple-100 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-royal-dark">{rider.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">{rider.vehicle}</p>
                  <p className="text-[10px] text-purple-700 font-semibold">{rider.ordersDelivered} Deliveries Completed</p>
                </div>
              ))}
            </div>

            {/* Orders Dispatch & Allocation Cards */}
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-50">
                    <div>
                      <span className="font-mono font-black text-royal text-sm">{order.orderId}</span>
                      <p className="text-xs text-slate-800 font-bold mt-0.5">
                        Deliver to: {order.customerName} • {order.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-600">Assign Rider:</label>
                      <select
                        value={order.riderName || 'Kishore Kumar'}
                        onChange={(e) => handleAssignRider(order.orderId, e.target.value)}
                        className="text-xs font-bold bg-purple-50 border border-purple-200 rounded-xl px-3 py-1.5 text-royal focus:outline-none"
                      >
                        {deliveryFleet.map((r) => (
                          <option key={r.id} value={r.name}>{r.name} ({r.vehicle.split(' ')[0]})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 4-Step Milestone Controller */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Update Live Delivery Milestone (Syncs directly with Patient GPS Tracker)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => handleUpdateStep(order.orderId, 1)}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          order.step === 1
                            ? 'bg-royal text-white font-black ring-2 ring-royal'
                            : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
                        }`}
                      >
                        <i className="fa-solid fa-boxes-packing text-sm block mb-1"></i>
                        <span className="text-xs font-bold block">1. Order Packed</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStep(order.orderId, 2)}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          order.step === 2
                            ? 'bg-royal text-white font-black ring-2 ring-royal'
                            : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
                        }`}
                      >
                        <i className="fa-solid fa-motorcycle text-sm block mb-1"></i>
                        <span className="text-xs font-bold block">2. Dispatched</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStep(order.orderId, 3)}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          order.step === 3
                            ? 'bg-royal text-white font-black ring-2 ring-royal'
                            : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
                        }`}
                      >
                        <i className="fa-solid fa-location-dot text-sm block mb-1"></i>
                        <span className="text-xs font-bold block">3. Out for Delivery</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStep(order.orderId, 4)}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          order.step === 4
                            ? 'bg-emerald-600 text-white font-black ring-2 ring-emerald-600'
                            : 'bg-purple-50 text-slate-700 hover:bg-purple-100'
                        }`}
                      >
                        <i className="fa-solid fa-house-circle-check text-sm block mb-1"></i>
                        <span className="text-xs font-bold block">4. Delivered</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-purple-900 bg-purple-50 p-2.5 rounded-xl flex items-center justify-between">
                    <span>Current Rider: <strong>{order.riderName}</strong> ({order.vehicle})</span>
                    <a href={`tel:${order.riderPhone || '9533551700'}`} className="text-royal font-bold hover:underline">
                      Call Rider
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: USERS / PATIENT DIRECTORY */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-royal-dark font-display">
                Registered Patients & Customer Directory
              </h2>
              <p className="text-xs text-slate-500">
                View all patient registrations, contact details, total orders placed, and order history.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-purple-50 text-royal-dark uppercase text-[10px] font-black border-y border-purple-100">
                  <tr>
                    <th className="py-3 px-3">Patient Name</th>
                    <th className="py-3 px-3">Mobile Contact</th>
                    <th className="py-3 px-3">Locality / Area</th>
                    <th className="py-3 px-3">Orders Placed</th>
                    <th className="py-3 px-3">Total Spend</th>
                    <th className="py-3 px-3">Joined Date</th>
                    <th className="py-3 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-purple-50/40">
                      <td className="py-3.5 px-3 font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-royal flex items-center justify-center font-bold text-[11px]">
                            {user.name.charAt(0)}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-royal">{user.phone}</td>
                      <td className="py-3.5 px-3 text-slate-600">{user.area}</td>
                      <td className="py-3.5 px-3 font-bold text-slate-700">{user.ordersCount || 1} orders</td>
                      <td className="py-3.5 px-3 font-mono font-black text-royal">₹{user.totalSpent || 450}</td>
                      <td className="py-3.5 px-3 text-slate-500 text-[11px]">{user.joinedDate || 'Recently'}</td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/91${user.phone}?text=Hello%20${encodeURIComponent(user.name)},%20greeting%20from%20Dr.%20Jerri%20Poly%20Clinic.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center text-xs transition"
                            title="Chat on WhatsApp"
                          >
                            <i className="fa-brands fa-whatsapp"></i>
                          </a>
                          <a
                            href={`tel:${user.phone}`}
                            className="w-7 h-7 rounded-lg bg-purple-50 text-royal hover:bg-purple-100 flex items-center justify-center text-xs transition"
                            title="Call Patient"
                          >
                            <i className="fa-solid fa-phone text-[10px]"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
