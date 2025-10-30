import { Suspense } from 'react'

import { getOnlineGraph, getStatistics } from '@/actions/dashboard'

import { ChartAreaInteractive, SectionCards, SectionTitles } from './_module'

const Page = async () => {
  const res = await getStatistics()
  const graph = await getOnlineGraph()

  if (res.type == 'error') return res.message
  if (graph.type == 'error') return graph.message

  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <SectionCards data={res.data} />
      <div className='px-4 lg:px-6'>
        <Suspense fallback='Загрузка'>
          <ChartAreaInteractive data={graph.data} />
        </Suspense>
      </div>
      <SectionTitles data={res.data} />
    </div>
  )
}
export default Page
