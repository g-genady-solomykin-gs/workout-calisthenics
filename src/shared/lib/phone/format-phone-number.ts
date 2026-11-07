export function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits.startsWith("7") ? digits : `7${digits}`;
  const localNumber = normalized.slice(1, 11);
  let formatted = "+7";

  if (localNumber.length) formatted += ` (${localNumber.slice(0, 3)}`;
  if (localNumber.length >= 3) formatted += ")";
  if (localNumber.length > 3) formatted += ` ${localNumber.slice(3, 6)}`;
  if (localNumber.length > 6) formatted += `-${localNumber.slice(6, 8)}`;
  if (localNumber.length > 8) formatted += `-${localNumber.slice(8, 10)}`;

  return formatted;
}
