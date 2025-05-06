import { Container } from '@/components/ui'

const loading: React.FC = () => {
  return (
    <section className='pt-[24px] md:pt-[72px]'>
      <Container className='flex flex-col'>
        <div className='dark:bg-secondary mb-2 h-[20px] w-[100px] animate-pulse rounded-sm bg-gray-500' />
        <div className='dark:bg-secondary mb-2 h-[28px] w-[80px] animate-pulse rounded-sm bg-gray-500' />
        <div className='dark:bg-secondary mb-2 h-[32px] w-[60%] animate-pulse rounded-md bg-gray-500' />
        <div className='dark:bg-secondary mb-6 h-[24px] w-[30%] animate-pulse rounded-md bg-gray-500' />
        <div className='mb-2 space-y-2'>
          <div className='dark:bg-secondary h-4 w-full animate-pulse rounded-sm bg-gray-500' />
          <div className='dark:bg-secondary h-4 w-5/6 animate-pulse rounded-sm bg-gray-500' />
          <div className='dark:bg-secondary h-4 w-2/3 animate-pulse rounded-sm bg-gray-500' />
        </div>
        <div className='mb-6 space-y-2'>
          <div className='dark:bg-secondary h-4 w-full animate-pulse rounded-sm bg-gray-500' />
          <div className='dark:bg-secondary h-4 w-5/6 animate-pulse rounded-sm bg-gray-500' />
          <div className='dark:bg-secondary h-4 w-2/3 animate-pulse rounded-sm bg-gray-500' />
        </div>

        <div className='dark:bg-secondary mb-2 h-[24px] w-[45%] animate-pulse rounded-sm bg-gray-500' />
        <div className='dark:bg-secondary mb-3 h-[20px] w-[90%] animate-pulse rounded-sm bg-gray-500' />
        <div className='mb-6 space-y-2'>
          <div className='dark:bg-secondary h-4 w-full animate-pulse rounded-sm bg-gray-500' />
          <div className='dark:bg-secondary h-4 w-4/5 animate-pulse rounded-sm bg-gray-500' />
        </div>

        <div className='dark:bg-secondary mb-2 h-[24px] w-[45%] animate-pulse rounded-sm bg-gray-500' />
        <div className='dark:bg-secondary mb-3 h-[20px] w-[90%] animate-pulse rounded-sm bg-gray-500' />
        <div className='mb-6 space-y-2'>
          <div className='dark:bg-secondary h-4 w-full animate-pulse rounded-sm bg-gray-500' />
          <div className='dark:bg-secondary h-4 w-5/6 animate-pulse rounded-sm bg-gray-500' />
          <div className='dark:bg-secondary h-4 w-2/3 animate-pulse rounded-sm bg-gray-500' />
        </div>
      </Container>
    </section>
  )
}

export default loading
