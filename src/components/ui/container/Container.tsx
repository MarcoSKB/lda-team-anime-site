import { cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

interface Props {
  className?: string
  children: React.ReactNode
}

const Container: React.FC<Props> = (props) => {
  const { className, children } = props

  return (
    <div
      className={cn('mx-auto box-border w-full max-w-[1320px] px-4', className)}
    >
      {children}
    </div>
  )
}

export default Container
