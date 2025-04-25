import { Container } from '@/components/ui'

const TitleInfoSkeleton: React.FC = () => {
  return (
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
  )
}

export default TitleInfoSkeleton
