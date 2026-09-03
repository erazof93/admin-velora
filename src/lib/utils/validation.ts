const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

export function minLength(value: string, min: number): boolean {
  return value.trim().length >= min
}
