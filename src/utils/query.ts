import { ReadonlyURLSearchParams } from 'next/navigation'

export const updateQuery = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  if (value) {
    urlSearchParams.set(name, value)
  } else {
    urlSearchParams.delete(name)
  }
  window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
}

export const formatSlug = (slug: string): string =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
