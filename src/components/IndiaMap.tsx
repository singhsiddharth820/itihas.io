'use client';

import React from 'react';

export type IndianRegion = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Pan-India';

interface IndiaMapProps {
  highlightRegion: IndianRegion;
  className?: string;
}

const REGION_COORDINATES: Record<
  IndianRegion,
  { cx: number; cy: number; r: number; label: string }
> = {
  North: { cx: 290, cy: 220, r: 100, label: 'Northern Plains & Hills' },
  West: { cx: 200, cy: 440, r: 90, label: 'Western Maratha / Gujarat' },
  Central: { cx: 330, cy: 430, r: 85, label: 'Central Vindhyas / Malwa' },
  East: { cx: 520, cy: 420, r: 110, label: 'Eastern Kalinga / Bengal' },
  South: { cx: 305, cy: 640, r: 105, label: 'Deccan & Southern Peninsula' },
  'Pan-India': { cx: 330, cy: 450, r: 230, label: 'Subcontinental / Pan-India' },
};

const ACCURATE_INDIA_OUTLINE = 
  "M 261 65 L 248 73 L 228 75 L 211 89 L 214 97 L 227 101 L 238 116 " +
  "L 239 124 L 228 133 L 233 169 L 257 188 L 266 189 L 267 194 L 254 202 " +
  "L 251 220 L 235 233 L 237 243 L 224 247 L 220 264 L 202 276 L 189 295 " +
  "L 165 301 L 152 292 L 135 312 L 135 326 L 147 333 L 145 345 L 157 356 " +
  "L 162 369 L 162 385 L 146 383 L 133 388 L 113 382 L 109 390 L 98 392 " +
  "L 95 402 L 116 423 L 137 427 L 130 435 L 115 429 L 111 437 L 145 476 " +
  "L 163 480 L 191 463 L 197 464 L 200 485 L 195 514 L 207 566 L 206 592 " +
  "L 233 648 L 242 695 L 265 728 L 278 784 L 290 799 L 289 805 L 307 811 " +
  "L 324 798 L 325 785 L 352 778 L 346 772 L 355 754 L 367 753 L 369 733 " +
  "L 364 715 L 380 673 L 373 632 L 379 614 L 403 607 L 405 599 L 420 595 " +
  "L 432 574 L 469 550 L 498 510 L 523 502 L 536 486 L 536 465 L 549 459 " +
  "L 555 464 L 556 459 L 584 457 L 584 433 L 572 403 L 574 389 L 559 383 " +
  "L 559 377 L 575 367 L 575 361 L 557 348 L 560 339 L 592 347 L 597 363 " +
  "L 648 363 L 649 373 L 630 388 L 626 403 L 631 414 L 642 420 L 647 402 " +
  "L 654 401 L 663 438 L 673 440 L 680 391 L 699 391 L 698 382 L 709 360 " +
  "L 706 348 L 715 333 L 714 319 L 738 298 L 757 302 L 751 293 L 760 274 " +
  "L 741 266 L 738 254 L 727 242 L 710 253 L 688 247 L 677 267 L 664 267 " +
  "L 662 279 L 623 298 L 639 309 L 637 316 L 616 322 L 605 318 L 597 324 " +
  "L 573 320 L 570 293 L 565 288 L 550 297 L 552 331 L 541 335 L 479 323 " +
  "L 475 313 L 438 312 L 408 301 L 394 287 L 375 280 L 383 255 L 393 247 " +
  "L 392 239 L 378 234 L 373 225 L 359 222 L 345 204 L 346 193 L 364 183 " +
  "L 360 169 L 351 162 L 352 153 L 369 137 L 376 107 L 359 97 L 319 107 " +
  "L 318 101 L 304 99 L 275 68 Z";

export default function IndiaMap({ highlightRegion, className = 'w-24 h-28' }: IndiaMapProps) {
  const currentZone = REGION_COORDINATES[highlightRegion] || REGION_COORDINATES['Pan-India'];

  return (
    <div className={`relative flex flex-col items-center justify-between py-1 ${className}`}>
      <div className="w-full h-20 flex items-center justify-center">
        <svg
          viewBox="0 0 830 860"
          className="w-full h-full object-contain overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="region-glow"
              cx={`${(currentZone.cx / 830) * 100}%`}
              cy={`${(currentZone.cy / 860) * 100}%`}
              r={`${(currentZone.r / 830) * 100}%`}
            >
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#d97706" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>

            <mask id="accurate-india-mask">
              <path d={ACCURATE_INDIA_OUTLINE} fill="#ffffff" />
            </mask>
          </defs>

          {/* Outline */}
          <path
            d={ACCURATE_INDIA_OUTLINE}
            className="fill-stone-900 stroke-amber-500/70 stroke-[3.5] transition-all duration-300"
          />

          {/* Regional Highlight */}
          <rect
            x="0"
            y="0"
            width="830"
            height="860"
            fill="url(#region-glow)"
            mask="url(#accurate-india-mask)"
          />

          {/* Marker Reticle */}
          <g className="transition-all duration-500 ease-out">
            <circle
              cx={currentZone.cx}
              cy={currentZone.cy}
              r="22"
              className="fill-amber-400/25 stroke-amber-400 stroke-[2.5] animate-ping opacity-75 origin-center"
              style={{ transformOrigin: `${currentZone.cx}px ${currentZone.cy}px` }}
            />
            <circle
              cx={currentZone.cx}
              cy={currentZone.cy}
              r="10"
              className="fill-amber-400 stroke-stone-950 stroke-[2.5] shadow-md"
            />
            <line
              x1={currentZone.cx - 22}
              y1={currentZone.cy}
              x2={currentZone.cx - 13}
              y2={currentZone.cy}
              className="stroke-amber-300 stroke-[2]"
            />
            <line
              x1={currentZone.cx + 13}
              y1={currentZone.cy}
              x2={currentZone.cx + 22}
              y2={currentZone.cy}
              className="stroke-amber-300 stroke-[2]"
            />
            <line
              x1={currentZone.cx}
              y1={currentZone.cy - 22}
              x2={currentZone.cx}
              y2={currentZone.cy - 13}
              className="stroke-amber-300 stroke-[2]"
            />
            <line
              x1={currentZone.cx}
              y1={currentZone.cy + 13}
              x2={currentZone.cx}
              y2={currentZone.cy + 22}
              className="stroke-amber-300 stroke-[2]"
            />
          </g>
        </svg>
      </div>

      {/* Region Label - Always visible with proper line height */}
      <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-amber-400 leading-tight block text-center pt-1">
        {highlightRegion}
      </span>
    </div>
  );
}
