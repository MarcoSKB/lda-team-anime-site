import { cn } from '@/utils/cn'

interface Props extends React.ComponentProps<'div'> {
  className?: string
  children: React.ReactNode
}

const Container: React.FC<Props> = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <div
      className={cn('mx-auto box-border w-full max-w-[1320px] px-4', className)}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default Container
