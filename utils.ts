export function isNodeError(err: any): err is NodeJS.ErrnoException {
  return err instanceof Error
}

export function isAggregateError(err: any): err is AggregateError {
  return err instanceof AggregateError
}

export function isPositiveInteger(num: any): num is number {
  return num > 0 && Number.isSafeInteger(num)
} 