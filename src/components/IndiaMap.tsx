'use client';

import React from 'react';
import {
  INDIA_OUTLINE,
  INDIA_STATES,
  INDIA_VIEWBOX,
  REGION_CENTERS,
  type IndianRegion,
} from './indiaMapData';

export type { IndianRegion };

export interface IndiaMapProps {
  highlightRegion?: string | IndianRegion;
  className?: string;
}

const REGION_LABELS: Record<IndianRegion, string> = {
  North: 'North',
  South: 'South',
  East: 'East',
  West: 'West',
  Central: 'Central',
  Northeast: 'Northeast',
  'Pan-India': 'All India',
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
    text.includes('travancore') ||
    text.includes('colachel')
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

export default function IndiaMap({ highlightRegion = 'Pan-India', className = 'w-20 h-24' }: IndiaMapProps) {
  const region = normalizeToRegion(highlightRegion);
  const { cx, cy } = REGION_CENTERS[region];
  const isActive = (stateRegion: string) => region === 'Pan-India' || stateRegion === region;

  const dimStates = INDIA_STATES.filter((s) => !isActive(s.region));
  const hotStates = INDIA_STATES.filter((s) => isActive(s.region));

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox={INDIA_VIEWBOX}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full min-h-0 drop-shadow-md"
        role="img"
        aria-label={`Map of India highlighting ${REGION_LABELS[region]}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Land silhouette */}
        <path d={INDIA_OUTLINE} className="fill-stone-950" />

        {/* States outside the highlighted region */}
        <g
          className="fill-stone-900 stroke-amber-500/30"
          strokeWidth="1"
          strokeLinejoin="round"
        >
          {dimStates.map((s) => (
            <path key={s.id} d={s.d}>
              <title>{s.name}</title>
            </path>
          ))}
        </g>

        {/* Highlighted region (drawn last so its borders sit on top) */}
        <g
          className="fill-amber-500/30 stroke-amber-400/70 transition-colors duration-300"
          strokeWidth="1.2"
          strokeLinejoin="round"
        >
          {hotStates.map((s) => (
            <path key={s.id} d={s.d}>
              <title>{s.name}</title>
            </path>
          ))}
        </g>

        {/* Country border, glowing */}
        <path
          d={INDIA_OUTLINE}
          className="stroke-amber-500/90"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Pulsing target reticle */}
        <g>
          <circle
            cx={cx}
            cy={cy}
            r="34"
            className="fill-amber-400/25 animate-ping"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <circle
            cx={cx}
            cy={cy}
            r="20"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeDasharray="9 6"
          />
          <circle
            cx={cx}
            cy={cy}
            r="9"
            className="fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]"
          />
        </g>
      </svg>

      {/* Region tag */}
      <span className="text-[9px] font-mono tracking-tight font-medium text-amber-300/80 bg-stone-950/90 px-1.5 py-0.5 rounded border border-stone-800 pointer-events-none mt-0.5">
        {REGION_LABELS[region]}
      </span>
    </div>
  );
}
