'use server'

import { redirect } from 'next/navigation'

import { AnimeEpisodesData } from '@/data/animeEpisodesData'
import { carouselData } from '@/data/carouselData'
import { catalogData } from '@/data/catalogData'
import { lastDubbingData } from '@/data/lastDubbingData'
import { ongoingData } from '@/data/ongoingData'
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

  if (!animeTitle) redirect('/catalog')
  return animeTitle
}

export const getAnimeEpisodes = async (slug: string) => {
  await sleep(3000)
  const animeEpisodes = AnimeEpisodesData.find((anime) => anime.slug == slug)

  if (!animeEpisodes) redirect('/catalog')
  return animeEpisodes
}
