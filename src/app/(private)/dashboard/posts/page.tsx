import { getPostPreviewList } from '@/actions/post'

import { CreatePost, Post } from './_module'
import { ImageMapProvider } from './_module/create-post/providers/ImageUploadContext'

const page: React.FC = async () => {
  const res = await getPostPreviewList(0, 100, false)
  if (res.type === 'error') {
    return (
      <section className='container mx-auto px-4 py-10 lg:px-6'>
        <h1 className='mb-2 font-[Roboto_Flex] text-[24px] leading-[28px] font-extrabold text-balance md:text-[24px] md:leading-[41px]'>
          Список постов
        </h1>
        Произошла ошибка, повторите попытку позже.
      </section>
    )
  }
  const postList = res.data.results
  return (
    <section className='container mx-auto px-4 py-10 lg:px-6'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='mb-2 font-[Roboto_Flex] text-[24px] leading-[28px] font-extrabold text-balance md:text-[24px] md:leading-[41px]'>
          Список постов
        </h1>
        <ImageMapProvider>
          <CreatePost />
        </ImageMapProvider>
      </div>
      <ul className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]'>
        {postList.length == 0 ? (
          <span>Данный момент постов нету</span>
        ) : (
          postList.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              slug={post.slug}
              type={post.postType}
              title={post.title}
              description={post.description}
              createdAt={post.createdAt}
            />
          ))
        )}
      </ul>
    </section>
  )
}

export default page
