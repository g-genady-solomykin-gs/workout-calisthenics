"use client";

import { Award, ChevronRight, Mail, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/shared/model/profile-provider";
import { PhoneInput } from "@/shared/ui/phone-input/phone-input";
import styles from "./profile.module.scss";

export function Profile() {
  const { profile, saveProfile } = useProfile();
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [isSaved, setIsSaved] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  function handleSaveProfile() {
    saveProfile({ name: name.trim() || "Роман", email, phone, birthDate: profile?.birthDate ?? "" });
    setIsSaved(true);
    window.setTimeout(() => setIsSaved(false), 2400);
  }

  return <div className={styles.page}>
    <section className={styles.profileHeader}><div className={styles.avatar}>{name.trim().charAt(0).toUpperCase() || "W"}</div><div><span>ТВОЙ ПРОФИЛЬ</span><h2>{name || "Твой профиль"}</h2><p>Воркаут · Уровень 12</p></div><div className={styles.level}><Award size={20} /><div><strong>1 840 XP</strong><span>до 13 уровня — 160 XP</span></div></div></section>
    <div className={styles.grid}><section className={styles.card}><div className={styles.cardHeading}><div><h3>Личные данные</h3><p>Используются только для твоего аккаунта</p></div><ShieldCheck size={21} /></div><div className={styles.fields}><label><span>Имя</span><input value={name} onChange={(event) => setName(event.target.value)} /></label><PhoneInput value={phone} onValueChange={setPhone} /><label><span>Email</span><div className={styles.withIcon}><Mail size={17} /><input type="email" inputMode="email" enterKeyHint="done" value={email} onChange={(event) => { setEmail(event.target.value); if (event.target.validity.valid && event.target.value.length > 4) event.target.blur(); }} placeholder="roman@example.com" /></div></label><label><span>Дата рождения</span><input type="date" value={profile?.birthDate ?? ""} readOnly /></label></div><button className={styles.saveButton} onClick={handleSaveProfile}><Save size={18} />{isSaved ? "Сохранено" : "Сохранить изменения"}</button></section><aside className={styles.card}><h3>Твои достижения</h3><div className={styles.achievement}><span>🔥</span><div><strong>В ритме</strong><p>5 дней тренировок подряд</p></div></div><div className={styles.achievement}><span>⚡</span><div><strong>Первый шаг</strong><p>Выполнено 10 тренировок</p></div></div>{achievementsOpen && <div className={styles.achievement}><span>🏆</span><div><strong>Сильный старт</strong><p>Проведено 10 часов в тренировках</p></div></div>}<button className={styles.achievementsLink} onClick={() => setAchievementsOpen((value) => !value)} aria-expanded={achievementsOpen}>{achievementsOpen ? "Свернуть" : "Все достижения"} <ChevronRight size={18} /></button></aside></div>
  </div>;
}
