'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { Editor } from '@tiptap/core'
import { FloatingMenu } from '@tiptap/react/menus'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ChevronRight,
  Code2,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  TextQuote,
} from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui'
import { ScrollArea } from '@/components/ui/scroll-area/scrollArea'

import useDebounce from '@/hooks/useDebounce'
import { cn } from '@/utils/cn'

interface CommandItemType {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  keywords: string
  command: (editor: Editor) => void
  group: string
}

type CommandGroupType = {
  group: string
  items: Omit<CommandItemType, 'group'>[]
}

const groups: CommandGroupType[] = [
  {
    group: 'Основные блоки',
    items: [
      {
        title: 'Обычный текст',
        description: 'Просто начните писать обычным текстом',
        icon: ChevronRight,
        keywords: 'paragraph text',
        command: (editor) => editor.chain().focus().clearNodes().run(),
      },
      {
        title: 'Заголовок 1',
        description: 'Большой заголовок',
        icon: Heading1,
        keywords: 'h1 title header',
        command: (editor) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        title: 'Заголовок 2',
        description: 'Средний заголовок',
        icon: Heading2,
        keywords: 'h2 subtitle',
        command: (editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        title: 'Заголовок 3',
        description: 'Небольшой заголовок',
        icon: Heading3,
        keywords: 'h3 subheader',
        command: (editor) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
      {
        title: 'Маркированный список',
        description: 'Создайте простой маркированный список',
        icon: List,
        keywords: 'unordered ul bullets',
        command: (editor) => editor.chain().focus().toggleBulletList().run(),
      },
      {
        title: 'Нумерованный список',
        description: 'Создайте упорядоченный список',
        icon: ListOrdered,
        keywords: 'numbered ol',
        command: (editor) => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        title: 'Блок кода',
        description: 'Захват фрагмент кода',
        icon: Code2,
        keywords: 'code snippet pre',
        command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
      },
      {
        title: 'Изображение',
        description: 'Вставка изображения',
        icon: ImageIcon,
        keywords: 'image picture photo',
        command: (editor) =>
          editor.chain().focus().insertImagePlaceholder().run(),
      },
      {
        title: 'Горизонтальная линейка',
        description: 'Добавьте горизонтальный разделитель',
        icon: Minus,
        keywords: 'horizontal rule divider',
        command: (editor) => editor.chain().focus().setHorizontalRule().run(),
      },
    ],
  },
  {
    group: 'Встраиваемый',
    items: [
      {
        title: 'Цитата',
        description: 'Запишите цитату',
        icon: Quote,
        keywords: 'blockquote cite',
        command: (editor) => editor.chain().focus().toggleBlockquote().run(),
      },
      {
        title: 'Код',
        description: 'Фрагмент встроенного кода',
        icon: CodeSquare,
        keywords: 'code inline',
        command: (editor) => editor.chain().focus().toggleCode().run(),
      },
      {
        title: 'Блок цитаты',
        description: 'Блок цитаты',
        icon: TextQuote,
        keywords: 'blockquote quote',
        command: (editor) => editor.chain().focus().toggleBlockquote().run(),
      },
    ],
  },
  {
    group: 'Выравнивание',
    items: [
      {
        title: 'Выровнять по левому краю',
        description: 'Выровнять текст по левому краю',
        icon: AlignLeft,
        keywords: 'align left',
        command: (editor) => editor.chain().focus().setTextAlign('left').run(),
      },
      {
        title: 'Выровнять по центру',
        description: 'Выровнять текст по центру',
        icon: AlignCenter,
        keywords: 'align center',
        command: (editor) =>
          editor.chain().focus().setTextAlign('center').run(),
      },
      {
        title: 'Выровнять по правому краю',
        description: 'Выровнять текст по правому краю',
        icon: AlignRight,
        keywords: 'align right',
        command: (editor) => editor.chain().focus().setTextAlign('right').run(),
      },
    ],
  },
]

export const TipTapFloatingMenu = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const commandRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const filteredGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              item.title
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()) ||
              item.keywords
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [debouncedSearch],
  )

  const flatFilteredItems = useMemo(
    () => filteredGroups.flatMap((g) => g.items),
    [filteredGroups],
  )

  const executeCommand = useCallback(
    (commandFn: (editor: Editor) => void) => {
      if (!editor) return

      try {
        const { from } = editor.state.selection
        const slashCommandLength = search.length + 1

        editor
          .chain()
          .focus()
          .deleteRange({
            from: Math.max(0, from - slashCommandLength),
            to: from,
          })
          .run()

        commandFn(editor)
      } catch (error) {
        console.error('Error executing command:', error)
      } finally {
        setIsOpen(false)
        setSearch('')
        setSelectedIndex(-1)
      }
    },
    [editor, search],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !editor) return

      const preventDefault = () => {
        e.preventDefault()
        e.stopImmediatePropagation()
      }

      switch (e.key) {
        case 'ArrowDown':
          preventDefault()
          setSelectedIndex((prev) => {
            if (prev === -1) return 0
            return prev < flatFilteredItems.length - 1 ? prev + 1 : 0
          })
          break

        case 'ArrowUp':
          preventDefault()
          setSelectedIndex((prev) => {
            if (prev === -1) return flatFilteredItems.length - 1
            return prev > 0 ? prev - 1 : flatFilteredItems.length - 1
          })
          break

        case 'Enter':
          preventDefault()
          const targetIndex = selectedIndex === -1 ? 0 : selectedIndex
          if (flatFilteredItems[targetIndex]) {
            executeCommand(flatFilteredItems[targetIndex].command)
          }
          break

        case 'Escape':
          preventDefault()
          setIsOpen(false)
          setSelectedIndex(-1)
          break
      }
    },
    [isOpen, selectedIndex, flatFilteredItems, executeCommand, editor],
  )

  useEffect(() => {
    if (!editor?.options.element) return

    const element = editor.options.element
    const editorElement =
      element instanceof HTMLElement
        ? element
        : 'mount' in element
          ? element.mount
          : null

    if (!editorElement) return
    const handleEditorKeyDown = (e: Event) => handleKeyDown(e as KeyboardEvent)

    editorElement.addEventListener('keydown', handleEditorKeyDown)
    return () =>
      editorElement.removeEventListener('keydown', handleEditorKeyDown)
  }, [handleKeyDown, editor])

  // Add new effect for resetting selectedIndex
  useEffect(() => {
    setSelectedIndex(-1)
  }, [search])

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.focus()
    }
  }, [selectedIndex])

  useEffect(() => {
    if (!editor) return

    const handleTransaction = () => {
      const { state } = editor
      const { $from } = state.selection

      const currentLineText = $from.parent.textBetween(
        0,
        $from.parentOffset,
        '\n',
        ' ',
      )

      const isSlashCommand =
        currentLineText.startsWith('/') &&
        $from.parent.type.name !== 'codeBlock' &&
        $from.parentOffset === currentLineText.length

      if (!isSlashCommand) {
        if (isOpen) setIsOpen(false)
        return
      }

      const query = currentLineText.slice(1).trim()
      if (query !== search) setSearch(query)
      if (!isOpen) setIsOpen(true)
    }

    editor.on('transaction', handleTransaction)
    return () => {
      editor.off('transaction', handleTransaction)
    }
  }, [editor, isOpen, search])

  return (
    <FloatingMenu
      editor={editor}
      shouldShow={({ state }) => {
        if (!editor) return false

        const { $from } = state.selection
        const currentLineText = $from.parent.textBetween(
          0,
          $from.parentOffset,
          '\n',
          ' ',
        )

        return (
          currentLineText.startsWith('/') &&
          $from.parent.type.name !== 'codeBlock' &&
          $from.parentOffset === currentLineText.length
        )
      }}
      options={{
        placement: 'bottom-start',
        onHide: () => {
          setIsOpen(false)
          setSelectedIndex(-1)
        },
      }}
    >
      <Command
        role='listbox'
        ref={commandRef}
        className='bg-popover z-50 w-72 overflow-hidden rounded-lg border shadow-lg'
      >
        <ScrollArea className='max-h-[330px]'>
          <CommandList>
            <CommandEmpty className='text-muted-foreground py-3 text-center text-sm'>
              Никаких результатов найдено не было
            </CommandEmpty>

            {filteredGroups.map((group, groupIndex) => (
              <CommandGroup
                key={`${group.group}-${groupIndex}`}
                heading={
                  <div className='text-muted-foreground px-2 py-1.5 text-xs font-medium'>
                    {group.group}
                  </div>
                }
              >
                {group.items.map((item, itemIndex) => {
                  const flatIndex =
                    filteredGroups
                      .slice(0, groupIndex)
                      .reduce((acc, g) => acc + g.items.length, 0) + itemIndex

                  return (
                    <CommandItem
                      role='option'
                      key={`${group.group}-${item.title}-${itemIndex}`}
                      value={`${group.group}-${item.title}`}
                      onSelect={() => executeCommand(item.command)}
                      className={cn(
                        'aria-selected:bg-accent/50 gap-3',
                        flatIndex === selectedIndex ? 'bg-accent/50' : '',
                      )}
                      aria-selected={flatIndex === selectedIndex}
                      ref={(el) => {
                        itemRefs.current[flatIndex] = el
                      }}
                      tabIndex={flatIndex === selectedIndex ? 0 : -1}
                    >
                      <div className='bg-background flex h-9 w-9 items-center justify-center rounded-md border'>
                        <item.icon className='h-4 w-4' />
                      </div>
                      <div className='flex flex-1 flex-col'>
                        <span className='text-sm font-medium'>
                          {item.title}
                        </span>
                        <span className='text-muted-foreground text-xs'>
                          {item.description}
                        </span>
                      </div>
                      <kbd className='bg-muted text-muted-foreground ml-auto flex h-5 items-center rounded px-1.5 text-xs'>
                        ↵
                      </kbd>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </ScrollArea>
      </Command>
    </FloatingMenu>
  )
}
