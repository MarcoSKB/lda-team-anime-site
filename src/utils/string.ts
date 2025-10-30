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

export const isValidUrl = (url: string) => {
  return /^https?:\/\/\S+$/.test(url)
}

export const getUrlFromString = (str: string) => {
  if (isValidUrl(str)) {
    return str
  }
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch {
    return null
  }
}

export const absoluteUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
