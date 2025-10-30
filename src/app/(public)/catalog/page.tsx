import { Metadata } from 'next'
import { Suspense } from 'react'

import { Container } from '@/components/ui'

import { getCatalogList } from '@/actions/anime'
import { getGenres } from '@/actions/genres'

import {
  FilterMenu,
  FilterMenuMobile,
  Order,
  TitleList,
  TitleSkeleton,
} from './_module'

export const metadata: Metadata = {
  title: 'Каталог',
}

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const page: React.FC<Props> = async ({ searchParams }) => {
  const params = await searchParams
  const data = await getCatalogList(params)
  const genres = await getGenres()

  return (
    <section className='md:pt-[72px]'>
      <h1 className='sr-only'>Каталог аниме тайтлов с удобным фильтром</h1>
      <Container className='md:pt-[24px]'>
        <div className='before:bg-background sticky top-0 z-[1] mb-2 flex flex-wrap items-center justify-between gap-2 py-2 before:absolute before:left-[-16px] before:z-[-1] before:h-full before:w-dvw before:content-[""] md:static md:mb-3 md:flex-row md:gap-2 md:py-0 md:before:hidden lg:mb-6'>
          <h2 className='font-[Roboto_Flex] text-[20px] leading-[32px] font-extrabold md:mt-0 md:text-[24px] md:leading-[41px] lg:text-[32px]'>
            Каталог
          </h2>
          <div className='flex flex-wrap gap-2 md:mb-0 md:gap-3'>
            <Order />
            <Suspense fallback={<TitleSkeleton />}>
              <FilterMenuMobile genres={genres} />
            </Suspense>
          </div>
        </div>
        <div className='flex w-full gap-2 lg:gap-3'>
          <Suspense>
            <TitleList data={data} />
          </Suspense>
          <FilterMenu genres={genres} />
        </div>
      </Container>
    </section>
  )
}

export default page
