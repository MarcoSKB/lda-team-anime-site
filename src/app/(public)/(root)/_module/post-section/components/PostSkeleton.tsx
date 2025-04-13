const PostSkeleton: React.FC = () => {
  return (
    <ul className='flex w-full flex-col gap-2 md:max-w-[488px]'>
      {[...Array(6)].map((_, idx) => (
        <li
          key={idx}
          className='dark:border-secondary flex h-[162px] animate-pulse flex-col border-1 border-solid border-[#e2e7f1] px-4 py-3 md:rounded-md'
        >
          <div className='mb-2 flex justify-between'>
            <div className='bg-secondary h-[20px] w-[70px] animate-pulse rounded-md' />
            <div className='bg-secondary h-[20px] w-[90px] animate-pulse rounded-md' />
          </div>
          <div className='bg-secondary mb-2 h-[22px] w-full animate-pulse rounded-sm' />
          <div className='bg-secondary mb-3 h-[40px] w-full animate-pulse rounded-sm' />
          <div className='bg-secondary h-[20px] w-[128px] animate-pulse rounded-sm' />
        </li>
      ))}
    </ul>
  )
}

export default PostSkeleton
