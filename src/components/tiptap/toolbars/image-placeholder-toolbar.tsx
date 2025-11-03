'use client'

import React from 'react'

import { Image } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'

import { cn } from '@/utils/cn'

import { useToolbar } from './toolbar-provider'

const ImagePlaceholderToolbar = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, onClick, children, ...props }, ref) => {
  const { editor } = useToolbar()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          intent='ghost'
          size='small'
          className={cn(
            'h-8 w-8 items-center justify-center p-0 sm:h-9 sm:w-9',
            editor?.isActive('image-placeholder') && 'bg-accent',
            className,
          )}
          onClick={(e) => {
            e.preventDefault()
            editor?.chain().focus().insertImagePlaceholder().run()
            onClick?.(e)
          }}
          ref={ref}
          {...props}
        >
          {children ?? <Image height='16px' width='16px' className='h-4 w-4' />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Изображение</span>
      </TooltipContent>
    </Tooltip>
  )
})

ImagePlaceholderToolbar.displayName = 'ImagePlaceholderToolbar'

export { ImagePlaceholderToolbar }
