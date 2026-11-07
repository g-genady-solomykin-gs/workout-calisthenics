"use client";

import { Activity, CalendarDays, Check, ChevronRight, CirclePlay, Flame, MoreHorizontal, Play, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useWorkoutSession } from "@/features/workout-session/model/use-workout-session";
import { exercises, week } from "@/shared/config/workout-data";
import { TrainingCarousel } from "@/widgets/training-carousel/ui/training-carousel";
import styles from "./workout-dashboard.module.scss";

export function WorkoutDashboard() {
  const { completedSets, completeSet, formattedTime, isRunning, toggleSession } = useWorkoutSession();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [watching, setWatching] = useState(false);
  const [notice, setNotice] = useState("");
  const [statsOpen, setStatsOpen] = useState(false);
  const visibleExercises = showAll ? exercises : exercises.slice(0, 3);
  const markSet = () => { completeSet(); setNotice("Подход отмечен — отличный темп!"); window.setTimeout(() => setNotice(""), 2200); };

  return (
    <div className={styles.content}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.planLabel}><Sparkles size={15} /> ТВОЙ ПЛАН НА СЕГОДНЯ</div>
          <h2>База + сила<br /><em>верха тела</em></h2>
          <p>45–55 мин · Уровень: средний</p>
          <button className={`${styles.startButton} ${isRunning ? styles.startButtonActive : ""}`} onClick={toggleSession}>
            {isRunning ? <X size={19} /> : <Play size={19} fill="currentColor" />}
            {isRunning ? `Тренировка идёт · ${formattedTime}` : "Начать тренировку"}
          </button>
        </div>
        <div className={styles.heroArtwork} aria-hidden="true">
          <div className={styles.orbit} /><div className={styles.orbitSmall} /><div className={styles.bars}><span /><span /><span /></div>
          <div className={styles.athlete}><i /><b /><em /><strong /></div><span className={styles.heroBadge}><Flame size={17} /> 5 дней</span>
        </div>
      </section>

      <section className={styles.weekSection}>
        <div className={styles.sectionHeading}><div><h2>Твоя неделя</h2><p>Держи ритм — ты на правильном пути</p></div><button onClick={() => setCalendarOpen((value) => !value)}>Календарь <CalendarDays size={18} /></button></div>
        {calendarOpen && <div className={styles.calendarPanel}><CalendarDays size={18} /><span>Ноябрь 2026</span><b>Следующая тренировка: пятница, 14 ноября</b><button onClick={() => setCalendarOpen(false)}>Готово</button></div>}
        <div className={styles.weekCard}>
          {week.map((item) => <div key={item.day} className={`${styles.day} ${item.active ? styles.dayActive : ""}`}><span>{item.day}</span><b>{item.date}</b>{item.done ? <i className={styles.check}>✓</i> : <i className={styles.emptyDot} />}</div>)}
          <div className={styles.streak}><Flame size={22} /><div><strong>5 дней подряд</strong><span>Твой лучший результат</span></div></div>
        </div>
      </section>

      <div className={styles.dashboardGrid}>
        <section>
          <div className={styles.sectionHeading}><div><h2>Сегодня в плане</h2><p>{completedSets ? `Выполнено подходов: ${completedSets}` : "3 упражнения · 11 подходов"}</p></div><button className={styles.linkButton} onClick={() => setShowAll((value) => !value)}>{showAll ? "Свернуть" : "Смотреть всё"} <ChevronRight size={18} /></button></div>
          <div className={styles.exerciseList}>
            {visibleExercises.map((exercise, index) => <article className={styles.exercise} key={exercise.name}>
              <div className={`${styles.exerciseVisual} ${styles[exercise.tone]}`}><span>{index + 1}</span><div className={styles.figure} /></div>
              <div className={styles.exerciseInfo}><h3>{exercise.name}</h3><p>{exercise.detail}</p><div className={styles.progressTrack}><i style={{ width: `${exercise.progress}%` }} /></div></div>
              <button className={styles.playExercise} onClick={markSet} aria-label={`Отметить подход: ${exercise.name}`}><CirclePlay size={25} /></button>
            </article>)}
          </div>
        </section>
        <aside className={styles.sideColumn}>
          <section className={styles.statCard}><div className={styles.statTitle}><span>Ноябрь</span><button onClick={() => setStatsOpen((value) => !value)} aria-label="Показать подробности статистики" aria-expanded={statsOpen}><MoreHorizontal size={19} /></button></div><div className={styles.ringWrap}><div className={styles.ring}><div><strong>8</strong><span>из 12</span></div></div><div><h3>Отличный темп!</h3><p>Ещё 4 тренировки<br />до цели месяца</p></div></div>{statsOpen && <div className={styles.statDetails}><span>Объём недели</span><b>11 240 кг</b><span>Средняя тренировка</span><b>48 минут</b></div>}<div className={styles.statRule} /><div className={styles.statBottom}><span><Activity size={17} /> 67%</span><p>выполнено</p></div></section>
          <section className={styles.videoCard}><div className={styles.videoArt}><span className={styles.videoPerson} /><button onClick={() => setWatching(true)} aria-label="Смотреть видео"><Play size={20} fill="currentColor" /></button><small>03:42</small></div><div className={styles.videoInfo}><span>ТЕХНИКА</span><h3>Как делать чистые подтягивания</h3><p>Разбор от тренера · 3 мин</p></div></section>
        </aside>
      </div>
      <TrainingCarousel />
      {notice && <div className={styles.toast}><Check size={16} />{notice}</div>}
      {watching && <div className={styles.videoDialog} role="dialog" aria-modal="true"><div><button onClick={() => setWatching(false)} aria-label="Закрыть"><X size={20} /></button><CirclePlay size={42} /><h3>Как делать чистые подтягивания</h3><p>Видео откроется здесь после добавления ссылки на твой ролик.</p></div></div>}
    </div>
  );
}
