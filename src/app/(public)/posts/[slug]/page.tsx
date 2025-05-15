import { MDXRemote, MDXRemoteOptions } from 'next-mdx-remote-client/rsc'

import { getPost } from '@/actions/post'
import { MdxComponents } from '@/components/mdx-components'

import { Breadcrumbs, ErrorComponent } from '@/components/module'
import { Container, Tag } from '@/components/ui'

import { readingTimesWithLocale } from '@/utils/string'

interface Props {
  params: Promise<{ slug: string }>
}

const page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const post = await getPost(slug)

  const options: MDXRemoteOptions = {
    disableImports: true,
    scope: {
      author: post.author,
      createdAt: post.createdAt,
      readingTime: readingTimesWithLocale(post.content),
    },
  }

  return (
    <section className='overflow-hidden pt-[24px] md:pt-[72px]'>
      <Container className='flex flex-col'>
        <Breadcrumbs hideLastLink />
        <Tag
          intent='default'
          className='text-foreground mb-2 self-start text-sm leading-[150%]'
        >
          {post.type}
        </Tag>
        <MDXRemote
          source={post.content}
          options={options}
          components={MdxComponents}
          onError={ErrorComponent}
        />
      </Container>
    </section>
  )
}

export default page
