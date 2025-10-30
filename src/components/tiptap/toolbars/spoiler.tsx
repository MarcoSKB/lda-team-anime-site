'use client'

import React from 'react'

import { EyeOffIcon } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

import { cn } from '@/utils/cn'

import { useToolbar } from './toolbar-provider'

const SpoilerToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive('spoiler') && 'bg-accent',
              className,
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleSpoiler().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleSpoiler().run()}
            ref={ref}
            {...props}
          >
            {children ?? <EyeOffIcon className='h-4 w-4' />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Спойлер</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

SpoilerToolbar.displayName = 'SpoilerToolbar'

export { SpoilerToolbar }
