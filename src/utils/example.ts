import type { BiasExample } from "@/types/example";

export function formatRange({ minScore, maxScore }: BiasExample): string {
  if (maxScore >= 1) return `${minScore.toFixed(2)} or higher`;
  if (minScore <= 0) return `${maxScore.toFixed(2)} or lower`;
  return `${minScore.toFixed(2)} to ${maxScore.toFixed(2)}`;
}

export function rangeTone(minScore: number): string {
  if (minScore >= 0.6) return "marketing-gradient-flat";
  if (minScore >= 0.25) return "bg-violet-300";
  return "bg-emerald-400";
}
