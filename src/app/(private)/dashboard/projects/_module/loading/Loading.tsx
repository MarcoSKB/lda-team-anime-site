import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'

import { Button, Skeleton } from '@/components/ui'

const loading: React.FC = () => {
  return (
    <div className='flex flex-col py-4 md:py-6'>
      <div className='mb-1 flex items-center justify-between gap-4 px-4 md:mb-2 lg:px-6'>
        <Skeleton className='h-[36px] w-full max-w-[400px]' />
        <Skeleton className='h-[42px] w-[42px]' />
      </div>
      <div className='flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <Skeleton className='h-[527px] w-full' />
        <div className='flex items-center px-4 md:justify-end'>
          <div className='flex w-full items-center gap-8 lg:w-fit'>
            <div className='hidden items-center gap-2 lg:flex'>
              <Skeleton className='hidden h-[32px] w-[310px] md:block' />
              <div className='ml-auto flex items-center gap-2 lg:ml-0'>
                <Button
                  intent='outline'
                  size='small'
                  className='border-background pointer-events-none hidden h-8 w-8 lg:flex'
                  disabled={true}
                  icon={<IconChevronsLeft width={20} height={24} />}
                >
                  <span className='sr-only'>Перейти на первую страницу</span>
                </Button>
                <Button
                  intent='outline'
                  className='border-background pointer-events-none size-8'
                  size='small'
                  disabled={true}
                  icon={<IconChevronLeft />}
                >
                  <span className='sr-only'>
                    Перейти на предыдущую страницу
                  </span>
                </Button>
                <Button
                  intent='outline'
                  className='border-background pointer-events-none size-8'
                  size='small'
                  disabled={true}
                  icon={<IconChevronRight />}
                >
                  <span className='sr-only'>Перейти к следующей странице</span>
                </Button>
                <Button
                  intent='outline'
                  className='border-background pointer-events-none hidden size-8 lg:flex'
                  size='small'
                  disabled={true}
                  icon={<IconChevronsRight width={20} height={24} />}
                >
                  <span className='sr-only'>Перейти к последней странице</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading
