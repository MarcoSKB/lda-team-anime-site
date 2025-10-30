import { Container, Skeleton, Tag } from '@/components/ui'

const CommentSectionSkeleton: React.FC = () => {
  return (
    <Container className='flex flex-col gap-5 py-8'>
      {/* <Skeleton className='h-[252px] w-full rounded-md' /> */}
      <div className='flex items-center gap-3'>
        <h2 className='font-[Roboto_Flex] text-2xl font-semibold'>
          Комментарий
        </h2>
        <Tag intent='secondary' className='text-sm font-bold'>
          {0}
        </Tag>
      </div>
      <ul className='flex flex-col gap-2 md:gap-3 md:px-3'>
        <div className='flex w-full gap-3'>
          <Skeleton className='h-[32px] w-[32px]' />
          <div className='flex w-full flex-col gap-3'>
            <Skeleton className='h-[28px] w-[30%]' />
            <Skeleton className='h-[64px]' />
          </div>
        </div>
        <div className='flex w-full gap-3'>
          <Skeleton className='h-[32px] w-[32px]' />
          <div className='flex w-full flex-col gap-3'>
            <Skeleton className='h-[28px] w-[30%]' />
            <Skeleton className='h-[64px]' />
          </div>
        </div>
        <div className='flex w-full gap-3'>
          <Skeleton className='h-[32px] w-[32px]' />
          <div className='flex w-full flex-col gap-3'>
            <Skeleton className='h-[28px] w-[30%]' />
            <Skeleton className='h-[64px]' />
          </div>
        </div>
      </ul>
    </Container>
  )
}

export default CommentSectionSkeleton
