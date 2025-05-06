import { getPostPreviewList } from '@/actions/post'

import { Post } from '@/components/module'
import { Container } from '@/components/ui'

const page: React.FC = async () => {
  const postList = await getPostPreviewList()
  return (
    <section className='pt-4 md:pt-[72px]'>
      <Container className='pt-[24px]'>
        <h1 className='mb-2 font-[Roboto_Flex] text-[24px] leading-[28px] font-extrabold text-balance md:text-[32px] md:leading-[41px]'>
          Список постов
        </h1>
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-2 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]'>
          {postList.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default page
