import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LocaleProvider } from "@/shared/i18n/locale-provider";
import "./globals.scss";

export const metadata: Metadata = {
  title: "WORKOUT — твой тренер по воркауту",
  description: "Понятный трекер тренировок по воркауту.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body><LocaleProvider>{children}</LocaleProvider></body>
    </html>
  );
}
