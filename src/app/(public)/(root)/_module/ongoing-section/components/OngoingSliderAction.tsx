'use client'

import { memo } from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui'

interface Props {
  scrollPrev: () => void
  scrollNext: () => void
}

const SliderActions: React.FC<Props> = memo((props) => {
  const { scrollPrev, scrollNext } = props

  return (
    <div className='flex gap-4 self-end'>
      <Button
        intent='primary'
        onClick={() => scrollPrev()}
        className='hover:border-accent border-1 border-solid border-[rgba(0,0,0,0.3)] p-2.5 hover:text-white dark:border-none'
      >
        <ArrowLeft />
      </Button>
      <Button
        intent='primary'
        onClick={() => scrollNext()}
        className='hover:border-accent border-1 border-solid border-[rgba(0,0,0,0.3)] p-2.5 hover:text-white dark:border-none'
      >
        <ArrowRight />
      </Button>
    </div>
  )
})

export default SliderActions
