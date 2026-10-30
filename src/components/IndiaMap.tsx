'use client';

import React from 'react';

export type IndianRegion = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast' | 'Pan-India';

export interface IndiaMapProps {
  highlightRegion?: string | IndianRegion;
  className?: string;
}

// Coordinate focal points mapped on the SVG viewport (0 0 100 120)
const REGION_COORDINATES: Record<IndianRegion, { cx: number; cy: number; label: string }> = {
  North: { cx: 48, cy: 30, label: 'North' },
  South: { cx: 48, cy: 92, label: 'South' },
  East: { cx: 72, cy: 56, label: 'East' },
  West: { cx: 28, cy: 62, label: 'West' },
  Central: { cx: 48, cy: 58, label: 'Central' },
  Northeast: { cx: 86, cy: 42, label: 'Northeast' },
  'Pan-India': { cx: 48, cy: 58, label: 'All India' },
};

function normalizeToRegion(input?: string): IndianRegion {
  if (!input) return 'Pan-India';
  const text = input.toLowerCase();

  // Northeast
  if (
    text.includes('northeast') ||
    text.includes('assam') ||
    text.includes('guwahati') ||
    text.includes('manipur') ||
    text.includes('meghalaya') ||
    text.includes('arunachal') ||
    text.includes('nagaland') ||
    text.includes('mizoram') ||
    text.includes('tripura') ||
    text.includes('yandabo')
  ) {
    return 'Northeast';
  }

  // South
  if (
    text.includes('south') ||
    text.includes('tamil nadu') ||
    text.includes('kerala') ||
    text.includes('karnataka') ||
    text.includes('andhra') ||
    text.includes('telangana') ||
    text.includes('thanjavur') ||
    text.includes('chennai') ||
    text.includes('kottayam') ||
    text.includes('kanyakumari') ||
    text.includes('hampi') ||
    text.includes('sriharikota') ||
    text.includes('arakkonam') ||
    text.includes('travancore')
  ) {
    return 'South';
  }

  // East
  if (
    text.includes('east') ||
    text.includes('bengal') ||
    text.includes('kolkata') ||
    text.includes('palashi') ||
    text.includes('bihar') ||
    text.includes('odisha') ||
    text.includes('kalinga') ||
    text.includes('jharkhand')
  ) {
    return 'East';
  }

  // West
  if (
    text.includes('west') ||
    text.includes('maharashtra') ||
    text.includes('mumbai') ||
    text.includes('gujarat') ||
    text.includes('dandi') ||
    text.includes('bhuj') ||
    text.includes('raigad') ||
    text.includes('pune') ||
    text.includes('thane') ||
    text.includes('goa')
  ) {
    return 'West';
  }

  // North
  if (
    text.includes('north') ||
    text.includes('delhi') ||
    text.includes('punjab') ||
    text.includes('amritsar') ||
    text.includes('haryana') ||
    text.includes('panipat') ||
    text.includes('meerut') ||
    text.includes('uttar pradesh') ||
    text.includes('kashmir') ||
    text.includes('shimla') ||
    text.includes('himachal') ||
    text.includes('uttarakhand')
  ) {
    return 'North';
  }

  // Central
  if (
    text.includes('central') ||
    text.includes('madhya pradesh') ||
    text.includes('chhattisgarh') ||
    text.includes('narmada') ||
    text.includes('vidisha')
  ) {
    return 'Central';
  }

  return 'Pan-India';
}

export default function IndiaMap({ highlightRegion = 'Pan-India', className = 'w-24 h-28' }: IndiaMapProps) {
  const matchedRegion = normalizeToRegion(highlightRegion);
  const target = REGION_COORDINATES[matchedRegion];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Stylized Silhouette of the Indian Subcontinent */}
        <path
          d={`
            M 48,10 
            C 53,13 58,18 55,24 
            C 52,28 62,32 64,36 
            C 66,39 74,38 78,36 
            C 84,34 94,37 92,44 
            C 90,49 84,50 82,56 
            C 80,60 74,62 70,60 
            C 68,64 68,70 64,74 
            C 60,78 56,86 54,94 
            C 52,99 48,108 47,110 
            C 45,107 43,99 40,94 
            C 36,87 34,78 30,73 
            C 25,69 20,67 22,60 
            C 23,54 30,52 32,46 
            C 33,40 38,36 40,32 
            C 42,27 41,20 44,14 
            Z
          `}
          className="fill-stone-900/90 stroke-amber-500/40"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Regional Indicator Ring */}
        {target && (
          <g>
            {/* Soft Ambient Beacon */}
            <circle
              cx={target.cx}
              cy={target.cy}
              r="10"
              className="fill-amber-400/20 animate-ping"
            />
            {/* Reticle Halo */}
            <circle
              cx={target.cx}
              cy={target.cy}
              r="6.5"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1"
              strokeDasharray="2 2"
              className="animate-[spin_8s_linear_infinite]"
            />
            {/* Center Focal Point */}
            <circle
              cx={target.cx}
              cy={target.cy}
              r="3.2"
              className="fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
            />
          </g>
        )}
      </svg>

      {/* Lightweight Region Tag */}
      <span className="absolute -bottom-1 text-[9px] font-mono tracking-tight font-medium text-amber-300/80 bg-stone-950/80 px-1.5 py-0.2 rounded border border-stone-800 pointer-events-none">
        {target.label}
      </span>
    </div>
  );
}