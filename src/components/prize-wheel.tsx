"use client";

import dynamic from "next/dynamic";
import { PRIZES } from "@/config/prizes";

// react-custom-roulette touches `window`/canvas at import time → client only.
const Wheel = dynamic(
  () => import("react-custom-roulette").then((m) => m.Wheel),
  { ssr: false, loading: () => <div className="wheel-skeleton" /> },
);

type Props = {
  mustSpin: boolean;
  prizeNumber: number;
  onStopSpinning: () => void;
};

/**
 * The library's built-in pointer sits at the top-right: the winning slice centre stops 47° clockwise
 * from 12 o'clock (±35% slice jitter). We rotate the
 * wheel host by -47° so the winning slice lands at 12 o'clock, hide the stock
 * pointer, and draw our own above it.
 */
export function PrizeWheel({ mustSpin, prizeNumber, onStopSpinning }: Props) {
  return (
    <div className="relative grid place-items-center">
      {/* Soft halo */}
      <div className="pointer-events-none absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(109,91,255,0.35),transparent_65%)] blur-2xl" />

      {/* Outer ring */}
      <div className="relative rounded-full p-[clamp(10px,1.6vmin,18px)] bg-gradient-to-b from-white/25 to-white/5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/15">
        <div className="wheel-host -rotate-[47deg]">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={PRIZES}
            onStopSpinning={onStopSpinning}
            spinDuration={0.9}
            outerBorderColor="rgba(255,255,255,0.12)"
            outerBorderWidth={2}
            innerRadius={14}
            innerBorderColor="rgba(255,255,255,0.2)"
            innerBorderWidth={2}
            radiusLineColor="rgba(255,255,255,0.14)"
            radiusLineWidth={2}
            fontFamily="helvetica" /* web-safe: avoids an online Google Fonts fetch */
            fontSize={22}
            fontWeight={700}
            textDistance={62}
            pointerProps={{ style: { display: "none" } }}
          />
        </div>

        {/* Center hub */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 grid size-[16%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-b from-[#2b2e5c] to-[#12142e] shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/20">
          <div className="size-[34%] rounded-full bg-gradient-to-b from-[#F2D27A] to-[#E0A93B] shadow-[0_0_18px_rgba(242,184,75,0.7)]" />
        </div>
      </div>

      {/* Pointer (12 o'clock) */}
      <svg
        aria-hidden
        viewBox="0 0 48 60"
        className="absolute left-1/2 top-0 z-10 w-[clamp(34px,5vmin,52px)] -translate-x-1/2 -translate-y-[38%] drop-shadow-[0_6px_10px_rgba(0,0,0,0.55)]"
      >
        <defs>
          <linearGradient id="ptr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE7A8" />
            <stop offset="100%" stopColor="#E0A93B" />
          </linearGradient>
        </defs>
        <path d="M24 58 L4 18 A22 22 0 1 1 44 18 Z" fill="url(#ptr)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <circle cx="24" cy="20" r="7" fill="#1B1D3A" opacity="0.85" />
      </svg>
    </div>
  );
}
