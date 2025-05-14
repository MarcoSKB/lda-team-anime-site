'use client'

import { forwardRef } from 'react'

import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonStyle = cva('flex cursor-pointer active:hover:scale-90 ease-out', {
  variants: {
    intent: {
      default:
        'rounded-md bg-transparent px-2 py-2 transition-colors hover:bg-secondary',
      primary:
        'hover:bg-accent rounded-md bg-secondary text-white dark:text-foreground transition-all disabled:pointer-events-none hover:text-foreground disabled:hover:bg-secondary disabled:bg-background',
      secondary:
        'hover:bg-foreground hover:text-background rounded-md bg-secondary text-foreground transition-all',
      outline:
        'hover:bg-foreground hover:text-background border-foreground border-1 border-solid rounded-md bg-secondary text-foreground transition-all',
    },
    size: {
      small: 'text-[12px] px-2 py-2',
      default: 'text-sm px-3 py-2',
      large: 'text-base px-4 py-2',
    },
    withIcon: {
      true: 'gap-2 items-center',
      false: '',
    },
  },
  defaultVariants: {
    intent: 'default',
    size: 'default',
    withIcon: false,
  },
})

interface Props
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonStyle> {
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    intent,
    size,
    icon,
    className,
    type = 'button',
    children,
    ...otherProps
  } = props

  return (
    <button
      className={cn(
        buttonStyle({
          intent,
          size,
          withIcon: Boolean(icon),
        }),
        className,
      )}
      type={type}
      ref={ref}
      {...otherProps}
    >
      {Boolean(icon) && icon}
      {children}
    </button>
  )
})

export default Button
