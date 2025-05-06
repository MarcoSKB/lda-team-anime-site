import { Container } from '@/components/ui'

const loading: React.FC = () => {
  return (
    <section className='pt-4 md:pt-[72px]'>
      <Container className='pt-[24px]'>
        <h1 className='mb-2 font-[Roboto_Flex] text-[24px] leading-[28px] font-extrabold text-balance md:text-[32px] md:leading-[41px]'>
          Список постов
        </h1>
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]'>
          {[...Array(12)].map((_, idx) => (
            <div
              key={idx}
              className='dark:border-secondary flex flex-col border-1 border-solid border-[#e2e7f1] bg-transparent px-4 pt-3.5 pb-1.5 opacity-50 md:rounded-md dark:opacity-100'
            >
              <div className='mb-2 flex justify-between gap-1'>
                <div className='dark:bg-secondary h-[22px] w-[80px] animate-pulse rounded-sm bg-gray-500' />
                <div className='dark:bg-secondary h-[22px] w-[80px] animate-pulse rounded-sm bg-gray-500' />
              </div>
              <div className='dark:bg-secondary mb-1 h-[22px] w-[50%] animate-pulse rounded-sm bg-gray-500' />
              <div className='dark:bg-secondary mb-1 h-[22px] w-[60%] animate-pulse rounded-sm bg-gray-500' />
              <div className='dark:bg-secondary mb-1 h-[40px] w-[100%] animate-pulse rounded-sm bg-gray-500' />
              <div className='dark:bg-secondary my-2 h-[20px] w-[20%] animate-pulse rounded-sm bg-gray-500' />
            </div>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default loading
