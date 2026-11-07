"use client";

import { NextIntlClientProvider } from "next-intl";
import { createContext, type ReactNode, useContext, useMemo, useState, useSyncExternalStore } from "react";
import en from "@messages/en.json";
import kk from "@messages/kk.json";
import ru from "@messages/ru.json";

export const locales = ["ru", "kk", "en"] as const;
export type AppLocale = (typeof locales)[number];

const messages = { ru, kk, en } as const;
const LocaleContext = createContext<{ locale: AppLocale; setLocale: (locale: AppLocale) => void }>({ locale: "ru", setLocale: () => undefined });

function subscribeToLocale() { return () => undefined; }
function getStoredLocale(): AppLocale {
  const storedLocale = window.localStorage.getItem("workout-locale");
  return storedLocale && locales.includes(storedLocale as AppLocale) ? (storedLocale as AppLocale) : "ru";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const storedLocale: AppLocale = useSyncExternalStore<AppLocale>(subscribeToLocale, getStoredLocale, () => "ru");
  const [selectedLocale, setSelectedLocale] = useState<AppLocale | null>(null);
  const locale = selectedLocale ?? storedLocale;
  const setLocale = (nextLocale: AppLocale) => { window.localStorage.setItem("workout-locale", nextLocale); setSelectedLocale(nextLocale); };
  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={value}><NextIntlClientProvider locale={locale} messages={messages[locale]}>{children}</NextIntlClientProvider></LocaleContext.Provider>;
}

export function useAppLocale() { return useContext(LocaleContext); }
