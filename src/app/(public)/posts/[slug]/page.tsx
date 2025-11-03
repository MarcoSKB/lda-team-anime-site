import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { formatDistanceToNowStrict } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Clock4, Library } from 'lucide-react'

import { Breadcrumbs } from '@/components/module'
import ImageNode from '@/components/tiptap/extensions/image-ssr'
import { Container, Tag } from '@/components/ui'

import { getPost } from '@/actions/post'
import { POST_TYPE_LABELS } from '@/utils/global-vars'
import { readingTimesWithLocale, truncateText } from '@/utils/string'

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc',
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Typography,
  ImageNode,
]

interface Props {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const res = await getPost(slug)

  if (res.type == 'error') {
    return {
      title: 'Пост | LDA Team',
      description: 'Не удалось загрузить информацию о посте.',
    }
  }
  const title = res.data.title
  const description = truncateText(res.data.description, 160, true)

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/posts/${res.data.slug}`,
      siteName: 'LDA Team',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

const page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const res = await getPost(slug)

  if (res.type == 'error') {
    redirect('/posts')
  }

  const post = res.data

  const content = generateHTML(JSON.parse(post.content), extensions)
  const createdAt = formatDistanceToNowStrict(new Date(post.createdAt), {
    addSuffix: true,
    locale: ru,
  })

  return (
    <section className='overflow-hidden pt-[24px] md:pt-[72px]'>
      <Container className='flex flex-col'>
        <Breadcrumbs hideLastLink />
        <div className='flex w-full flex-wrap justify-between gap-3'>
          <Tag
            intent='default'
            className='text-foreground mb-2 self-start text-sm leading-[150%]'
          >
            {POST_TYPE_LABELS[post.postType]}
          </Tag>
          <div className='mb-3 flex flex-wrap items-center gap-3'>
            <div className='text-foreground flex items-center gap-2'>
              <Clock4 width={24} height={24} />
              <span className='text-base opacity-90'>{createdAt}</span>
            </div>
            <div className='bg-foreground h-6 w-[1px] opacity-40' />
            <div className='text-foreground flex items-center gap-2'>
              <Library width={24} height={24} />
              <span className='text-base opacity-90'>
                {readingTimesWithLocale(post.content)}
              </span>
            </div>
          </div>
        </div>
        <h1 className='mb-2 line-clamp-2 font-[Roboto_Flex] text-2xl font-extrabold md:text-3xl lg:text-4xl'>
          {post.title}
        </h1>
        <p className='text-foreground/80 mb-3 md:mb-5 lg:mb-6'>
          {post.description}
        </p>
        <div
          className='prose ProseMirror'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </section>
  )
}

export default page
