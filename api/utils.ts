const readingSpeed = 1000 // characters per minute

export const getReadingTimeEstimate = (textLength) => {
  return Math.round(textLength / readingSpeed)
}

