'use client'

import React from 'react'

import { BoldIcon } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

import { cn } from '@/utils/cn'

import { useToolbar } from './toolbar-provider'

// import type { Extension } from "@tiptap/core";
// import type { StarterKitOptions } from "@tiptap/starter-kit";

// type StarterKitExtensions = Extension<StarterKitOptions>;

const BoldToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
              editor?.isActive('bold') && 'bg-accent',
              className,
            )}
            onClick={(e) => {
              editor?.chain().focus().toggleBold().run()
              onClick?.(e)
            }}
            disabled={!editor?.can().chain().focus().toggleBold().run()}
            ref={ref}
            {...props}
          >
            {children ?? <BoldIcon className='h-4 w-4' />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Жирный</span>
          <span className='text-gray-11 ml-1 text-xs'>(ctrl + b)</span>
        </TooltipContent>
      </Tooltip>
    )
  },
)

BoldToolbar.displayName = 'BoldToolbar'

export { BoldToolbar }
