"use client";

import Link from "next/link";
import { Bell, Dumbbell, Home, Library, MoreHorizontal, Settings, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { AppLogo } from "@/components/app-logo/ui/app-logo";
import { LocaleSwitcher } from "@/features/locale-switcher/ui/locale-switcher";
import { useProfile } from "@/shared/model/profile-provider";
import styles from "./app-shell.module.scss";

type Tab = "home" | "workouts" | "library" | "profile";
type AppShellProps = { activeTab: Tab; children: ReactNode };

const navItems = [
  { label: "home", href: "/", icon: Home },
  { label: "workouts", href: "/workouts", icon: Dumbbell },
  { label: "library", href: "/library", icon: Library },
  { label: "profile", href: "/profile", icon: UserRound },
] as const;

export function AppShell({ activeTab, children }: AppShellProps) {
  const t = useTranslations();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { profile } = useProfile();
  const name = profile?.name || "";
  const avatar = name.trim().charAt(0).toUpperCase() || "W";

  return <main className={styles.appShell}>
    <aside className={styles.sidebar}>
      <AppLogo />
      <nav className={styles.navigation} aria-label="Основная навигация">
        {navItems.map(({ label, href, icon: Icon }) => <Link className={`${styles.navItem} ${activeTab === label ? styles.navActive : ""}`} key={label} href={href}><Icon size={20} strokeWidth={2.2} />{t(`Nav.${label}`)}</Link>)}
      </nav>
      <div className={styles.sidebarFooter}><Link className={styles.sideUtility} href="/profile"><Settings size={19} /> {t("Nav.settings")}</Link><div className={styles.profileMini}><span className={styles.avatar}>{avatar}</span><div><strong>{name || "Твой профиль"}</strong><small>{t("App.level", { level: 12 })}</small></div><MoreHorizontal size={19} /></div></div>
    </aside>
    <section className={styles.workspace}>
      <header className={styles.topbar}><div className={styles.mobileBrand}><AppLogo compact variant="dark" /></div><div className={styles.greeting}><span>{t("App.progressToday")}</span><h1>{activeTab === "home" ? (name ? t("App.greeting", { name }) : "Добрый день") : t(`Nav.${activeTab}`)}</h1></div><div className={styles.topActions}><LocaleSwitcher /><div className={styles.notifications}><button className={styles.notification} onClick={() => setNotificationsOpen((value) => !value)} aria-label="Уведомления" aria-expanded={notificationsOpen}><Bell size={21} /><i /></button>{notificationsOpen && <div className={styles.notificationPanel} role="status"><strong>Готово к тренировке</strong><span>Сегодня у тебя план на верх тела.</span></div>}</div><Link className={styles.topAvatar} href="/profile" aria-label="Профиль">{avatar}</Link></div></header>
      {children}
    </section>
    <nav className={styles.mobileNav} aria-label="Мобильная навигация">{navItems.map(({ label, href, icon: Icon }) => <Link className={activeTab === label ? styles.mobileActive : ""} key={label} href={href}><Icon size={21} /><span>{t(`Nav.${label}`)}</span></Link>)}</nav>
  </main>;
}
