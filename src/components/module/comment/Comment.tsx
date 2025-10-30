'use client'

import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import type { Element as DomElement } from 'domhandler'
import parse, { DOMNode, domToReact } from 'html-react-parser'

import { Spoiler } from '@/components/tiptap/extensions/spoiler-text'
import { Spoiler as SpoilerComponent } from '@/components/ui'

import { CommentType } from '@/types/comment.types'

import CommentEditor from '../comment-editor/CommentEditor'
import { useActiveEditor } from '../comment-list/components'
import { CommentActions, CommentHeader, CommentVotes } from './components'

export const RenderWithSpoilers = ({ html }: { html: string }) => {
  const options = {
    replace: (node: DOMNode) => {
      const el = node as unknown as DomElement
      if (
        el.type === 'tag' &&
        el.name === 'span' &&
        el.attribs?.['data-spoiler']
      ) {
        return (
          <SpoilerComponent>
            {domToReact(el.children as unknown as DOMNode[], options)}
          </SpoilerComponent>
        )
      }
    },
  }

  return <div className='text-[15px]'>{parse(html, options)}</div>
}

interface Props extends CommentType {
  titleId: string
  isLoggedIn: boolean
}

const extensions = [StarterKit.configure(), TextStyle, Underline, Spoiler]

const Comment: React.FC<Props> = (props) => {
  const {
    titleId,
    id,
    userAvatar,
    nickname,
    createdAt,
    text,
    likes,
    dislikes,
    replies,
    isLoggedIn,
    userReactionType,
  } = props
  const { activeId, setActiveId } = useActiveEditor()

  let content = text
  try {
    content = generateHTML(JSON.parse(text), extensions)
  } catch {}

  const commentEditorHandler = (id: string) => {
    if (id == activeId) {
      setActiveId(null)
    } else {
      setActiveId(id)
    }
  }

  const closeEditorHandler = () => setActiveId(null)

  return (
    <div className='flex w-full gap-2 sm:gap-3'>
      <CommentVotes
        commentId={id}
        likes={likes}
        dislikes={dislikes}
        userReactionType={userReactionType}
      />
      <div className='flex w-full flex-col gap-3 md:gap-4'>
        <div className='flex flex-col gap-2 md:gap-3'>
          <CommentHeader
            userAvatar={userAvatar}
            username={nickname}
            createdAt={createdAt}
          />
          <RenderWithSpoilers html={content} />
          <CommentActions
            isLoggedIn={isLoggedIn}
            openCommentEditor={() => commentEditorHandler(id)}
          />
        </div>
        {id === activeId && (
          <CommentEditor
            parentId={id}
            titleId={titleId}
            isLoggedIn={isLoggedIn}
            closeEditorHandler={closeEditorHandler}
          />
        )}
        <ul className='flex flex-col gap-4'>
          {replies.map((reply) => {
            let replyContent = reply.text
            try {
              replyContent = generateHTML(JSON.parse(reply.text), extensions)
            } catch {}

            return (
              <li key={reply.id} className='flex w-full items-start gap-3'>
                <div className='flex flex-col justify-between'>
                  <CommentVotes
                    commentId={reply.id}
                    likes={reply.likes}
                    dislikes={reply.dislikes}
                    userReactionType={reply.userReactionType}
                  />
                </div>
                <div className='flex w-full flex-col gap-2 md:gap-3'>
                  <CommentHeader
                    userAvatar={userAvatar}
                    username={nickname}
                    createdAt={createdAt}
                  />
                  <RenderWithSpoilers html={replyContent} />
                  <CommentActions
                    isLoggedIn={isLoggedIn}
                    openCommentEditor={() => commentEditorHandler(reply.id)}
                    editor={false}
                  />
                  {reply.id === activeId && (
                    <CommentEditor
                      parentId={reply.id}
                      titleId={titleId}
                      isLoggedIn={isLoggedIn}
                      closeEditorHandler={closeEditorHandler}
                    />
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Comment
