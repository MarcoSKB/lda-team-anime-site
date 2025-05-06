import Image from 'next/image'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { Clock4, Library } from 'lucide-react'

interface Props {
  author: string
  authorAvatar?: string
  readingTime: string
  createdAt: string
}

const PostInfo: React.FC<Props> = (props) => {
  const {
    author,
    authorAvatar = '/images/placeholder-image.jpg',
    readingTime,
    createdAt,
  } = props
  const formattedCreatedAt = format(createdAt, 'd MMMM yyyy', { locale: ru })

  return (
    <div className='mb-6 flex items-center gap-3'>
      <div className='text-foreground flex items-center gap-2'>
        <Image
          width={28}
          height={28}
          src={authorAvatar}
          alt='Аватар автора поста'
          className='rounded-full'
        />
        <span className='text-base font-medium opacity-90'>{author}</span>
      </div>
      <div className='bg-foreground h-6 w-[1px] opacity-40' />
      <div className='text-foreground flex items-center gap-2'>
        <Clock4 width={24} height={24} />
        <span className='text-base opacity-90'>{formattedCreatedAt}</span>
      </div>
      <div className='bg-foreground h-6 w-[1px] opacity-40' />
      <div className='text-foreground flex items-center gap-2'>
        <Library width={24} height={24} />
        <span className='text-base opacity-90'>{readingTime}</span>
      </div>
    </div>
  )
}

export default PostInfo
