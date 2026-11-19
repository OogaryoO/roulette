"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { PrizeWheel } from "@/components/prize-wheel";
import { SpinButton } from "@/components/spin-button";
import { BRAND, PRIZES, pickWeightedIndex, type Prize } from "@/config/prizes";

export default function Home() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  // Will drive the confetti + winning modal in the next step.
  const [winner, setWinner] = useState<Prize | null>(null);

  const handleSpin = useCallback(() => {
    if (mustSpin) return;
    setWinner(null);
    setPrizeNumber(pickWeightedIndex(PRIZES));
    setMustSpin(true);
  }, [mustSpin]);

  const handleStop = useCallback(() => {
    setMustSpin(false);
    setWinner(PRIZES[prizeNumber]);
  }, [prizeNumber]);

  return (
    <main className="relative grid h-dvh w-dvw grid-rows-[auto_1fr] overflow-hidden landscape:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] landscape:grid-rows-1">
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[15%] -top-[20%] size-[60vmax] rounded-full bg-[#6D5BFF]/25 blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] size-[55vmax] rounded-full bg-[#3DD6C6]/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      {/* Branding panel */}
      <motion.section
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center gap-5 px-8 pt-10 text-center landscape:px-[6vw] landscape:pt-0 landscape:text-left"
      >
        <span className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.35em] text-white/70 backdrop-blur-md landscape:mx-0">
          <span className="size-1.5 rounded-full bg-[#F2C35E] shadow-[0_0_10px_#F2C35E]" />
          {BRAND.eyebrow}
        </span>
        <h1 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-[clamp(2.75rem,7vmin,6rem)] font-bold leading-[1.05] tracking-tight text-transparent">
          {BRAND.title}
        </h1>
        <p className="text-[clamp(1rem,2.2vmin,1.35rem)] text-white/65">{BRAND.subtitle}</p>

        <div className="hidden pt-6 landscape:block">
          <SpinButton onClick={handleSpin} disabled={mustSpin} />
        </div>

        <p className="hidden pt-4 text-sm text-white/40 landscape:block">{BRAND.footnote}</p>
      </motion.section>

      {/* Wheel */}
      <section className="flex min-h-0 flex-col items-center justify-center gap-[4vmin] px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.15 }}
        >
          <PrizeWheel mustSpin={mustSpin} prizeNumber={prizeNumber} onStopSpinning={handleStop} />
        </motion.div>

        <div className="landscape:hidden">
          <SpinButton onClick={handleSpin} disabled={mustSpin} />
        </div>

        {/* Temporary result readout — replaced by the modal in the next step */}
        <p aria-live="polite" className="h-6 text-sm tracking-wide text-white/60">
          {winner ? `結果：${winner.label}` : ""}
        </p>
      </section>
    </main>
  );
}
