/**
 * 獎項設定 — Prize configuration
 * ------------------------------------------------------------------
 * Edit this file to change wheel text, colors and odds.
 *
 *  option           Text drawn on the wheel slice (keep it short).
 *  label            Full prize name shown in the winning modal.
 *  style            Slice colors. Any CSS color string works.
 *  weight           Relative odds (default 1). A weight of 3 is
 *                   3× as likely as a weight of 1. Set 0 to disable.
 */

export type Prize = {
  option: string;
  label: string;
  style: { backgroundColor: string; textColor: string };
  weight?: number;
};

export const PRIZES: Prize[] = [
  { option: "頭獎", label: "頭獎・精美大禮", style: { backgroundColor: "#6D5BFF", textColor: "#FFFFFF" }, weight: 1 },
  { option: "再接再厲", label: "再接再厲", style: { backgroundColor: "#1B1D3A", textColor: "#C9CCF5" }, weight: 4 },
  { option: "二獎", label: "二獎・品牌周邊", style: { backgroundColor: "#F2B84B", textColor: "#1B1D3A" }, weight: 2 },
  { option: "折價券", label: "現場折價券", style: { backgroundColor: "#2A2D55", textColor: "#FFFFFF" }, weight: 5 },
  { option: "三獎", label: "三獎・限定貼紙", style: { backgroundColor: "#3DD6C6", textColor: "#0E1030" }, weight: 3 },
  { option: "再接再厲", label: "再接再厲", style: { backgroundColor: "#1B1D3A", textColor: "#C9CCF5" }, weight: 4 },
  { option: "神秘禮", label: "神秘小禮物", style: { backgroundColor: "#FF6B9A", textColor: "#FFFFFF" }, weight: 2 },
  { option: "折價券", label: "現場折價券", style: { backgroundColor: "#2A2D55", textColor: "#FFFFFF" }, weight: 5 },
];

/** Branding copy for the side panel. */
export const BRAND = {
  eyebrow: "LUCKY DRAW",
  title: "幸運轉盤",
  subtitle: "轉動命運之輪，好禮等你帶回家",
  footnote: "每人限玩一次・獎品數量有限，送完為止",
};

/** Picks a prize index using each prize's weight. */
export function pickWeightedIndex(prizes: Prize[] = PRIZES): number {
  const weights = prizes.map((p) => Math.max(0, p.weight ?? 1));
  const total = weights.reduce((a, b) => a + b, 0);
  if (total <= 0) return Math.floor(Math.random() * prizes.length);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r < 0) return i;
  }
  return weights.length - 1;
}
