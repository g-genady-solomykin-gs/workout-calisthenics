import Link from "next/link";
import styles from "./app-logo.module.scss";

export type AppLogoProps = {
  compact?: boolean;
  onClick?: () => void;
  variant?: "light" | "dark";
};

export function AppLogo({ compact = false, onClick, variant = "light" }: AppLogoProps) {
  const content = <><span className={styles.appLogo__mark}>W</span><span className={styles.appLogo__word}>WORKOUT</span></>;
  return <Link className={`${styles.appLogo} ${variant === "dark" ? styles["appLogo--dark"] : ""} ${compact ? styles["appLogo--compact"] : ""}`} href="/" onClick={onClick} aria-label="На главную">{content}</Link>;
}
