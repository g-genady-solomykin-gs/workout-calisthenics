"use client";

import { Globe2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { locales, useAppLocale } from "@/shared/i18n/locale-provider";
import styles from "./locale-switcher.module.scss";

export function LocaleSwitcher() {
  const t = useTranslations("Language");
  const { locale, setLocale } = useAppLocale();

  return <label className={styles.localeSwitcher} aria-label={t("label")}><Globe2 className={styles.localeSwitcher__icon} size={17} /><select className={styles.localeSwitcher__select} value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)}>{locales.map((item) => <option key={item} value={item}>{t(item)}</option>)}</select></label>;
}
