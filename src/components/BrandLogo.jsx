import React from 'react';

/**
 * Official Dr. Jerri Logo & Emblem Component
 * Extracted and color-balanced from brand identity:
 * - Brand Deep Violet: #2e1a55
 * - Medical Royal Blue: #0153a2
 * - Vitality Emerald Green: #00a651
 * - Crisp White: #ffffff
 */
export default function BrandLogo({
  variant = 'light', // 'light' | 'dark' | 'banner' | 'emblem'
  className = '',
  showSubtext = true,
  onClick
}) {
  if (variant === 'banner') {
    return (
      <img
        src="/drjerri-logo-banner.png"
        alt="DR. JERRI SPECIALITY CLINIC AND DIAGNOSTICS"
        className={`h-auto max-w-full object-contain select-none rounded-xl ${className}`}
        onClick={onClick}
      />
    );
  }

  if (variant === 'emblem') {
    return (
      <img
        src="/drjerri-emblem.png"
        alt="Dr. Jerri Emblem"
        className={`h-10 w-10 object-contain select-none ${className}`}
        onClick={onClick}
      />
    );
  }

  if (variant === 'dark') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <img
          src="/drjerri-emblem.png"
          alt="Dr. Jerri Emblem"
          className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0 drop-shadow-sm"
        />
        <div className="flex flex-col text-white">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight font-display text-white">
              Dr. JERRI
            </span>
          </div>
          {showSubtext && (
            <p className="text-[10px] sm:text-[11px] font-extrabold text-purple-200 tracking-wide mt-0.5 uppercase">
              Speciality Clinic and Diagnostics
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: 'light' variant (ideal for white navbar)
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <img
        src="/drjerri-emblem.png"
        alt="Dr. Jerri Emblem"
        className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0 drop-shadow-xs"
      />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className="text-xl sm:text-2xl font-black tracking-tight font-display text-[#2e1a55]">
            Dr. JERRI
          </span>
        </div>
        {showSubtext && (
          <p className="text-[10px] sm:text-[11px] font-black text-[#2e1a55] tracking-wide mt-0.5 uppercase">
            Speciality Clinic and Diagnostics
          </p>
        )}
      </div>
    </div>
  );
}
