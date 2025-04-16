'use server'

import { carouselData } from '@/data/carouselData'
import { lastDubbingData } from '@/data/lastDubbingData'
import { ongoingData } from '@/data/ongoingData'
import { sleep } from '@/utils/system'

export const getPopularAnime = async () => {
  return carouselData
}

export const getOngoingTitles = async () => {
  await sleep(3000)

  return ongoingData
}

export const getRecentVoiceover = async () => {
  await sleep(3000)

  return lastDubbingData
}
