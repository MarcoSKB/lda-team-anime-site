'use client'

import { FieldErrors, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { TextStyle } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, type Extension, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { toast } from 'sonner'

import { Spoiler } from '@/components/tiptap/extensions/spoiler-text'
import { Button } from '@/components/ui'

import { sendComment } from '@/actions/comment'
import { AnimeCommentType, animeCommentSchema } from '@/schemas/anime.schema'
import { cn } from '@/utils/cn'

import { EditorToolbar } from './editor-toolbar'

const extensions = [
  StarterKit.configure({
    blockquote: false,
    bulletList: false,
    code: false,
    codeBlock: false,
    dropcursor: false,
    gapcursor: false,
    hardBreak: false,
    heading: false,
    horizontalRule: false,
    listItem: false,
    orderedList: false,
    strike: false,
    listKeymap: false,
    trailingNode: false,
  }),
  TextStyle,
  Underline,
  Spoiler,
]

interface Props {
  titleId: string
  parentId?: string
  isLoggedIn: boolean
  closeEditorHandler?: () => void
}

const CommentEditor: React.FC<Props> = ({
  titleId,
  parentId,
  isLoggedIn,
  closeEditorHandler = () => {},
}) => {
  const form = useForm<AnimeCommentType>({
    resolver: yupResolver(
      animeCommentSchema,
    ) as unknown as Resolver<AnimeCommentType>,
    defaultValues: { comment: {} },
  })

  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    editorProps: {
      handlePaste(view, event) {
        const text = event.clipboardData?.getData('text/plain') ?? ''
        const single = text.replace(/\r?\n+/g, ' ')
        const { state, dispatch } = view
        dispatch(
          state.tr
            .replaceSelectionWith(state.schema.text(single))
            .scrollIntoView(),
        )
        event.preventDefault()
        return true
      },
      attributes: {
        class:
          'max-w-full focus:outline-none font-[--font-inter] min-h-[200px]',
        spellcheck: 'false',
      },
    },
    onUpdate: ({ editor }) => {
      form.setValue('comment', editor.getJSON())
    },
  })

  if (!editor) return null

  const onSubmit: SubmitHandler<AnimeCommentType> = async (data) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await sendComment({
          text: JSON.stringify(data.comment),
          createdAt: new Date().toISOString(),
          titleId: titleId,
          parentId,
        })
        if (res.type == 'error') {
          reject(res.message)
        }
        if (res.type == 'ok') {
          closeEditorHandler()
          form.reset({ comment: '' })
          editor.commands.clearContent()
          resolve(res.data)
        }
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Отправка комментарии...',
      success: 'Комментарии успешно отправлен',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось отправить комментарии'
      },
    })

    try {
      await promise
    } catch {}
  }

  const onInvalid = (errors: FieldErrors<AnimeCommentType>) => {
    if (errors.comment?.message) {
      toast.error(errors.comment.message)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      className={cn(
        'relative z-0',
        !isLoggedIn &&
          'pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:flex before:h-full before:w-full before:items-center before:justify-center before:rounded-md before:bg-black/50 before:px-4 before:text-center before:text-sm before:text-white before:content-["Пожалуйста,_войдите_в_систему,_чтобы_прокомментировать"] md:before:text-base',
      )}
    >
      <div
        className={cn(
          'bg-card relative z-0 max-h-[252px] min-h-[252px] w-full overflow-hidden overflow-y-scroll rounded-md border sm:pb-0',
        )}
      >
        <EditorToolbar editor={editor} />
        <EditorContent
          editor={editor}
          className='editor-comment min-h-[200px] w-full min-w-full cursor-text sm:p-1 [&_p]:m-0'
        />
      </div>
      <Button
        type='submit'
        intent='outline'
        className='absolute right-[6px] bottom-[6px]'
      >
        Отправить
      </Button>
    </form>
  )
}

export default CommentEditor
