import Link from 'next/link'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const linkStyle = cva('flex', {
  variants: {
    intent: {
      default: 'text-background bg-foreground',
      primary: 'text-foreground bg-secondary',
      secondary:
        'text-foreground bg-transparent hover:text-accent transition-colors',
    },
    size: {
      small: 'text-sm py-2 px-2 rounded-sm',
      default: 'text-base py-2 px-5 rounded-md',
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

interface Props extends VariantProps<typeof linkStyle> {
  icon?: React.ReactNode
  href: string
  className?: string
  title?: string
  children: React.ReactNode
}

const LinkButton: React.FC<Props> = (props) => {
  const { icon, href, intent, size, className, title, children } = props

  return (
    <Link
      href={href}
      title={title}
      className={cn(
        linkStyle({
          intent,
          size,
          withIcon: Boolean(icon),
        }),
        className,
      )}
    >
      {Boolean(icon) && icon}
      {children}
    </Link>
  )
}

export default LinkButton
