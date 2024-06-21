import {
  format,
  formatDistance,
  isToday,
  isYesterday,
  isThisWeek,
} from "date-fns";
import { es } from "date-fns/locale";

export function longDate(date) {
  if (!date) return null;
  return format(date, "PPP", { locale: es });
}

export function shortDate(date) {
  if (!date) return null;
  return format(date, "dd/MM/yy");
}

export function dateDistance(date) {
  if (!date) return null;
  return formatDistance(date, Date.now(), { locale: es, addSuffix: "Hace" });
}

export function timeDate(date) {
  if (!date) return null;
  return format(date, "HH:mm - dd MMM yy", { locale: es });
}

export function time(date) {
  if (!date) return null;
  return format(date, "HH:mm", { locale: es });
}

export function minimumRelativeDate(date) {
  if (!date) return null;
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else if (isYesterday(date)) {
    return "ayer";
  } else if (isThisWeek(date)) {
    return format(date, "EEEE", { locale: es });
  } else {
    return format(date, "dd/MM/yy");
  }
}
