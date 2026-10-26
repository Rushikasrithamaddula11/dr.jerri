import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function LandingPage({ onLoginSuccess }) {
  // 'signin' | 'signup'
  const [activeTab, setActiveTab] = useState('signin');

  // Sign In State
  const [signInData, setSignInData] = useState({ phone: '', password: '' });

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    name: '',
    phone: '',
    area: 'ECIL South Kamala Nagar',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default Seed Patients if no users exist in localStorage yet
  const DEFAULT_PATIENTS = [
    {
      id: 'usr-1',
      name: 'Ramesh Varma',
      phone: '9849012345',
      password: 'patient123',
      area: 'ECIL South Kamala Nagar',
      role: 'user',
      ordersCount: 3,
      totalSpent: 1250,
      joinedDate: 'Oct 2026'
    },
    {
      id: 'usr-2',
      name: 'Pravallika K.',
      phone: '9440123456',
      password: 'patient123',
      area: 'ECIL Cross Roads',
      role: 'user',
      ordersCount: 1,
      totalSpent: 388,
      joinedDate: 'Oct 2026'
    }
  ];

  const getRegisteredUsers = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('drjerri_users') || '[]');
      if (stored.length > 0) return stored;
      localStorage.setItem('drjerri_users', JSON.stringify(DEFAULT_PATIENTS));
      return DEFAULT_PATIENTS;
    } catch {
      return DEFAULT_PATIENTS;
    }
  };

  // Handle Patient Sign In (Strict verification - fails if account does not exist or password wrong)
  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanPhone = signInData.phone.replace(/[^0-9]/g, '').trim();
    const cleanPassword = signInData.password.trim();

    if (!cleanPhone || !cleanPassword) {
      setErrorMsg('Please enter both your Mobile Number and Password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const storedUsers = getRegisteredUsers();
      
      // 1. Check if user with this phone exists
      const existingUser = storedUsers.find(
        (u) => u.phone.replace(/[^0-9]/g, '') === cleanPhone
      );

      if (!existingUser) {
        setIsLoading(false);
        setErrorMsg(`❌ No account found for mobile number ${cleanPhone}. Please click "Create Account" tab to register first.`);
        return;
      }

      // 2. Check if password matches
      if (existingUser.password !== cleanPassword) {
        setIsLoading(false);
        setErrorMsg('❌ Incorrect password. Please enter the correct password for your account.');
        return;
      }

      // 3. Successful authentication
      localStorage.setItem('drjerri_auth', JSON.stringify(existingUser));
      setSuccessMsg(`Welcome back, ${existingUser.name}! Unlocking Dr. Jerri Clinic...`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(existingUser);
      }, 500);
    }, 400);
  };

  // Handle Patient Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanName = signUpData.name.trim();
    const cleanPhone = signUpData.phone.replace(/[^0-9]/g, '').trim();
    const cleanPassword = signUpData.password.trim();

    if (!cleanName || !cleanPhone || !cleanPassword) {
      setErrorMsg('Please fill in your Name, Mobile Number, and Password.');
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const storedUsers = getRegisteredUsers();

      // Check if already registered
      const alreadyExists = storedUsers.find(
        (u) => u.phone.replace(/[^0-9]/g, '') === cleanPhone
      );

      if (alreadyExists) {
        setIsLoading(false);
        setErrorMsg(`An account with mobile number ${cleanPhone} already exists. Please Sign In.`);
        setActiveTab('signin');
        setSignInData((prev) => ({ ...prev, phone: cleanPhone }));
        return;
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        name: cleanName,
        phone: cleanPhone,
        area: signUpData.area,
        password: cleanPassword,
        role: 'user',
        ordersCount: 0,
        totalSpent: 0,
        joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      const updatedUsers = [newUser, ...storedUsers];
      localStorage.setItem('drjerri_users', JSON.stringify(updatedUsers));
      localStorage.setItem('drjerri_auth', JSON.stringify(newUser));

      setSuccessMsg(`Account created successfully! Welcome to Dr. Jerri Clinic, ${newUser.name}.`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(newUser);
      }, 500);
    }, 400);
  };

  // 1-Click Patient Demo Access (explicit button)
  const handleDemoPatientLogin = () => {
    setIsLoading(true);
    const demoPatient = {
      name: 'Ramesh Varma',
      phone: '9849012345',
      area: 'ECIL South Kamala Nagar',
      role: 'user',
      ordersCount: 3,
      totalSpent: 1250,
      joinedDate: 'Oct 2026'
    };
    localStorage.setItem('drjerri_auth', JSON.stringify(demoPatient));
    setSuccessMsg('Instant demo access granted as Ramesh Varma! Loading clinic...');
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(demoPatient);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans selection:bg-royal selection:text-white">
      
      {/* Top Clinic Alert Bar */}
      <div className="bg-royal-dark text-white text-xs py-2 px-4 border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-purple-200">
              ECIL South Kamala Nagar, Hyderabad • 24/7 Pharmacy & OPD Open
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${clinicInfo.phone}`}
              className="text-purple-200 hover:text-white flex items-center gap-1.5 transition font-bold"
            >
              <i className="fa-solid fa-phone text-royal-light"></i>
              <span>Emergency & OPD: {clinicInfo.phone}</span>
            </a>
            <a
              href={`https://wa.me/91${clinicInfo.phone}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-300 hover:text-white flex items-center gap-1 transition font-bold"
            >
              <i className="fa-brands fa-whatsapp text-emerald-400"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Hero & Auth Container */}
      <div className="flex-1 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        
        {/* Subtle Background Lighting Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-royal/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Clinic Introduction & Value Highlights */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-purple-400/30 text-purple-200 text-xs font-bold shadow-sm">
              <i className="fa-solid fa-hospital text-purple-300"></i>
              <span>Dr. Jerri Poly Clinic & Licensed 24/7 Pharmacy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-tight">
              Quality Healthcare, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-white">
                Specialist Care & Medicine Delivery
              </span>
            </h1>

            <p className="text-sm sm:text-base text-purple-200/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Sign in to access our full outpatient clinic services, specialist doctors, certified diagnostic lab tests, wholesale medicine store, and live doorstep delivery tracking.
            </p>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-left max-w-lg mx-auto lg:mx-0">
              
              <div className="bg-white/5 border border-purple-400/20 rounded-2xl p-3.5 backdrop-blur-md space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <h4 className="font-bold text-xs text-white">Specialist Doctors</h4>
                <p className="text-[10px] text-purple-300/80 leading-snug">
                  Gynaecology, Maternity, Prenatal care & General OPD.
                </p>
              </div>

              <div className="bg-white/5 border border-purple-400/20 rounded-2xl p-3.5 backdrop-blur-md space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-pills"></i>
                </div>
                <h4 className="font-bold text-xs text-white">24/7 Medicine Store</h4>
                <p className="text-[10px] text-purple-300/80 leading-snug">
                  Licensed pharmacy stock with doorstep express delivery.
                </p>
              </div>

              <div className="bg-white/5 border border-purple-400/20 rounded-2xl p-3.5 backdrop-blur-md space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <h4 className="font-bold text-xs text-white">Realtime Tracking</h4>
                <p className="text-[10px] text-purple-300/80 leading-snug">
                  Live rider location & instant stage milestones.
                </p>
              </div>

              <div className="bg-white/5 border border-purple-400/20 rounded-2xl p-3.5 backdrop-blur-md space-y-1">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-qrcode"></i>
                </div>
                <h4 className="font-bold text-xs text-white">Realtime UPI Payment</h4>
                <p className="text-[10px] text-purple-300/80 leading-snug">
                  Seamless PhonePe, GPay & UTR bank verification.
                </p>
              </div>

            </div>

            {/* Direct Contact Banner */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-purple-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-shield-check text-emerald-400"></i> Verified Medical Staff
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-map-pin text-royal-light"></i> South Kamala Nagar, ECIL
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-phone text-emerald-400"></i> 9533551700
              </span>
            </div>

          </div>

          {/* Right Column: Tabbed Patient Sign In & Sign Up Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Card Header */}
              <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-800 text-white p-5 sm:p-6 text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-xl mx-auto shadow-md mb-2">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <h3 className="text-xl font-black font-display">Patient Portal Access</h3>
                <p className="text-xs text-purple-200">
                  Sign in or create an account to access the complete clinic
                </p>
              </div>

              {/* Tabs: Sign In vs Sign Up */}
              <div className="flex border-b border-purple-100 bg-purple-50/60 p-1.5 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signin');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'signin'
                      ? 'bg-white text-royal shadow-sm'
                      : 'text-slate-500 hover:text-royal'
                  }`}
                >
                  <i className="fa-regular fa-user"></i>
                  <span>Patient Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signup');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                    activeTab === 'signup'
                      ? 'bg-white text-royal shadow-sm'
                      : 'text-slate-500 hover:text-royal'
                  }`}
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Create Account</span>
                </button>
              </div>

              {/* Form Body */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Error & Success Alerts */}
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold space-y-1.5 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-circle-exclamation shrink-0 text-rose-600"></i>
                      <span>{errorMsg}</span>
                    </div>
                    {errorMsg.includes('Create Account') && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('signup');
                          setSignUpData((prev) => ({ ...prev, phone: signInData.phone }));
                          setErrorMsg('');
                        }}
                        className="text-[11px] text-royal font-black hover:underline block text-left pt-0.5"
                      >
                        → Click here to Register Now with this number
                      </button>
                    )}
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                    <i className="fa-solid fa-circle-check shrink-0 text-emerald-600"></i>
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* SIGN IN TAB */}
                {activeTab === 'signin' && (
                  <form onSubmit={handleSignIn} className="space-y-3.5 text-xs text-left">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Mobile Number (WhatsApp) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-bold">+91</span>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9849012345"
                          value={signInData.phone}
                          onChange={(e) => setSignInData({ ...signInData, phone: e.target.value })}
                          className="w-full pl-12 pr-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs font-mono"
                      />
                    </div>

                    <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100 text-[11px] text-purple-900 space-y-0.5">
                      <span className="font-bold block text-royal">Demo Registered Patient:</span>
                      <div className="flex justify-between font-mono text-slate-600">
                        <span>Mobile: <strong className="text-royal">9849012345</strong></span>
                        <span>Pass: <strong className="text-royal">patient123</strong></span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-royal/30 flex items-center justify-center gap-2 mt-2"
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-arrow-right-to-bracket text-xs"></i>
                          <span>Sign In & Enter Clinic</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* SIGN UP TAB */}
                {activeTab === 'signup' && (
                  <form onSubmit={handleSignUp} className="space-y-3 text-xs text-left">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Varma"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-bold">+91</span>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9849012345"
                          value={signUpData.phone}
                          onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                          className="w-full pl-12 pr-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Locality / Area
                      </label>
                      <select
                        value={signUpData.area}
                        onChange={(e) => setSignUpData({ ...signUpData, area: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs"
                      >
                        <option value="ECIL South Kamala Nagar">ECIL South Kamala Nagar</option>
                        <option value="A.S. Rao Nagar">A.S. Rao Nagar</option>
                        <option value="Kamala Nagar Main">Kamala Nagar Main</option>
                        <option value="Moula Ali">Moula Ali</option>
                        <option value="Sainikpuri">Sainikpuri</option>
                        <option value="Kapra">Kapra</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Create Password *
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Choose a password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-royal/30 flex items-center justify-center gap-2 mt-2"
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-user-check text-xs"></i>
                          <span>Register & Unlock Access</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* 1-Click Patient Demo Access */}
                <div className="pt-3 border-t border-purple-100 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block text-center tracking-wider">
                    Instant Demo Login (No Typing Needed)
                  </span>
                  <button
                    type="button"
                    onClick={handleDemoPatientLogin}
                    disabled={isLoading}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold py-2.5 px-3 rounded-xl border border-emerald-200 text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
                  >
                    <i className="fa-solid fa-bolt text-emerald-600"></i>
                    <span>⚡ 1-Click Instant Demo Login (Ramesh Varma)</span>
                  </button>
                </div>

              </div>

              {/* Card Footer */}
              <div className="bg-slate-50 border-t border-purple-100 p-3 text-center text-[11px] text-slate-500">
                <span>Need immediate medical assistance? </span>
                <a href={`tel:${clinicInfo.phone}`} className="font-bold text-royal underline">
                  Call {clinicInfo.phone}
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Simple Bottom Footer */}
      <footer className="bg-slate-950 border-t border-purple-900/40 text-slate-400 text-xs py-4 px-4 text-center">
        <p>© 2026 Dr. Jerri Poly Clinic & Pharmacy • Plot 42, South Kamala Nagar, ECIL, Hyderabad • Phone: {clinicInfo.phone}</p>
      </footer>

    </div>
  );
}
