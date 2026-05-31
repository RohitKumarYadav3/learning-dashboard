import type { ActivityCell } from "@/types";

export function generateActivityData(): ActivityCell[] {
  const cells: ActivityCell[] = [];
  const now = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Weighted random: more likely to have activity on recent days
    const recencyBonus = Math.max(0, (364 - i) / 364);
    const rand = Math.random() + recencyBonus * 0.3;

    let count = 0;
    let level: ActivityCell["level"] = 0;

    if (rand > 0.55) {
      count = Math.floor(Math.random() * 12) + 1;
      level = count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
    }

    cells.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return cells;
}
