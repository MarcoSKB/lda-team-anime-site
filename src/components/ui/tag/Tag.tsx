import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const tagStyle = cva('flex cursor-default', {
  variants: {
    intent: {
      default: 'border-[#6F7787] text-[#9095A1] border-solid border-1',
      primary: 'bg-white text-[#323743]',
      secondary: 'bg-[#1E2128] text-[#9095A1]',
    },
    size: {
      default: 'text-[12px] py-[3px] px-2 rounded-md',
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
