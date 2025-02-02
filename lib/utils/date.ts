import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatDate(date: string | Date) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  console.log(parsedDate, 'ini date')
  return format(parsedDate, "EEEE, dd MMMM yyyy, HH:mm", { locale: id });
}

export function formatDateOnly(date: string | Date) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, "EEEE, dd MMMM yyyy", { locale: id });
}

export function formatTimeOnly(date: string | Date) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, "HH:mm", { locale: id });
}