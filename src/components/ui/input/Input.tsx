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
          'rounded-md px-2.5 py-1.5 w-full transition-colors bg-secondary text-sm placeholder:text-sm text-foreground placeholder:font-thin',
        secondary:
          'rounded-md px-2.5 py-1.5 w-full transition-colors bg-background border-[#d7dbe2] dark:border-none border text-sm placeholder:text-sm text-foreground placeholder:font-thin',
      },
      withIcon: {
        true: 'pl-[40px]',
        false: '',
      },
    },
    defaultVariants: {
      intent: 'default',
      withIcon: false,
    },
  },
)

interface Props
  extends React.ComponentProps<'input'>,
    VariantProps<typeof inputStyle> {
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { intent, icon, className, type = 'text', ...otherProps } = props

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
        }),
        className,
      )}
      {...otherProps}
    />
  )
})

export default Input
