const TitleSkeleton: React.FC = () => {
  return (
    <ul className='grid h-fit w-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-1 gap-y-1 md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] md:gap-x-2 md:gap-y-5 lg:gap-x-4 lg:gap-y-6'>
      {[...Array(10)].map((_, idx) => (
        <li key={idx}>
          <div className='group dark:border-secondary flex h-full w-full max-w-[220px] scroll-mt-10 flex-col gap-2 overflow-hidden rounded-lg border-1 border-solid border-[#d5d9e2] p-2 drop-shadow-xl dark:drop-shadow-none'>
            <div className='md:bg-secondary relative z-0 aspect-[202/264] h-full w-full animate-pulse rounded-[4px] bg-gray-500' />
            <div className='flex h-full flex-col gap-1 px-0.5'>
              <span className='dark:bg-secondary h-[14px] w-full animate-pulse rounded-xs bg-gray-500' />
              <span className='dark:bg-secondary h-[12px] w-[20%] animate-pulse rounded-xs bg-gray-500' />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TitleSkeleton
