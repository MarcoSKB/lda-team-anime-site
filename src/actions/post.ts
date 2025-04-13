'use server'

import { postsData } from '@/data/postsData'
import { sleep } from '@/utils/system'

export const getPostPreviewList = async () => {
  await sleep(3000)

  return postsData
}
