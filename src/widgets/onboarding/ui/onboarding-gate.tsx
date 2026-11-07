"use client";

import { CalendarDays, Check, ChevronLeft, ChevronRight, CircleUserRound, PartyPopper, Sparkles } from "lucide-react";
import { type ReactNode, useState } from "react";
import { useProfile } from "@/shared/model/profile-provider";
import { PhoneInput } from "@/shared/ui/phone-input/phone-input";
import styles from "./onboarding-gate.module.scss";

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const years = Array.from({ length: 80 }, (_, index) => new Date().getFullYear() - 14 - index);

export function OnboardingGate({ children }: { children: ReactNode }) {
  const { profile, ready, saveProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("0");
  const [year, setYear] = useState(String(years[12]));
  const [saving, setSaving] = useState(false);

  if (!ready) return <div className={styles.loading}><span>W</span></div>;
  if (profile) return children;

  const canContinue = step === 0 ? name.trim().length >= 2 && phone.replace(/\D/g, "").length === 11 : true;
  const birthDate = `${year}-${String(Number(month) + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
  const finish = () => {
    setSaving(true);
    window.setTimeout(() => saveProfile({ name: name.trim(), phone, birthDate }), 2000);
  };

  if (saving) return <section className={styles.saving}><div className={styles.savingMark}><Check size={28} /></div><span>СОХРАНЯЕМ ТВОЙ ПРОФИЛЬ</span><h1>Всё почти готово</h1><p>Настраиваем тренировки под тебя.</p><div className={styles.loader}><i /></div></section>;

  return <main className={styles.screen}>
    <div className={styles.brand}><span>W</span> WORKOUT</div>
    <section className={styles.card}>
      <div className={styles.progress} aria-label={`Шаг ${step + 1} из 3`}><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      <p className={styles.step}>ШАГ {step + 1} ИЗ 3</p>
      {step === 0 && <><div className={styles.icon}><CircleUserRound size={29} /></div><h1>Давай познакомимся</h1><p className={styles.copy}>Укажи, как к тебе обращаться и куда отправлять важные напоминания.</p><label className={styles.nameField}><span>Твоё имя</span><input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Например, Роман" autoComplete="given-name" /></label><div className={styles.phoneWrap}><PhoneInput value={phone} onValueChange={setPhone} /></div></>}
      {step === 1 && <><div className={styles.icon}><CalendarDays size={29} /></div><h1>Когда твой день рождения?</h1><p className={styles.copy}>Это поможет точнее рассчитать нагрузку и отмечать твой день.</p><div className={styles.wheels}><label><span>День</span><select value={day} onChange={(event) => setDay(event.target.value)}>{days.map((value) => <option value={value} key={value}>{value}</option>)}</select></label><label><span>Месяц</span><select value={month} onChange={(event) => setMonth(event.target.value)}>{months.map((value, index) => <option value={index} key={value}>{value}</option>)}</select></label><label><span>Год</span><select value={year} onChange={(event) => setYear(event.target.value)}>{years.map((value) => <option value={value} key={value}>{value}</option>)}</select></label></div><p className={styles.wheelHint}>На iPhone выбор откроется удобным колесом.</p></>}
      {step === 2 && <><div className={styles.icon}><Sparkles size={29} /></div><h1>Профиль готов, {name}</h1><p className={styles.copy}>Проверь данные — мы сохраним их только на этом устройстве.</p><div className={styles.summary}><div><span>Имя</span><b>{name}</b></div><div><span>Телефон</span><b>{phone}</b></div><div><span>Дата рождения</span><b>{`${day} ${months[Number(month)].toLowerCase()} ${year}`}</b></div></div><div className={styles.ready}><PartyPopper size={20} /><span>Можно начинать тренировки</span></div></>}
      <div className={styles.actions}>{step > 0 && <button className={styles.back} onClick={() => setStep((value) => value - 1)}><ChevronLeft size={19} /> Назад</button>}<button className={styles.next} disabled={!canContinue} onClick={() => step === 2 ? finish() : setStep((value) => value + 1)}>{step === 2 ? "Сохранить и начать" : "Продолжить"}<ChevronRight size={19} /></button></div>
    </section>
  </main>;
}
