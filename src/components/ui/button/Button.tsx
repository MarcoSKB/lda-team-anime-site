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
        'hover:bg-foreground hover:text-background rounded-md bg-secondary text-foreground transition-all disabled:hover:bg-secondary disabled:bg-background disabled:pointer-events-none',
      outline:
        'hover:bg-foreground hover:text-background border-foreground/20 border-1 border-solid rounded-md bg-secondary text-foreground transition-all',
      destructive:
        'bg-destructive text-white shadow-xs hover:bg-destructive/90 rounded-md focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
      ghost:
        'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md',
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

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonStyle> {
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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

export { Button, buttonStyle, type ButtonProps }
