"use client";

import { Check, ChevronRight, Clock3, Dumbbell, Plus, X, Zap } from "lucide-react";
import { useState } from "react";
import styles from "./workout-plans.module.scss";

const plans = [
  { title: "База + сила верха", meta: "45–55 мин · Средний", progress: 36, tag: "Сегодня", color: "lime" },
  { title: "Ноги и взрывная сила", meta: "40 мин · Средний", progress: 0, tag: "Пятница", color: "orange" },
  { title: "Статика: front lever", meta: "35 мин · Продвинутый", progress: 0, tag: "Воскресенье", color: "blue" },
];

export function WorkoutPlans() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [warmupOpen, setWarmupOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [customPlans, setCustomPlans] = useState(0);
  const allPlans = customPlans ? [...plans, { title: "Своя тренировка", meta: "30 мин · Свободный формат", progress: 0, tag: "Черновик", color: "lime" }] : plans;

  return <div className={styles.page}>
    <section className={styles.hero}><div><span><Zap size={15} /> ТРЕНИРОВОЧНЫЙ ПЛАН</span><h2>Тренируйся<br />с <em>понятной целью</em></h2><p>Твой график на неделю собран под текущий уровень и цели.</p></div><button onClick={() => { setCustomPlans(1); setSelectedPlan(plans.length); }}><Plus size={19} /> Новая тренировка</button></section>
    <section className={styles.section}><div className={styles.heading}><div><h2>Ближайшие тренировки</h2><p>Выбери занятие — всё уже готово</p></div><button onClick={() => setCalendarOpen(true)}>Мой календарь <ChevronRight size={18} /></button></div><div className={styles.cards}>{allPlans.map((plan, index) => <article className={`${styles.card} ${selectedPlan === index ? styles.selected : ""}`} key={plan.title}><div className={`${styles.cardIcon} ${styles[plan.color]}`}><Dumbbell size={24} /></div><div className={styles.cardCopy}><div><span>{plan.tag}</span><h3>{plan.title}</h3><p><Clock3 size={14} /> {plan.meta}</p></div><div className={styles.cardProgress}><div><i style={{ width: `${plan.progress}%` }} /></div><b>{plan.progress ? `${plan.progress}% готово` : "Не начато"}</b></div></div><button className={styles.openButton} onClick={() => setSelectedPlan(index)} aria-label={`Открыть ${plan.title}`}>{selectedPlan === index ? <Check size={20} /> : <ChevronRight size={21} />}</button></article>)}</div></section>
    <section className={styles.tip}><span className={styles.tipIcon}>✦</span><div><strong>Совет тренера</strong><p>Перед силовой тренировкой сделай 5 минут разминки плеч и запястий.</p></div><button onClick={() => setWarmupOpen(true)}>Открыть разминку</button></section>
    {warmupOpen && <div className={styles.modal} role="dialog" aria-modal="true"><div><button onClick={() => setWarmupOpen(false)} aria-label="Закрыть"><X /></button><span>РАЗМИНКА · 05:00</span><h3>Плечи и запястья</h3><ol><li>Круги запястьями — 60 сек</li><li>Вращения плечами — 90 сек</li><li>Планка с переносом веса — 90 сек</li></ol><button className={styles.startWarmup} onClick={() => setWarmupOpen(false)}>Готов к разминке</button></div></div>}
    {calendarOpen && <div className={styles.modal} role="dialog" aria-modal="true"><div><button onClick={() => setCalendarOpen(false)} aria-label="Закрыть"><X /></button><span>НОЯБРЬ 2026</span><h3>Твой график</h3><ul className={styles.calendarList}><li><b>Ср, 12</b><span>База + сила верха</span></li><li><b>Пт, 14</b><span>Ноги и взрывная сила</span></li><li><b>Вс, 16</b><span>Статика: front lever</span></li></ul><button className={styles.startWarmup} onClick={() => setCalendarOpen(false)}>Понятно</button></div></div>}
  </div>;
}
