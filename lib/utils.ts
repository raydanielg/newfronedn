import { type ClassValue } from "types"

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ")
}

export function formatPrice(price: number, currency = "TZS"): string {
  return new Intl.NumberFormat("sw-TZ", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function generateGuestId(): string {
  return `guest_${crypto.randomUUID()}`
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + "..."
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}