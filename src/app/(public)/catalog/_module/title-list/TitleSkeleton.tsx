const TitleSkeleton: React.FC = () => {
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-2 gap-y-4 md:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] md:gap-x-4 md:gap-y-6'>
      {[...Array(12)].map((_, idx) => (
        <li key={idx}>
          <div className='dark:border-secondary bg-secondary flex h-full w-full flex-col overflow-hidden rounded-lg border-1 border-solid border-[#d5d9e2] drop-shadow-xl dark:drop-shadow-none'>
            <div className='relative z-0 h-full min-h-[189px] w-full min-w-[132px] animate-pulse bg-gray-500 md:min-h-[264px] md:min-w-[198px] dark:bg-gray-700'></div>
            <div className='bg-secondary flex h-full flex-col gap-1 px-2 py-2 md:gap-2.5'>
              <div className='mb-auto h-[20px] w-full animate-pulse rounded-sm bg-gray-500 opacity-50 md:mb-0 dark:bg-gray-700' />
              <div className='hidden h-[24px] w-full max-w-[182px] animate-pulse rounded-sm bg-gray-500 opacity-50 md:block dark:bg-gray-700' />
              <div className='h-[12px] w-[30%] animate-pulse rounded-sm bg-gray-500 opacity-50 dark:bg-gray-700' />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TitleSkeleton
