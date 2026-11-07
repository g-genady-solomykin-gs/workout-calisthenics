"use client";

import { Bookmark, CirclePlay, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./video-library.module.scss";

const videos = [
  { title: "Как делать чистые подтягивания", category: "Техника", duration: "03:42", tone: "orange" },
  { title: "Выход силой: первые шаги", category: "Обучение", duration: "08:15", tone: "lime" },
  { title: "Разминка для плеч и запястий", category: "Разминка", duration: "05:20", tone: "blue" },
  { title: "Стойка на руках у стены", category: "Статика", duration: "06:44", tone: "pink" },
];

export function VideoLibrary() {
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [watching, setWatching] = useState<string | null>(null);
  const visibleVideos = useMemo(() => videos.filter((video) => video.title.toLowerCase().includes(query.toLowerCase()) && (activeCategory === "Все" || video.category === activeCategory)), [query, activeCategory]);

  return <div className={styles.page}>
    <section className={styles.hero}><span>БИБЛИОТЕКА ТЕХНИКИ</span><h2>Учись двигаться<br /><em>уверенно</em></h2><p>Короткие и понятные разборы упражнений от тренера.</p></section>
    <div className={styles.toolbar}><label><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти упражнение или технику" /></label><button onClick={() => setFilterOpen((value) => !value)}><SlidersHorizontal size={18} /> Фильтры</button></div>
    {filterOpen && <div className={styles.filters}>{["Все", "Техника", "Обучение", "Разминка", "Статика"].map((category) => <button key={category} className={activeCategory === category ? styles.activeFilter : ""} onClick={() => { setActiveCategory(category); setFilterOpen(false); }}>{category}</button>)}</div>}
    <section><div className={styles.heading}><div><h2>Тебе подойдёт</h2><p>{visibleVideos.length ? "Выбирай и сохраняй на потом" : "Ничего не нашли — попробуй другой запрос"}</p></div><button onClick={() => { setQuery(""); setActiveCategory("Все"); }}>Все видео</button></div><div className={styles.grid}>{visibleVideos.map((video, index) => <article className={styles.video} key={video.title}><div className={`${styles.preview} ${styles[video.tone]}`}><span className={styles.figure} /><button onClick={() => setWatching(video.title)} aria-label={`Смотреть ${video.title}`}><CirclePlay size={35} fill="currentColor" /></button><small>{video.duration}</small><i>0{index + 1}</i></div><div className={styles.info}><span>{video.category}</span><h3>{video.title}</h3><button className={saved.includes(video.title) ? styles.saved : ""} onClick={() => setSaved((items) => items.includes(video.title) ? items.filter((title) => title !== video.title) : [...items, video.title])}><Bookmark size={17} fill={saved.includes(video.title) ? "currentColor" : "none"} />{saved.includes(video.title) ? "Сохранено" : "Сохранить"}</button></div></article>)}</div></section>
    {watching && <div className={styles.dialog} role="dialog" aria-modal="true"><div><button onClick={() => setWatching(null)} aria-label="Закрыть"><X /></button><CirclePlay size={44} /><h3>{watching}</h3><p>Место для твоего ролика. После добавления ссылки плеер откроется прямо здесь.</p></div></div>}
  </div>;
}
