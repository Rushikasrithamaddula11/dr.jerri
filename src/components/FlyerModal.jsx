import React from 'react';
import { clinicInfo } from '../data/clinicData';

export default function FlyerModal({ isOpen, onClose, flyerData }) {
  if (!isOpen || !flyerData) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 px-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="truncate pr-2">
            <h4 className="font-bold text-xs truncate text-teal-300 font-display">
              {flyerData.title}
            </h4>
            <p className="text-[10px] text-slate-400">Official Doctor Poster</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-xs transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Image Preview Container */}
        <div className="max-h-[75vh] overflow-y-auto p-2 bg-black flex items-center justify-center">
          <img
            src={flyerData.image}
            alt={flyerData.title}
            className="w-full h-auto object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Footer */}
        <div className="p-3 px-4 bg-slate-900 flex items-center justify-between text-xs border-t border-slate-800">
          <span className="text-[11px] text-slate-400">{clinicInfo.name} @ ECIL</span>
          <a
            href={flyerData.image}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-[11px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5 transition"
          >
            <i className="fa-solid fa-expand"></i>
            <span>Open High-Res</span>
          </a>
        </div>
      </div>
    </div>
  );
}
