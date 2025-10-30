'use client'

import { useOptimistic, useState, useTransition } from 'react'

import { IconArrowDown, IconArrowUp } from '@tabler/icons-react'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui'

import { dislikeComment, likeComment } from '@/actions/comment'
import type { CommentType } from '@/types/comment.types'
import { cn } from '@/utils/cn'

interface Props {
  commentId: string
  likes: number
  dislikes: number
  userReactionType: null | true | false
}

const CommentVotes: React.FC<Props> = ({
  commentId,
  likes,
  dislikes,
  userReactionType,
}) => {
  const [baseState, setBaseState] = useState({
    likes,
    dislikes,
    userVote: userReactionType,
  })
  const [isPending, startTransition] = useTransition()
  const [optimisticState, updateOptimistic] = useOptimistic(
    baseState,
    (
      current,
      action: { type: 'like' | 'dislike' | 'sync'; data?: CommentType },
    ) => {
      let { likes, dislikes, userVote } = current

      if (action.type === 'like') {
        if (userVote === true) {
          likes -= 1
          userVote = null
        } else {
          likes += 1
          if (userVote === false) dislikes -= 1
          userVote = true
        }
      }

      if (action.type === 'dislike') {
        if (userVote === false) {
          dislikes -= 1
          userVote = null
        } else {
          dislikes += 1
          if (userVote === true) likes -= 1
          userVote = false
        }
      }

      if (action.type === 'sync' && action.data) {
        return {
          likes: action.data.likes,
          dislikes: action.data.dislikes,
          userVote: action.data.userReactionType ?? userVote,
        }
      }

      return { likes, dislikes, userVote }
    },
  )
  const commentTotalRating = optimisticState.likes - optimisticState.dislikes

  const handleVote = (type: 'like' | 'dislike') => {
    startTransition(async () => {
      updateOptimistic({ type })

      const result =
        type === 'like'
          ? await likeComment(commentId)
          : await dislikeComment(commentId)

      if (result.type === 'ok' && result.data) {
        updateOptimistic({ type: 'sync', data: result.data })
        setBaseState({
          likes: result.data.likes,
          dislikes: result.data.dislikes,
          userVote: result.data.userReactionType ?? optimisticState.userVote,
        })
      }
    })
  }

  return (
    <div className='flex flex-col items-center gap-1'>
      <Button
        title='Лайк'
        intent='default'
        size='small'
        className={cn(
          'flex items-center gap-1 px-2 py-2 hover:text-green-400',
          optimisticState.userVote === true && 'text-green-400',
        )}
        disabled={isPending}
        onClick={() => handleVote('like')}
      >
        <IconArrowUp width={20} height={20} />
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={cn(
              'cursor-default text-sm leading-none font-medium',
              commentTotalRating > 0 && 'text-green-400',
              commentTotalRating < 0 && 'pr-1 text-red-400',
              commentTotalRating == 0 && 'text-foreground',
            )}
          >
            {commentTotalRating}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {optimisticState.likes} лайк - {optimisticState.dislikes} дизлайк
        </TooltipContent>
      </Tooltip>
      <Button
        title='Дизлайк'
        intent='default'
        size='small'
        className={cn(
          'flex items-center gap-1 px-2 py-2 hover:text-red-400',
          optimisticState.userVote === false && 'text-red-400',
        )}
        disabled={isPending}
        onClick={() => handleVote('dislike')}
      >
        <IconArrowDown width={20} height={20} />
      </Button>
    </div>
  )
}

export default CommentVotes
