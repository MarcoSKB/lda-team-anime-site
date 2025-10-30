'use client'

import React from 'react'

import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'

import { MobileToolbarGroup, MobileToolbarItem } from './mobile-toolbar-group'
import { useToolbar } from './toolbar-provider'

const levels = [1, 2, 3, 4] as const

export const HeadingsToolbar = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { editor } = useToolbar()
  const isMobile = useMediaQuery('(max-width: 640px)')
  const activeLevel = levels.find((level) =>
    editor?.isActive('heading', { level }),
  )

  if (isMobile) {
    return (
      <MobileToolbarGroup label={activeLevel ? `H${activeLevel}` : 'Normal'}>
        <MobileToolbarItem
          onClick={() => editor?.chain().focus().setParagraph().run()}
          active={!editor?.isActive('heading')}
        >
          Обычный
        </MobileToolbarItem>
        {levels.map((level) => (
          <MobileToolbarItem
            key={level}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level }).run()
            }
            active={editor?.isActive('heading', { level })}
          >
            H{level}
          </MobileToolbarItem>
        ))}
      </MobileToolbarGroup>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              intent='ghost'
              size='small'
              className={cn(
                'h-8 w-max items-center justify-center gap-1 px-3 font-normal',
                editor?.isActive('heading') && 'bg-accent',
                className,
              )}
              ref={ref}
              {...props}
            >
              {activeLevel ? `H${activeLevel}` : 'Обычный'}
              <ChevronDown className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuItem
              onClick={() => editor?.chain().focus().setParagraph().run()}
              className={cn(
                'flex h-fit items-center gap-2',
                !editor?.isActive('heading') && 'bg-accent',
              )}
            >
              Обычный
            </DropdownMenuItem>
            {levels.map((level) => (
              <DropdownMenuItem
                key={level}
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level }).run()
                }
                className={cn(
                  'flex items-center gap-2',
                  editor?.isActive('heading', { level }) && 'bg-accent',
                )}
              >
                H{level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>
        <span>Заголовки</span>
      </TooltipContent>
    </Tooltip>
  )
})

HeadingsToolbar.displayName = 'HeadingsToolbar'
