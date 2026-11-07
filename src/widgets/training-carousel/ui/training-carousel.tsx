"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./training-carousel.module.scss";

const slides = [
  { key: "pull", tone: "lime", number: "01" },
  { key: "core", tone: "orange", number: "02" },
  { key: "mobility", tone: "blue", number: "03" },
] as const;

export function TrainingCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Carousel");
  const [playing, setPlaying] = useState<string | null>(null);

  return <section className={styles.section}>
    <div className={styles.heading}><div><span>{t("eyebrow")}</span><h2>{t("title")}</h2></div><div className={styles.controls}><button onClick={() => emblaApi?.scrollPrev()} aria-label={t("previous")}><ArrowLeft size={18} /></button><button onClick={() => emblaApi?.scrollNext()} aria-label={t("next")}><ArrowRight size={18} /></button></div></div>
    <div className={styles.viewport} ref={emblaRef}><div className={styles.container}>{slides.map((slide, index) => <motion.article className={`${styles.card} ${styles[slide.tone]}`} key={slide.key} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.07, duration: 0.35 }}><div className={styles.cardArt}><span>{slide.number}</span><i /><button onClick={() => setPlaying(slide.key)} aria-label={t(`items.${slide.key}`)}><Play size={18} fill="currentColor" /></button></div><div className={styles.cardInfo}><h3>{t(`items.${slide.key}`)}</h3><p>{t(`items.${slide.key}Meta`)}</p></div></motion.article>)}</div></div>
    {playing && <div className={styles.dialog} role="dialog" aria-modal="true"><div><button onClick={() => setPlaying(null)} aria-label="Закрыть"><X size={19} /></button><Play size={38} fill="currentColor" /><h3>{t(`items.${playing}`)}</h3><p>Здесь появится видео после добавления ссылки в библиотеку.</p></div></div>}
  </section>;
}
