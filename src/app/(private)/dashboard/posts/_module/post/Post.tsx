'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { formatDistanceToNowStrict } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Button, Tag } from '@/components/ui'

import { deletePost } from '@/actions/post'
import { PostPreview } from '@/types/post.types'
import { POST_TYPES } from '@/utils/global-vars'

const Post: React.FC<PostPreview> = (props) => {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const { id, slug, type, title, description, createdAt } = props
  const date = formatDistanceToNowStrict(new Date(createdAt), {
    addSuffix: true,
    locale: ru,
  })

  const handleDelete = async () => {
    await deletePost(id)
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <li className='dark:border-secondary flex flex-col border-1 border-solid border-[#e2e7f1] bg-transparent px-4 pt-3.5 pb-1.5 md:rounded-md'>
      <div className='mb-2 flex items-start justify-between gap-2'>
        <Tag className='text-foreground'>{POST_TYPES[type]}</Tag>
        <Tag intent='secondary' className='flex-nowrap text-nowrap'>
          {date}
        </Tag>
      </div>
      <Link
        href={`/posts/${slug}`}
        className='text-md hover:text-accent mb-1 line-clamp-2 w-full scroll-mt-10 leading-[140%] text-balance break-all opacity-85 transition-colors ease-in-out'
      >
        {title}
      </Link>
      <span className='mb-auto text-sm font-light text-pretty break-all opacity-70'>
        {description}
      </span>
      <div className='flex w-full gap-2 pt-2'>
        <Button intent='secondary' size='small'>
          <Link href={`/dashboard/posts/${slug}`}>Изменить</Link>
        </Button>
        <Button
          intent='destructive'
          size='small'
          onClick={() => handleDelete()}
        >
          Удалить
        </Button>
      </div>
    </li>
  )
}

export default Post
