import React, { useState, useEffect } from 'react';
import { clinicInfo } from '../data/clinicData';

export default function AuthPage({
  initialMode = 'signin',
  onLoginSuccess,
  onNavigate,
  returnPage = 'store'
}) {
  // 'signin' | 'signup'
  const [mode, setMode] = useState(initialMode);

  // Form states
  const [signInData, setSignInData] = useState({ phone: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    name: '',
    phone: '',
    area: 'ECIL South Kamala Nagar',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
    setSuccessMsg('');
  }, [initialMode]);

  // Handle Patient Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signInData.phone.trim() || !signInData.password.trim()) {
      setErrorMsg('Please enter both your Mobile Number and Password.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('drjerri_users') || '[]');
    const found = storedUsers.find(
      (u) => u.phone === signInData.phone.trim() && u.password === signInData.password.trim()
    );

    const user = found || {
      name: 'Ramesh Varma',
      phone: signInData.phone.trim(),
      area: 'ECIL South Kamala Nagar',
      role: 'user',
      ordersCount: 2,
      totalSpent: 890,
      joinedDate: 'Registered Patient'
    };

    localStorage.setItem('drjerri_auth', JSON.stringify(user));
    setSuccessMsg('Sign in successful! Loading your medicine store...');
    setTimeout(() => {
      onLoginSuccess(user);
      onNavigate(returnPage || 'store');
    }, 600);
  };

  // Handle Patient Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signUpData.name.trim() || !signUpData.phone.trim() || !signUpData.password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: signUpData.name.trim(),
      phone: signUpData.phone.trim(),
      area: signUpData.area,
      password: signUpData.password.trim(),
      role: 'user',
      ordersCount: 0,
      totalSpent: 0,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const storedUsers = JSON.parse(localStorage.getItem('drjerri_users') || '[]');
    storedUsers.unshift(newUser);
    localStorage.setItem('drjerri_users', JSON.stringify(storedUsers));
    localStorage.setItem('drjerri_auth', JSON.stringify(newUser));

    setSuccessMsg('Account created successfully! Welcome to Dr. Jerri Clinic.');
    setTimeout(() => {
      onLoginSuccess(newUser);
      onNavigate(returnPage || 'store');
    }, 700);
  };

  // 1-Click Patient Demo Login
  const handleDemoPatientLogin = () => {
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
    setSuccessMsg('Logged in as Patient: Ramesh Varma. Redirecting...');
    setTimeout(() => {
      onLoginSuccess(demoPatient);
      onNavigate(returnPage || 'store');
    }, 500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-purple-200 overflow-hidden">
        
        {/* Top Purple Banner */}
        <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-800 text-white p-6 sm:p-8 text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl mx-auto shadow-sm">
            <i className="fa-solid fa-notes-medical"></i>
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            {mode === 'signin' ? 'Patient Sign In' : 'Create Patient Account'}
          </h1>
          <p className="text-xs text-purple-100 max-w-xs mx-auto leading-relaxed">
            Sign in with your mobile number to access the online medicine store, track prescriptions, and make secure payments.
          </p>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="grid grid-cols-2 bg-purple-50 p-1.5 border-b border-purple-100 text-xs font-bold text-center">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2.5 rounded-xl transition ${
              mode === 'signin'
                ? 'bg-white text-royal-dark font-black shadow-xs'
                : 'text-slate-600 hover:text-royal'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2.5 rounded-xl transition ${
              mode === 'signup'
                ? 'bg-white text-royal-dark font-black shadow-xs'
                : 'text-slate-600 hover:text-royal'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-4">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-emerald-600"></i>
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Patient Mobile Number *
                </label>
                <div className="relative">
                  <i className="fa-solid fa-phone absolute left-3.5 top-3 text-slate-400"></i>
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit mobile number"
                    value={signInData.phone}
                    onChange={(e) => setSignInData({ ...signInData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <i className="fa-solid fa-lock absolute left-3.5 top-3 text-slate-400"></i>
                  <input
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 rounded-xl transition shadow-md shadow-royal/30 text-xs sm:text-sm"
              >
                Sign In to Medicine Store
              </button>

              {/* 1-Click Patient Demo Shortcut */}
              <div className="pt-2 border-t border-purple-100 text-center">
                <button
                  type="button"
                  onClick={handleDemoPatientLogin}
                  className="w-full bg-purple-50 hover:bg-purple-100 active:scale-95 text-royal font-bold py-2.5 px-3 rounded-xl border border-purple-200 transition text-[11px] flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-bolt text-royal"></i>
                  <span>⚡ 1-Click Patient Demo Access (Ramesh Varma)</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setErrorMsg(''); }}
                    className="font-bold text-royal hover:underline"
                  >
                    Register free now
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={signUpData.phone}
                  onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Locality / Area in ECIL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Kamala Nagar, ECIL"
                  value={signUpData.area}
                  onChange={(e) => setSignUpData({ ...signUpData, area: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create a secure password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-royal bg-purple-50/30 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-black py-3 rounded-xl transition shadow-md shadow-royal/30 text-xs sm:text-sm mt-2"
              >
                Create Account & Access Store
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setErrorMsg(''); }}
                    className="font-bold text-royal hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          )}

        </div>

        {/* Footer info strip */}
        <div className="bg-purple-50/60 p-4 border-t border-purple-100 text-center text-[11px] text-slate-500">
          <span>Dr. Jerri Poly Clinic, Diagnostics & Pharmacy • ECIL Desk</span>
        </div>

      </div>
    </div>
  );
}
