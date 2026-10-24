export const HEADLINE = "WELCOME ITZFIZZ";

export type Stat = {
  value: number;
  label: string;
  tone: "lime" | "sky" | "ink" | "orange";
};

export const STATS: Stat[] = [
  { value: 58, label: "Increase in pick-up point use", tone: "lime" },
  { value: 23, label: "Decrease in customer phone calls", tone: "sky" },
  { value: 27, label: "Increase in repeat orders", tone: "ink" },
  { value: 40, label: "Faster average delivery time", tone: "orange" },
];
