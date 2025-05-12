import Link from 'next/link'

import { PostPreview } from '@/types/post.types'
import { formatDistanceToNowStrict } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { ArrowRight } from 'lucide-react'

import { LinkButton, Tag } from '@/components/ui'

const Post: React.FC<PostPreview> = (props) => {
  const { slug, type, title, description, createdAt } = props

  const date = formatDistanceToNowStrict(new Date(createdAt), {
    addSuffix: true,
    locale: ru,
  })

  return (
    <li className='dark:border-secondary flex flex-col border-1 border-solid border-[#e2e7f1] bg-transparent px-4 pt-3.5 pb-1.5 md:rounded-md'>
      <div className='mb-2 flex items-start justify-between gap-2'>
        <Tag className='text-foreground'>{type}</Tag>
        <Tag intent='secondary' className='flex-nowrap text-nowrap'>
          {date}
        </Tag>
      </div>
      <Link
        href={`/posts/${slug}`}
        className='text-md hover:text-accent mb-1 w-full scroll-mt-10 leading-[140%] text-balance opacity-85 transition-colors ease-in-out'
      >
        {title}
      </Link>
      <span className='text-sm font-light text-pretty opacity-70'>
        {description}
      </span>
      <LinkButton
        href={`/posts/${slug}`}
        size='small'
        intent='secondary'
        className='hover:text-accent group ml-[-8px] scroll-mt-10 flex-row-reverse self-start opacity-70 transition ease-in-out hover:opacity-100'
        icon={
          <ArrowRight
            width={24}
            height={24}
            className='transition ease-in-out group-hover:translate-x-2'
          />
        }
      >
        Подробнее
      </LinkButton>
    </li>
  )
}

export default Post
