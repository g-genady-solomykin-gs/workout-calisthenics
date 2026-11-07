import Link from "next/link";
import styles from "./app-logo.module.scss";

export type AppLogoProps = {
  compact?: boolean;
  onClick?: () => void;
  variant?: "light" | "dark";
};

export function AppLogo({ compact = false, onClick, variant = "light" }: AppLogoProps) {
  const content = <><span className={styles.mark}>W</span><span>WORKOUT</span></>;
  return <Link className={`${styles.logo} ${variant === "dark" ? styles.dark : ""} ${compact ? styles.compact : ""}`} href="/" onClick={onClick} aria-label="На главную">{content}</Link>;
}
