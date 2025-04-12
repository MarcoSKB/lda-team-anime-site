const VoiceoverSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col gap-2 md:w-1/2 md:gap-4'>
      {[...Array(5)].map((_, idx) => (
        <li
          key={idx}
          className='bg-secondary flex h-[174px] gap-3 rounded-md border-1 border-solid border-[#e2e7f1] p-2.5 md:gap-6 md:p-3 md:pb-2 dark:border-none'
        >
          <div className='h-full min-w-[112px] rounded-md bg-gray-500 dark:bg-gray-700' />
          <div className='flex w-full flex-col py-1'>
            <div className='mb-1.5 h-[24px] w-1/2 animate-pulse rounded-md bg-gray-500 dark:bg-gray-700' />
            <div className='mb-3 h-[20px] w-[30%] animate-pulse rounded-md bg-gray-500 dark:bg-gray-700' />
            <div className='mb-1 h-[60px] w-full animate-pulse rounded-sm bg-gray-500 dark:bg-gray-700' />
          </div>
        </li>
      ))}
    </div>
  )
}

export default VoiceoverSkeleton
