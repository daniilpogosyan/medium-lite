declare class AggregateError extends Error {
  constructor(errors: Error[], msg?: string)
  errors: Error[]
}