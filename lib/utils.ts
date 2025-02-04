import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatDate(date: string | Date) {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
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