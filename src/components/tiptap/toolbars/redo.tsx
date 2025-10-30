'use client'

import React from 'react'

import { Redo2 } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

import { cn } from '@/utils/cn'

import { useToolbar } from './toolbar-provider'

const RedoToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              className,
            )}
            onClick={(e) => {
              editor?.chain().focus().redo().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().redo().run()}
            ref={ref}
            {...props}
          >
            {children ?? <Redo2 className='h-4 w-4' />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Вернуть</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

RedoToolbar.displayName = 'RedoToolbar'

export { RedoToolbar }
