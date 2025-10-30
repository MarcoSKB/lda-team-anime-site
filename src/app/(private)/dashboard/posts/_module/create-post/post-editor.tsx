'use client'

import { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { Color } from '@tiptap/extension-color'
import FloatingMenuExtension from '@tiptap/extension-floating-menu'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { EditorContent, Extension, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { FloatingToolbar } from '@/components/tiptap/extensions/floating-toolbar'
import { ImageExtension } from '@/components/tiptap/extensions/image'
import { ImagePlaceholder } from '@/components/tiptap/extensions/image-placeholder'
import SearchAndReplace from '@/components/tiptap/extensions/search-and-replace'
import { EditorToolbar } from '@/components/tiptap/toolbars/editor-toolbar'

import { cn } from '@/utils/cn'

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
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
  FloatingMenuExtension.configure({
    element:
      typeof document !== 'undefined' ? document.createElement('div') : null,
  }),
]

interface Props {
  initialValue: {}
  setValue: UseFormSetValue<{
    type: number
    content: {}
    title: string
    description: string
  }>
}

const PostEditor: React.FC<Props> = ({ setValue, initialValue }) => {
  const [isReady, setIsReady] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content: initialValue,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'max-w-full focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setValue('content', editor.getJSON())
    },
    onCreate: ({ editor }) => {
      requestAnimationFrame(() => {
        if (editor && editor.view) {
          setIsReady(true)
        }
      })
    },
  })

  useEffect(() => {
    if (editor && editor.view && !editor.isDestroyed) {
      requestAnimationFrame(() => {
        if (!editor.view.hasFocus()) {
          editor.commands.focus('end')
        }
      })
    }
  }, [editor])

  useEffect(() => {
    if (editor && !isReady) setIsReady(true)
  }, [editor, isReady])

  if (!editor || !isReady) return null

  return (
    <div
      className={cn(
        'bg-card relative max-h-[calc(100dvh-6rem)] w-full overflow-hidden overflow-y-scroll rounded-md border pb-[60px] sm:pb-0',
      )}
    >
      <EditorToolbar editor={editor} />
      <FloatingToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className='min-h-[600px] w-full min-w-full cursor-text sm:p-6'
      />
    </div>
  )
}

export default PostEditor
