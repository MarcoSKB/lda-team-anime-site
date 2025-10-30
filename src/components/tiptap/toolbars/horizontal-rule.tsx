'use client'

import React from 'react'

import { SeparatorHorizontal } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

import { cn } from '@/utils/cn'

import { useToolbar } from './toolbar-provider'

const HorizontalRuleToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.chain().focus().setHorizontalRule().run()
              onClick?.(e)
            }}
            ref={ref}
            {...props}
          >
            {children ?? <SeparatorHorizontal className='h-4 w-4' />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Горизонтальная линейка</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

HorizontalRuleToolbar.displayName = 'HorizontalRuleToolbar'

export { HorizontalRuleToolbar }
