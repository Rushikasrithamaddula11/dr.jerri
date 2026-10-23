import React from 'react';
import { reviews } from '../data/clinicData';

export default function ReviewsSection() {
  return (
    <section id="reviews-section" className="py-8 md:py-14 bg-white border-b border-royal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-200">
              <i className="fa-solid fa-star text-amber-400"></i> Patient Feedback
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-royal-dark font-display tracking-tight">
              Trusted by 350+ Families in ECIL
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Read real patient reviews from South Kamala Nagar, Moula Ali, AS Rao Nagar & Secunderabad.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-2xl p-3 px-4 shrink-0">
            <div className="text-3xl font-black text-royal font-display">4.9</div>
            <div>
              <div className="flex text-amber-400 text-xs gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>
              <p className="text-[11px] text-royal font-bold">Verified Google Reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-royal-subtle rounded-3xl p-5 border border-purple-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex text-amber-400 text-xs gap-0.5">
                    {[...Array(r.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <span className="text-[10px] text-purple-700 font-bold">{r.date}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-purple-200 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-royal text-white font-bold flex items-center justify-center text-xs">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-royal-dark">{r.name}</h4>
                  <p className="text-[10px] text-purple-700 font-medium">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
