import { Tag } from '@/components/ui'

import { CommentType } from '@/types/comment.types'

interface Props {
  comments: CommentType[]
}

const CommentTitle: React.FC<Props> = ({ comments }) => {
  return (
    <div className='flex items-center gap-3'>
      <h2 className='font-[Roboto_Flex] text-2xl font-semibold'>Комментарий</h2>
      <Tag intent='secondary' className='text-sm font-bold'>
        {comments.flatMap((comment) => [comment, ...comment.replies]).length}
      </Tag>
    </div>
  )
}

export default CommentTitle
