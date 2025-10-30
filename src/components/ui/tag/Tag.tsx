import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const tagStyle = cva('flex cursor-default', {
  variants: {
    intent: {
      default:
        'border-[#6F7787] text-foreground/80 dark:text-[#9095A1] border-solid border-1',
      primary: 'bg-white text-[#323743]',
      secondary:
        'dark:bg-[#201B20] border-1 border-solid border-[#b2b9c8] dark:border-none text-foreground/90 dark:text-[#9095A1]',
    },
    size: {
      default: 'text-[12px] py-[3px] px-2 rounded-md leading-3.5',
      large: 'text-[12px] rounded-sm',
    },
  },
  defaultVariants: {
    intent: 'default',
    size: 'default',
  },
})

interface Props
  extends React.ComponentProps<'div'>,
    VariantProps<typeof tagStyle> {
  children: React.ReactNode
}

const Tag: React.FC<Props> = (props) => {
  const { intent, size, className, children, ...otherProps } = props

  return (
    <div className={cn(tagStyle({ intent, size }), className)} {...otherProps}>
      {children}
    </div>
  )
}

export default Tag
