import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseNumber(input: unknown): number | undefined {
  if (input === null || input === undefined) return undefined
  if (typeof input === "number") return Number.isNaN(input) ? undefined : input
  const raw = String(input).trim()
  if (!raw) return undefined
  const normalized = raw.replace(/[^0-9.,-]/g, "")
  const hasCommaDecimal =
    normalized.includes(",") &&
    normalized.lastIndexOf(",") > normalized.lastIndexOf(".")
  const cleaned = hasCommaDecimal
    ? normalized.replace(/\./g, "").replace(",", ".")
    : normalized.replace(/,/g, "")
  const n = Number(cleaned)
  return Number.isNaN(n) ? undefined : n
}
