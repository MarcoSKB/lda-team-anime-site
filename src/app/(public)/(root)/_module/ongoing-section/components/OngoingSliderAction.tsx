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
      <Button intent='primary' onClick={() => scrollPrev()} className='p-2.5'>
        <ArrowLeft />
      </Button>
      <Button intent='primary' onClick={() => scrollNext()} className='p-2.5'>
        <ArrowRight />
      </Button>
    </div>
  )
})

export default SliderActions
