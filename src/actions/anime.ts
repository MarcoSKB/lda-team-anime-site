'use server'

import { redirect } from 'next/navigation'

import { AnimeEpisodesData } from '@/data/animeEpisodesData'
import { carouselData } from '@/data/carouselData'
import { catalogData } from '@/data/catalogData'
import { lastDubbingData } from '@/data/lastDubbingData'
import { ongoingData } from '@/data/ongoingData'
import { scheduleData } from '@/data/scheduleData'
import { sleep } from '@/utils/system'

export const getPopularAnime = async () => {
  //Revalidate 1 hour
  return carouselData
}

export const getOngoingTitles = async () => {
  await sleep(3000)

  //Revalidate 1 hour
  return ongoingData
}

export const getRecentVoiceover = async () => {
  await sleep(3000)

  //Revalidate 1 hour
  return lastDubbingData
}

export const getCatalogList = async () => {
  await sleep(3000)

  //Revalidate by tag
  return catalogData
}

export const getAnimeTitle = async (slug: string) => {
  await sleep(3000)
  const animeTitle = ongoingData.find((anime) => anime.slug == slug)

  //Revalidate 3 hour
  if (!animeTitle) redirect('/catalog')
  return animeTitle
}

export const getAnimeEpisodes = async (slug: string) => {
  await sleep(3000)
  const animeEpisodes = AnimeEpisodesData.find((anime) => anime.slug == slug)

  if (!animeEpisodes) redirect('/catalog')
  return animeEpisodes
}

export const getScheduleList = async () => {
  await sleep(3000)

  //Revalidate 1 hour
  return scheduleData
}

export const searchAnime = async (search: string | null) => {
  if (!search || search == '') {
    return []
  }

  await sleep(3000)
  // Limit 5 items
  const results = ongoingData.filter(
    (anime) =>
      anime.title.includes(search) || anime.description.includes(search),
  )
  return results
}
