'use server'

import { carouselData } from '@/data/carouselData'
import { ongoingData } from '@/data/ongoingData'
import { sleep } from '@/utils/system'

export async function getPopularAnime() {
  return carouselData
}

export async function getOngoingTitles() {
  await sleep(3000)

  return ongoingData
}
