import { ReadonlyURLSearchParams } from 'next/navigation'

export const updateQuery = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const urlSearchParams = new URLSearchParams(searchParams.toString())
  urlSearchParams.set(name, value)
  window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
}
