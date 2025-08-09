'use server'

import userListData from '@/data/dashboardData.json'
import { sleep } from '@/utils/system'

export const getUserList = async () => {
  await sleep(5000)
  return userListData
}
