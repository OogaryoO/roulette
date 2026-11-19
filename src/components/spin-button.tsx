"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function SpinButton({ onClick, disabled, className }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.04, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.94, y: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={cn(
        "group relative isolate overflow-hidden rounded-full px-14 py-5 text-xl font-semibold tracking-[0.3em] text-[#1B1D3A]",
        "bg-gradient-to-b from-[#FFE7A8] via-[#F2C35E] to-[#E0A93B]",
        "shadow-[0_18px_40px_-12px_rgba(242,184,75,0.75),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-3px_0_rgba(0,0,0,0.15)]",
        "outline-none focus-visible:ring-4 focus-visible:ring-[#F2C35E]/50",
        "disabled:cursor-not-allowed disabled:saturate-50 disabled:opacity-60",
        "touch-manipulation select-none",
        className,
      )}
    >
      {/* Sheen sweep */}
      {!disabled && (
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/50 blur-md animate-[sheen_2.8s_ease-in-out_infinite]" />
      )}
      <span className="relative">{disabled ? "SPINNING…" : "SPIN"}</span>
    </motion.button>
  );
}
