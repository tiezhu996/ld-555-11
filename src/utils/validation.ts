export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
