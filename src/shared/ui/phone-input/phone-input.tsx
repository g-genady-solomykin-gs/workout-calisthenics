"use client";

import { type ChangeEvent, type InputHTMLAttributes, useRef } from "react";
import { formatPhoneNumber } from "@/shared/lib/phone/format-phone-number";
import styles from "./phone-input.module.scss";

type PhoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> & {
  label?: string;
  onValueChange: (value: string) => void;
};

export function PhoneInput({ label = "Номер телефона", onValueChange, id = "phone", value, ...props }: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = formatPhoneNumber(event.target.value);
    onValueChange(nextValue);
    if (nextValue.replace(/\D/g, "").length === 11) {
      window.requestAnimationFrame(() => inputRef.current?.blur());
    }
  }

  return (
    <label className={styles.field} htmlFor={id}>
      <span>{label}</span>
      <input ref={inputRef} id={id} type="tel" inputMode="tel" enterKeyHint="done" autoComplete="tel" placeholder="+7 (___) ___-__-__" value={value} onChange={handleChange} {...props} />
    </label>
  );
}
