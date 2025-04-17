import { Suspense } from 'react'

import { Container } from '@/components/ui'

import { Order, TitleList, TitleSkeleton } from './_module'

const page: React.FC = () => {
  return (
    <section className='md:pt-[72px]'>
      <h1 className='sr-only'>Каталог аниме тайтлов с удобным фильтром</h1>
      <Container className='md:pt-[24px]'>
        <div className='mb-4 flex flex-col justify-between gap-2 md:mb-6 md:flex-row'>
          <h2 className='font-[Roboto_Flex] text-[32px] leading-[41px] font-extrabold'>
            Каталог
          </h2>
          <div className='flex gap-3'>
            <Order />
            {/* <Filter /> */}
          </div>
        </div>
        <Suspense fallback={<TitleSkeleton />}>
          <TitleList />
        </Suspense>
      </Container>
    </section>
  )
}

export default page
