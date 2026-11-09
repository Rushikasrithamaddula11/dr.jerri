import React, { useState } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function LandingPage({ onLoginSuccess, onNavigate }) {
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
  const [suggestRegister, setSuggestRegister] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getRegisteredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('drjerri_users') || '[]');
    } catch {
      return [];
    }
  };

  // Handle Patient Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSuggestRegister(false);

    const cleanPhone = signInData.phone.replace(/[^0-9]/g, '').trim();
    const cleanPassword = signInData.password.trim();

    if (!cleanPhone) {
      setErrorMsg('Please enter your 10-digit Mobile Number.');
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const storedUsers = getRegisteredUsers();

      // Check if user exists
      const existingUser = storedUsers.find(
        (u) => u.phone && u.phone.replace(/[^0-9]/g, '') === cleanPhone
      );

      if (!existingUser) {
        setIsLoading(false);
        setErrorMsg(`No account found for mobile ${cleanPhone}.`);
        setSuggestRegister(true);
        return;
      }

      // Check password if set
      if (cleanPassword && existingUser.password && existingUser.password !== cleanPassword) {
        setIsLoading(false);
        setErrorMsg('Incorrect password. Please verify your password or use quick sign up.');
        return;
      }

      // Successful login
      localStorage.setItem('drjerri_auth', JSON.stringify(existingUser));
      setSuccessMsg(`Welcome back, ${existingUser.name || 'Patient'}! Redirecting to Home...`);

      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(existingUser);
      }, 400);
    }, 350);
  };

  // Quick Auto-Register when phone not found in Sign In
  const handleQuickRegisterFromPhone = () => {
    const cleanPhone = signInData.phone.replace(/[^0-9]/g, '').trim();
    setSignUpData((prev) => ({
      ...prev,
      phone: cleanPhone,
      name: prev.name || 'Patient ' + cleanPhone.slice(-4)
    }));
    setActiveTab('signup');
    setErrorMsg('');
    setSuggestRegister(false);
  };

  // Handle Patient Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanName = signUpData.name.trim();
    const cleanPhone = signUpData.phone.replace(/[^0-9]/g, '').trim();
    const cleanPassword = signUpData.password.trim() || 'patient123';

    if (!cleanName || !cleanPhone) {
      setErrorMsg('Please enter your Full Name and 10-digit Mobile Number.');
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
      let existingUser = storedUsers.find(
        (u) => u.phone && u.phone.replace(/[^0-9]/g, '') === cleanPhone
      );

      if (existingUser) {
        // Log them straight in
        localStorage.setItem('drjerri_auth', JSON.stringify(existingUser));
        setSuccessMsg(`Welcome back, ${existingUser.name}! Opening clinic...`);
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess(existingUser);
        }, 400);
        return;
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        name: cleanName,
        phone: cleanPhone,
        area: signUpData.area || 'ECIL South Kamala Nagar',
        password: cleanPassword,
        role: 'user',
        ordersCount: 0,
        totalSpent: 0,
        joinedDate: new Date().toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };

      const updatedUsers = [newUser, ...storedUsers];
      localStorage.setItem('drjerri_users', JSON.stringify(updatedUsers));
      localStorage.setItem('drjerri_auth', JSON.stringify(newUser));

      setSuccessMsg(`Account created successfully! Welcome to Dr. Jerri Clinic, ${newUser.name}.`);

      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(newUser);
      }, 400);
    }, 350);
  };

  // Instant Guest Entry
  const handleGuestEntry = () => {
    const guestUser = {
      id: 'guest-' + Date.now(),
      name: 'Guest Patient',
      phone: '',
      area: 'ECIL South Kamala Nagar',
      role: 'guest'
    };
    localStorage.setItem('drjerri_auth', JSON.stringify(guestUser));
    onLoginSuccess(guestUser);
  };

  return (
    <div className="min-h-screen bg-[#150a29] flex flex-col font-sans selection:bg-[#2e1a55] selection:text-white">
      {/* Top Clinic Alert Bar */}
      <div className="bg-[#2e1a55] text-white text-xs py-2 px-4 border-b border-purple-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00a651] animate-ping"></span>
            <span className="font-semibold text-purple-200">
              ECIL South Kamala Nagar, Hyderabad • 24/7 Pharmacy & OPD Open
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-purple-200">
            <span>
              <i className="fa-solid fa-truck-fast text-[#00a651] mr-1"></i> Fast Medicine Delivery
            </span>
            <a
              href={`tel:${clinicInfo.phone}`}
              className="text-white hover:text-purple-200 font-bold flex items-center gap-1"
            >
              <i className="fa-solid fa-phone text-xs text-[#0153a2]"></i>
              <span>{clinicInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Hero & Login Section */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#1f103b] via-[#150a29] to-[#0e061c]">
        {/* Ambient Gradient Background Glow in Brand Colors */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#0153a2]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#00a651]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
          {/* Left Column: Clinic Introduction & Value Highlights */}
          <div className="lg:col-span-7 text-white space-y-5">
            {/* Real Official Fixed Brand Banner */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-purple-800/40 max-w-lg">
              <img
                src="/drjerri-logo-banner.png"
                alt="Dr. Jerri Speciality Clinic & Diagnostics"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2e1a55]/60 border border-purple-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-200 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00a651]"></span>
              <span>Trusted Family Healthcare & 24/7 Pharmacy in ECIL</span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Comprehensive multi-specialty care, senior specialist consultations, automated diagnostic lab tests, and 24/7 online medicine delivery with instant doorstep dispatch.
            </p>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-[#00a651]/20 text-[#00a651] flex items-center justify-center text-base mb-2">
                  <i className="fa-solid fa-pills"></i>
                </div>
                <h4 className="text-xs font-bold text-white">Online Pharmacy</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  100% genuine medicines & instant local delivery to your home.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-[#0153a2]/20 text-blue-400 flex items-center justify-center text-base mb-2">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <h4 className="text-xs font-bold text-white">Top Specialists</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  General Medicine, Pediatrics, Gynecology, ENT, Ortho & Diabetology.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-sm">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-base mb-2">
                  <i className="fa-solid fa-flask-vial"></i>
                </div>
                <h4 className="text-xs font-bold text-white">Lab Diagnostics</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Complete blood tests, sample collection & instant digital reports.
                </p>
              </div>
            </div>

            {/* Direct Browse as Guest Option */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleGuestEntry}
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl border border-white/10 transition"
              >
                <span>Browse Clinic & Store Directly</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
              <span className="text-[11px] text-slate-400">
                Or sign in to unlock your medical history and auto-filled checkout.
              </span>
            </div>
          </div>

          {/* Right Column: Clean Login & Registration Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
              {/* Card Header with Tabs */}
              <div className="bg-gradient-to-r from-[#1f103b] via-[#2e1a55] to-[#45277f] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/drjerri-emblem.png"
                      alt="Dr. Jerri Emblem"
                      className="w-9 h-9 object-contain shrink-0"
                    />
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                        Patient Portal Login
                      </h3>
                      <p className="text-[11px] text-purple-200">
                        Sign in to order medicines & book consultations
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2 mt-4 bg-black/20 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signin');
                      setErrorMsg('');
                      setSuggestRegister(false);
                    }}
                    className={`py-1.5 text-xs font-bold rounded-lg transition ${
                      activeTab === 'signin'
                        ? 'bg-white text-royal-dark shadow-sm'
                        : 'text-purple-200 hover:text-white'
                    }`}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket mr-1.5"></i> Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signup');
                      setErrorMsg('');
                      setSuggestRegister(false);
                    }}
                    className={`py-1.5 text-xs font-bold rounded-lg transition ${
                      activeTab === 'signup'
                        ? 'bg-white text-royal-dark shadow-sm'
                        : 'text-purple-200 hover:text-white'
                    }`}
                  >
                    <i className="fa-solid fa-user-plus mr-1.5"></i> Create Account
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Alert Messages */}
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 font-bold">
                      <i className="fa-solid fa-circle-exclamation shrink-0"></i>
                      <span>{errorMsg}</span>
                    </div>
                    {suggestRegister && (
                      <button
                        type="button"
                        onClick={handleQuickRegisterFromPhone}
                        className="mt-1 text-left font-black text-royal hover:underline flex items-center gap-1"
                      >
                        <i className="fa-solid fa-user-plus text-[10px]"></i>
                        <span>Click here to register this number now ➔</span>
                      </button>
                    )}
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-bold">
                    <i className="fa-solid fa-circle-check text-emerald-600 shrink-0"></i>
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* TAB 1: SIGN IN FORM */}
                {activeTab === 'signin' && (
                  <form onSubmit={handleSignIn} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-slate-400 font-bold">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          placeholder="e.g. 9849012345"
                          value={signInData.phone}
                          onChange={(e) =>
                            setSignInData({ ...signInData, phone: e.target.value.replace(/[^0-9]/g, '') })
                          }
                          className="w-full pl-12 pr-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold text-slate-700">
                          Password <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400">Default: patient123</span>
                      </div>
                      <input
                        type="password"
                        placeholder="Enter your account password"
                        value={signInData.password}
                        onChange={(e) =>
                          setSignInData({ ...signInData, password: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#0153a2] hover:bg-[#013e79] active:scale-95 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-[#0153a2]/30 flex items-center justify-center gap-2 mt-2"
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                          <span>Verifying & Opening Clinic...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-arrow-right-to-bracket text-xs"></i>
                          <span>Sign In & Open Clinic</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* TAB 2: SIGN UP / REGISTRATION FORM */}
                {activeTab === 'signup' && (
                  <form onSubmit={handleSignUp} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
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
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-bold">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          placeholder="e.g. 9849012345"
                          value={signUpData.phone}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, phone: e.target.value.replace(/[^0-9]/g, '') })
                          }
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
                        Create Password (Optional)
                      </label>
                      <input
                        type="password"
                        placeholder="Choose a password or leave blank"
                        value={signUpData.password}
                        onChange={(e) =>
                          setSignUpData({ ...signUpData, password: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/20 text-xs font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#00a651] hover:bg-[#00823f] active:scale-95 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-md shadow-[#00a651]/30 flex items-center justify-center gap-2 mt-2"
                    >
                      {isLoading ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-user-check text-xs"></i>
                          <span>Register & Unlock Clinic Access</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Guest / Direct Entry Button */}
                <div className="pt-2 border-t border-purple-100 text-center">
                  <button
                    type="button"
                    onClick={handleGuestEntry}
                    className="w-full py-2 px-3 text-xs font-extrabold text-slate-600 hover:text-royal hover:bg-purple-50 rounded-xl transition border border-dashed border-purple-200 flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-bolt text-amber-500"></i>
                    <span>Quick Direct Entry (No Login Required) ➔</span>
                  </button>
                </div>
              </div>

              {/* Card Footer: Staff Link & Contact */}
              <div className="bg-slate-50 border-t border-purple-100 p-3 px-5 flex items-center justify-between text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('admin')}
                  className="font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1"
                >
                  <i className="fa-solid fa-user-shield text-[10px]"></i>
                  <span>Staff / Doctor Login</span>
                </button>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="font-bold text-royal hover:underline"
                >
                  Call {clinicInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-purple-900/40 text-slate-400 text-xs py-4 px-4 text-center">
        <p>
          © 2026 Dr. Jerri Poly Clinic & Pharmacy • Plot 42, South Kamala Nagar, ECIL, Hyderabad • Phone: {clinicInfo.phone}
        </p>
      </footer>
    </div>
  );
}
