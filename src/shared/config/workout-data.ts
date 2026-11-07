export const week = [
  { day: "Пн", date: "10", active: false, done: true },
  { day: "Вт", date: "11", active: false, done: true },
  { day: "Ср", date: "12", active: true, done: false },
  { day: "Чт", date: "13", active: false, done: false },
  { day: "Пт", date: "14", active: false, done: false },
  { day: "Сб", date: "15", active: false, done: false },
  { day: "Вс", date: "16", active: false, done: false },
] as const;

export const exercises = [
  { name: "Подтягивания", detail: "4 подхода × 8–10", tone: "lime", progress: 32 },
  { name: "Отжимания на брусьях", detail: "4 подхода × 10–12", tone: "blue", progress: 0 },
  { name: "Горизонт на низкой перекладине", detail: "3 подхода × 12 сек", tone: "coral", progress: 0 },
  { name: "Подъёмы коленей в висе", detail: "3 подхода × 12–15", tone: "lime", progress: 0 },
  { name: "Планка на предплечьях", detail: "3 подхода × 45 сек", tone: "blue", progress: 0 },
] as const;

export type WorkoutTone = (typeof exercises)[number]["tone"];
