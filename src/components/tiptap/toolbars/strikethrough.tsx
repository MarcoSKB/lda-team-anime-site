'use client'

import React from 'react'

import { Strikethrough } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

import { cn } from '@/utils/cn'

import { useToolbar } from './toolbar-provider'

const StrikeThroughToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar()
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            intent='ghost'
            size='small'
            className={cn(
              'h-8 w-8 items-center justify-center p-0 sm:h-9 sm:w-9',
              editor?.isActive('strike') && 'bg-accent',
              className,
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleStrike().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleStrike().run()}
            ref={ref}
            {...props}
          >
            {children ?? <Strikethrough className='h-4 w-4' />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Зачеркнуть</span>
          <span className='text-gray-11 ml-1 text-xs'>(ctrl + shift + x)</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

StrikeThroughToolbar.displayName = 'StrikeThroughToolbar'

export { StrikeThroughToolbar }
