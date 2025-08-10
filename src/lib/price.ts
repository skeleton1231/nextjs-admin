export function formatPrice(
  amountInCents: number | null | undefined,
  currency?: string | null,
): string {
  if (amountInCents == null) return "-";
  const amount = amountInCents / 100;
  return `${amount}${currency ? ` ${currency}` : ""}`;
}

export function displayFromCents(
  amountInCents: number | null | undefined,
): string {
  if (amountInCents == null) return "";
  return String(amountInCents / 100);
}

export function centsFromDisplay(displayValue: string): number | undefined {
  if (displayValue.trim() === "") return undefined;
  const numeric = Number(displayValue);
  if (Number.isNaN(numeric)) return undefined;
  return Math.round(numeric * 100);
}
