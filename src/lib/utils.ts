import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatISO(isoDate: string) {
  const date = parseISO(isoDate)

  return format(date, 'MM/dd/yyyy, HH:mm:ss a')
}
