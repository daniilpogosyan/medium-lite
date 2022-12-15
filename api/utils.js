const readingSpeed = 1000 // characters per minute

exports.getReadingTimeEstimate = (textLength) => {
  return Math.round(textLength / readingSpeed)
}

