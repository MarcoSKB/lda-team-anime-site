import { forwardRef } from 'react'

import { Input as InputHeadless } from '@headlessui/react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const inputStyle = cva(
  'data-focus:outline-2 data-focus:outline-accent outline-transparent font-[Inter] placeholder:font-[Inter]',
  {
    variants: {
      intent: {
        default:
          'rounded-md w-full transition-colors bg-secondary text-foreground placeholder:font-thin',
        secondary:
          'rounded-md w-full transition-colors bg-background border-[#d7dbe2] dark:border-none border text-sm placeholder:text-sm text-foreground placeholder:font-thin',
      },
      size: {
        default: 'text-sm px-2.5 py-1.5 placeholder:text-sm',
        large: 'text-base px-3 py-2 placeholder:text-base',
      },
      withIcon: {
        true: 'pl-[40px]',
        false: '',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'default',
      withIcon: false,
    },
  },
)

interface Props
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputStyle> {
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { intent, size, icon, className, type = 'text', ...otherProps } = props

  if (icon) {
    return (
      <div className='relative z-0 flex flex-1'>
        {Boolean(icon) && icon}
        <InputHeadless
          ref={ref}
          type={type}
          className={cn(
            inputStyle({
              intent,
              size,
              withIcon: Boolean(icon),
            }),
            className,
          )}
          {...otherProps}
        />
      </div>
    )
  }

  return (
    <InputHeadless
      ref={ref}
      type={type}
      className={cn(
        inputStyle({
          intent,
          size,
        }),
        className,
      )}
      {...otherProps}
    />
  )
})

export default Input
