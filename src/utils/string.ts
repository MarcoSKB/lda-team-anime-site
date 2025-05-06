import readingTime from 'reading-time'

export const truncateText = (
  text: string,
  maxLength: number = 10,
  withEllipsis: boolean = true,
) => {
  if (withEllipsis && !(text.length <= maxLength))
    return text.substring(-1, maxLength).trimEnd() + '...'
  else return text.substring(-1, maxLength)
}

export const readingTimesWithLocale = (text: string) => {
  return Math.ceil(readingTime(text).minutes) + ' минут чтения'
}
