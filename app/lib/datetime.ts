import { format, formatDistance, parseISO } from "date-fns";

/**
 * JavaScript built-in Intl.DateTimeFormat
 */

export function formatDate(date?: Date | null) {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

/**
 * Example formats:
 *
 * D MMM YYY
 * H:mm:ss Z
 */

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function formatDateDMY(date: string | Date | undefined) {
  if (!date) return "N/A";
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d MMMM yyyy");
}

export function formatDateYMD(date: string | Date | undefined) {
  if (!date) return "N/A";
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "yyyy-MM-dd");
}

export function formatPublished(date: string | Date | undefined) {
  if (!date) return "N/A";
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "MMMM d, yyyy");
}

/**
 * Relative time
 */

export function formatRelativeDateTime(date: Date) {
  return formatDistance(date, new Date(), { addSuffix: true });
}

export function formatRelativeTime(date: string | Date | undefined) {
  if (!date) return "N/A";
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistance(d, new Date(), { addSuffix: true });
}

export function formatTimestamp(date: string | Date | undefined) {
  if (!date) return "N/A";
  const d = typeof date === "string" ? parseISO(date) : date;
  return `${format(d, "MMM d, yyyy 'at' H:mm")} · ${formatRelativeTime(d)}`;
}

/**
 * Converter
 */

export function convertDaysToSeconds(days: number) {
  // seconds * minutes * hours * days
  return 60 * 60 * 24 * days;
}
