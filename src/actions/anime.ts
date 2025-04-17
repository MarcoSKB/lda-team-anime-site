'use server'

import { carouselData } from '@/data/carouselData'
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
