import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

import CommentAvatar from './CommentAvatar'

interface Props {
  userAvatar?: string
  username: string
  createdAt: string
}

const CommentHeader: React.FC<Props> = (props) => {
  const { userAvatar, username, createdAt } = props

  return (
    <div className='flex items-center gap-3'>
      <CommentAvatar userAvatar={userAvatar} />
      <span className='font-[Roboto_Flex] md:text-lg'>{username}</span>
      <span className='pt-[2px] text-sm font-thin opacity-50'>
        {formatDistanceToNow(createdAt, { addSuffix: true, locale: ru })}
      </span>
    </div>
  )
}

export default CommentHeader
