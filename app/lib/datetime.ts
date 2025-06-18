import { formatDistance } from "date-fns";

export function formatDate(date: Date | null) {
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

export function formatRelativeDateTime(date: Date) {
  return formatDistance(date, new Date(), { addSuffix: true });
}
