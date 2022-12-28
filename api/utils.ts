const readingSpeed = 1000 // characters per minute

export const getReadingTimeEstimate = (textLength: number) => {
  return Math.round(textLength / readingSpeed)
}

