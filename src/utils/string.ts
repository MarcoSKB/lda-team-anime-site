export const truncateText = (
  text: string,
  maxLength: number = 10,
  withEllipsis: boolean = true,
) => {
  if (withEllipsis && !(text.length <= maxLength))
    return text.substring(-1, maxLength).trimEnd() + '...'
  else return text.substring(-1, maxLength)
}
