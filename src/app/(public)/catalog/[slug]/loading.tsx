'use client'

import { Spinner } from '@vidstack/react'

import { Container } from '@/components/ui'

const loading: React.FC = () => {
  return (
    <>
      <Container className='mb-8 flex flex-col gap-6 pt-4 md:flex-row md:pt-0'>
        <div className='mx-auto flex w-1/2 max-w-[260px] min-w-[190px] flex-col gap-3 md:mx-0 md:w-auto'>
          <div className='dark:bg-secondary aspect-auto min-h-[263px] w-auto min-w-[190px] animate-pulse rounded-md bg-gray-500' />
          <div className='flex items-start gap-2'>
            <div className='dark:bg-secondary min-h-[40px] min-w-[40px] animate-pulse rounded-md bg-gray-500' />
            <div className='dark:bg-secondary h-[40px] w-full animate-pulse rounded-md bg-gray-500' />
          </div>
        </div>
        <div className='flex w-full flex-col gap-3'>
          <div className='dark:bg-secondary h-[36px] w-full max-w-[70%] animate-pulse rounded-md bg-gray-500' />
          <div className='before:from-background relative w-fit before:pointer-events-none before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-gradient-to-l before:to-[rgba(255,255,255,0)] before:to-10% before:content-[""]'>
            <div className='flex max-w-[400px] gap-1.5 overflow-x-auto pr-5'>
              <div className='border-secondary dark:bg-secondary h-[23px] w-[64px] animate-pulse rounded-md border-1 border-solid bg-gray-500' />
              <div className='border-secondary dark:bg-secondary h-[23px] w-[64px] animate-pulse rounded-md border-1 border-solid bg-gray-500' />
              <div className='border-secondary dark:bg-secondary h-[23px] w-[64px] animate-pulse rounded-md border-1 border-solid bg-gray-500' />
            </div>
          </div>
          <div className='dark:bg-secondary min-h-[80px] w-full max-w-[700px] animate-pulse rounded-md bg-gray-500' />
        </div>
      </Container>
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
    </>
  )
}

export default loading
