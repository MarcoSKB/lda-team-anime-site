import { Metadata } from 'next'
import Image from 'next/image'

import { Post } from '@/components/module'
import { Container } from '@/components/ui'

import { getPostPreviewList } from '@/actions/post'

export const metadata: Metadata = {
  title: 'Посты',
}

const page: React.FC = async () => {
  const res = await getPostPreviewList()
  if (res.type === 'error') {
    return (
      <section className='pt-4 md:pt-[72px]'>
        <Container className='pt-[24px]'>
          <h1 className='mb-2 font-[Roboto_Flex] text-[24px] leading-[28px] font-extrabold text-balance md:text-[32px] md:leading-[41px]'>
            Список постов
          </h1>
          Произошла ошибка, повторите попытку позже.
        </Container>
      </section>
    )
  }
  const postList = res.data.results
  return (
    <section className='pt-4 md:pt-[72px]'>
      <Container className='pt-[24px]'>
        <h1 className='mb-2 font-[Roboto_Flex] text-[24px] leading-[28px] font-extrabold text-balance md:text-[32px] md:leading-[41px]'>
          Список постов
        </h1>
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]'>
          {postList.length == 0 ? (
            <div className='mx-auto flex w-fit flex-col flex-wrap items-center gap-2.5 rounded-lg px-3 py-2 pt-4 md:flex-row'>
              <Image
                src='/images/no-content-image.png'
                width={85}
                height={100}
                alt='Милый коричневый котик'
              />
              <span className='text-center text-[15px] md:text-base'>
                Тишина в ленте... но кошка чует, <br />
                что посты скоро появятся ❤️
              </span>
            </div>
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
      </Container>
    </section>
  )
}

export default page
