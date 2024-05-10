import { format } from "date-fns";
import { es } from "date-fns/locale";

export function longDate(date) {
  if (!date) return null;
  return format(date, "PPP", { locale: es });
}

export function shortDate(date) {
  if (!date) return null;
  return format(date, "dd/MM/yy");
}
