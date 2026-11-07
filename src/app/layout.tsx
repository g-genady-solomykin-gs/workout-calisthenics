import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LocaleProvider } from "@/shared/i18n/locale-provider";
import { ProfileProvider } from "@/shared/model/profile-provider";
import { OnboardingGate } from "@/widgets/onboarding/ui/onboarding-gate";
import "./globals.scss";

export const metadata: Metadata = {
  title: "WORKOUT — твой тренер по воркауту",
  description: "Понятный трекер тренировок по воркауту.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body><LocaleProvider><ProfileProvider><OnboardingGate>{children}</OnboardingGate></ProfileProvider></LocaleProvider></body>
    </html>
  );
}
