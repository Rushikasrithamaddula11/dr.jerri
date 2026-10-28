import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  // Tabs: 'patient-login' | 'patient-signup' | 'admin-login'
  const [tab, setTab] = useState('patient-login');

  // Form states
  const [patientLoginData, setPatientLoginData] = useState({ phone: '', password: '' });
  const [patientSignupData, setPatientSignupData] = useState({ name: '', phone: '', area: 'ECIL South Kamala Nagar', password: '' });
  const [adminLoginData, setAdminLoginData] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handlePatientLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!patientLoginData.phone.trim() || !patientLoginData.password.trim()) {
      setErrorMsg('Please enter your Mobile Number and Password.');
      return;
    }

    // Check registered users or authenticate
    const storedUsers = JSON.parse(localStorage.getItem('drjerri_users') || '[]');
    const cleanPhone = patientLoginData.phone.replace(/[^0-9]/g, '').trim();
    const existingUser = storedUsers.find(
      (u) => u.phone.replace(/[^0-9]/g, '') === cleanPhone
    );

    if (!existingUser) {
      setErrorMsg(`❌ No account found for mobile number ${cleanPhone}. Please switch to Sign Up first.`);
      return;
    }

    if (existingUser.password !== patientLoginData.password.trim()) {
      setErrorMsg('❌ Incorrect password. Please try again.');
      return;
    }

    localStorage.setItem('drjerri_auth', JSON.stringify(existingUser));
    setSuccessMsg('Login successful! Welcome back.');
    setTimeout(() => {
      onLoginSuccess(existingUser);
      onClose();
    }, 500);
  };

  const handlePatientSignup = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!patientSignupData.name.trim() || !patientSignupData.phone.trim() || !patientSignupData.password.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: patientSignupData.name.trim(),
      phone: patientSignupData.phone.trim(),
      area: patientSignupData.area,
      password: patientSignupData.password.trim(),
      role: 'user',
      ordersCount: 0,
      totalSpent: 0,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    // Save to registered users list
    const storedUsers = JSON.parse(localStorage.getItem('drjerri_users') || '[]');
    storedUsers.unshift(newUser);
    localStorage.setItem('drjerri_users', JSON.stringify(storedUsers));
    localStorage.setItem('drjerri_auth', JSON.stringify(newUser));

    setSuccessMsg('Account created successfully! Welcome to Dr. Jerri Clinic.');
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 700);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (adminLoginData.username.trim().toLowerCase() === 'admin' && adminLoginData.password.trim() === 'drjerri@2026') {
      const adminUser = {
        name: 'Dr. Jerri Admin Desk',
        username: 'admin',
        role: 'admin',
        phone: '9533551700'
      };
      localStorage.setItem('drjerri_auth', JSON.stringify(adminUser));
      setSuccessMsg('Admin access verified. Redirecting to Admin Portal...');
      setTimeout(() => {
        onLoginSuccess(adminUser);
        onClose();
      }, 600);
    } else {
      setErrorMsg('Invalid Admin credentials. Try username: admin and password: drjerri@2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-purple-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-lg shrink-0">
              {tab === 'admin-login' ? <i className="fa-solid fa-shield-halved"></i> : <i className="fa-solid fa-user-circle"></i>}
            </div>
            <div>
              <h3 className="font-bold text-base font-display">
                {tab === 'patient-login' && 'Patient Sign In'}
                {tab === 'patient-signup' && 'Create Patient Account'}
                {tab === 'admin-login' && 'Admin Portal Access'}
              </h3>
              <p className="text-[11px] text-purple-200">
                Dr. Jerri Poly Clinic, Diagnostics & Pharmacy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 bg-purple-50 p-1.5 border-b border-purple-100 text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => { setTab('patient-login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-xl transition ${tab === 'patient-login' ? 'bg-white text-royal shadow-xs' : 'text-slate-600 hover:text-royal'}`}
          >
            Patient Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('patient-signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-xl transition ${tab === 'patient-signup' ? 'bg-white text-royal shadow-xs' : 'text-slate-600 hover:text-royal'}`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => { setTab('admin-login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1 ${tab === 'admin-login' ? 'bg-royal text-white shadow-xs' : 'text-slate-600 hover:text-royal'}`}
          >
            <i className="fa-solid fa-lock text-[10px]"></i>
            <span>Admin</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-bold flex items-center gap-2">
              <i className="fa-solid fa-circle-check"></i>
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: PATIENT SIGN IN */}
          {tab === 'patient-login' && (
            <form onSubmit={handlePatientLogin} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <i className="fa-solid fa-phone absolute left-3 top-3 text-slate-400"></i>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={patientLoginData.phone}
                    onChange={(e) => setPatientLoginData({ ...patientLoginData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-3 top-3 text-slate-400"></i>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={patientLoginData.password}
                    onChange={(e) => setPatientLoginData({ ...patientLoginData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-royal hover:bg-royal-dark text-white font-bold py-3 rounded-xl transition shadow-md shadow-royal/20"
              >
                Sign In to Account
              </button>
            </form>
          )}

          {/* TAB 2: PATIENT SIGN UP */}
          {tab === 'patient-signup' && (
            <form onSubmit={handlePatientSignup} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={patientSignupData.name}
                  onChange={(e) => setPatientSignupData({ ...patientSignupData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={patientSignupData.phone}
                  onChange={(e) => setPatientSignupData({ ...patientSignupData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Locality / Area *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Kamala Nagar, ECIL"
                  value={patientSignupData.area}
                  onChange={(e) => setPatientSignupData({ ...patientSignupData, area: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Create Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Create a password"
                  value={patientSignupData.password}
                  onChange={(e) => setPatientSignupData({ ...patientSignupData, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-royal hover:bg-royal-dark text-white font-bold py-3 rounded-xl transition shadow-md shadow-royal/20 mt-1"
              >
                Create Free Account
              </button>
            </form>
          )}

          {/* TAB 3: ADMIN ACCESS */}
          {tab === 'admin-login' && (
            <form onSubmit={handleAdminLogin} className="space-y-3.5 text-xs">
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-purple-950">
                <p className="font-bold">Admin Portal Authorization</p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Access to add medicines, verify payments, allocate delivery partners, and view registered users.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Admin Username</label>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={adminLoginData.username}
                  onChange={(e) => setAdminLoginData({ ...adminLoginData, username: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Admin Password</label>
                <input
                  type="password"
                  required
                  placeholder="drjerri@2026"
                  value={adminLoginData.password}
                  onChange={(e) => setAdminLoginData({ ...adminLoginData, password: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-royal hover:bg-royal-dark text-white font-black py-3 rounded-xl transition shadow-md shadow-royal/20 flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-lock text-xs"></i>
                <span>Sign In as Admin</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
