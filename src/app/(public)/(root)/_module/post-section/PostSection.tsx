import { Suspense } from 'react'

import { PostList, PostSkeleton } from './components'

const PostSection: React.FC = () => {
  return (
    <section className='flex grow flex-col md:w-[40%]'>
      <h2 className='text-foreground mb-2 pl-4 text-xl leading-[42px] font-bold md:mb-4 md:pl-0'>
        Посты
      </h2>
      <Suspense fallback={<PostSkeleton />}>
        <PostList />
      </Suspense>
    </section>
  )
}

export default PostSection
