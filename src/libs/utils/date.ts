export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-UK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTelNumber(tel: string): string[] {
  return [tel.substring(0, 3), tel.substring(3, 6), tel.substring(6)];
}
