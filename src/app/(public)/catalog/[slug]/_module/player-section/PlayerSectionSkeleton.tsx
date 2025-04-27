'use client'

import { Spinner } from '@vidstack/react'

import { Container } from '@/components/ui'

const PlayerSectionSkeleton: React.FC = () => {
  return (
    <section>
      <Container className='flex flex-col'>
        <div className='bg-secondary mb-1.5 flex w-full justify-between rounded-md border-1 border-solid border-[#b2b9c8] px-3 py-2 text-[#000000] dark:border-none dark:text-[rgba(255,255,255,0.5)]'>
          Смотреть онлайн
        </div>
        <div className='relative z-0 flex aspect-video h-auto w-full overflow-hidden rounded-lg'>
          <div className='pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-black'>
            <Spinner.Root
              className='animate-spin text-white transition-opacity duration-200 ease-linear'
              size={84}
            >
              <Spinner.Track className='opacity-25' width={8} />
              <Spinner.TrackFill className='opacity-75' width={8} />
            </Spinner.Root>
          </div>
        </div>
        <h3 className='px-4 pt-4 pb-2'>Выбор эпизодов</h3>
        <ul className='flex max-w-full flex-nowrap gap-2 overflow-x-auto'>
          {[...Array(3)].map((_, idx) => (
            <li key={idx}>
              <div className='flex w-[180px] max-w-[180px] flex-0 flex-col gap-1.5 rounded-md border-2 border-solid border-[rgba(255,255,255,0.1)] p-2'>
                <div className='bg-secondary flex aspect-video min-h-[60px] min-w-full animate-pulse rounded-md' />
                <div className='bg-secondary h-[14px] w-[70%] animate-pulse rounded-md' />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default PlayerSectionSkeleton
