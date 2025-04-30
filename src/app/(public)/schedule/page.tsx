import { Suspense } from 'react'

import { getScheduleList } from '@/actions/anime'

import { Container } from '@/components/ui'

import { WeekGroup, WeekGroupSkeleton } from './_module'

const page: React.FC = () => {
  return (
    <section className='md:pt-[72px]'>
      <Container className='pt-[24px]'>
        <h1 className='mb-2 font-[Roboto_Flex] text-[24px] leading-[28px] font-extrabold text-balance md:text-[32px] md:leading-[41px]'>
          Расписание выхода озвучки
        </h1>
        <span className='text-foreground mb-10 inline-block max-w-[700px] text-sm leading-normal text-pretty opacity-70 md:text-base md:leading-[22px]'>
          Актуальное и подробное расписание выхода новых серий в озвучке —
          будьте в курсе всех обновлений, планируйте просмотр заранее и
          наслаждайтесь любимыми историями без ожидания
        </span>
        <Suspense fallback={<WeekGroupSkeleton />}>
          <WeekGroup fetchSceduleList={getScheduleList()} />
        </Suspense>
      </Container>
    </section>
  )
}

export default page
