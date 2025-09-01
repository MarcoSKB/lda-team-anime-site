import readingTime from 'reading-time'

import { VALID_FILE_EXTENSIONS } from './global-vars'

type fileTypes = keyof typeof VALID_FILE_EXTENSIONS

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

export const isValidFileType = (
  fileName: string,
  fileType: fileTypes,
): boolean => {
  return !!(
    fileName &&
    VALID_FILE_EXTENSIONS[fileType].indexOf(fileName.split('.').pop() || '') >
      -1
  )
}
