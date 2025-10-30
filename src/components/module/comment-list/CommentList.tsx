'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Comment } from '@/components/module'

import { CommentType } from '@/types/comment.types'

import { ActiveEditorProvider, CommentTitle, ShowMore } from './components'

interface Props {
  titleId: string
  isLoggedIn: boolean
  comments: CommentType[]
}

const CommentList: React.FC<Props> = (props) => {
  const { titleId, isLoggedIn, comments } = props
  const [isExpanded, setIsExpanded] = useState(false)

  if (comments.length == 0) {
    return (
      <ActiveEditorProvider>
        <CommentTitle comments={comments} />
        <div className='mx-auto flex w-fit flex-col flex-wrap items-center gap-2.5 rounded-lg px-3 py-2 pt-4'>
          <Image
            src='/images/no-content-image.png'
            width={85}
            height={100}
            alt='Милый коричневый котик'
          />
          <span className='text-center text-[15px] md:text-base'>
            Пока никто не оставил <br />
            комментарий
          </span>
        </div>
      </ActiveEditorProvider>
    )
  }

  return (
    <ActiveEditorProvider>
      <CommentTitle comments={comments} />
      <ul className='flex flex-col gap-2 md:gap-3 md:px-3'>
        {isExpanded
          ? comments.map((comment) => (
              <li key={comment.id}>
                <Comment
                  {...comment}
                  titleId={titleId}
                  isLoggedIn={isLoggedIn}
                />
              </li>
            ))
          : comments.slice(0, 3).map((comment) => (
              <li key={comment.id}>
                <Comment
                  {...comment}
                  titleId={titleId}
                  isLoggedIn={isLoggedIn}
                />
              </li>
            ))}
      </ul>
      {comments.length > 2 && (
        <ShowMore
          isExpanded={isExpanded}
          setIsExpanded={() => setIsExpanded(!isExpanded)}
        />
      )}
    </ActiveEditorProvider>
  )
}

export default CommentList
