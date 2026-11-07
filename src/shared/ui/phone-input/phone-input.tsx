"use client";

import { type ChangeEvent, type InputHTMLAttributes } from "react";
import { formatPhoneNumber } from "@/shared/lib/phone/format-phone-number";
import styles from "./phone-input.module.scss";

type PhoneInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> & {
  label?: string;
  onValueChange: (value: string) => void;
};

export function PhoneInput({ label = "Номер телефона", onValueChange, id = "phone", value, ...props }: PhoneInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onValueChange(formatPhoneNumber(event.target.value));
  }

  return (
    <label className={styles.field} htmlFor={id}>
      <span>{label}</span>
      <input id={id} type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" value={value} onChange={handleChange} {...props} />
    </label>
  );
}
