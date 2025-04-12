import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui'

const OngoinSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      <ul className='flex flex-nowrap gap-4'>
        {[...Array(6)].map((_, idx) => (
          <li
            key={idx}
            className='bg-secondary h-[400px] min-w-[288px] animate-pulse rounded-lg'
          />
        ))}
      </ul>
      <div className='flex gap-4 self-end'>
        <Button intent='primary' disabled className='p-2.5'>
          <ArrowLeft />
        </Button>
        <Button intent='primary' disabled className='p-2.5'>
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default OngoinSkeleton
