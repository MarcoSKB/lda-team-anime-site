'use client'

import { useState } from 'react'

import { IconStar, IconStarFilled } from '@tabler/icons-react'
import { toast } from 'sonner'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'

import { rateAnimeTitle } from '@/actions/anime'

interface Props {
  titleId: string
  rating: number
}

const RatingButton: React.FC<Props> = ({ titleId, rating }) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const submitHandler = () => {
    if (!selected) return
    if (selected > 10 || selected < 0) return toast.error('Неправильная оценка')

    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await rateAnimeTitle(titleId, selected)
        if (res.type == 'error') {
          reject(res.message)
        }
        if (res.type == 'ok') {
          setIsOpen(false)
          resolve(res.data)
        }
      } catch (err) {
        reject(err)
      }
    })

    toast.promise(promise, {
      loading: 'Сохраняем твою оценку...',
      success: 'Оценка успешно сохранена!',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось сохранить оценку аниме.'
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className='flex h-full w-full flex-nowrap'>
        <div className='bg-secondary flex h-full w-full items-center justify-center gap-1 rounded-l-md py-2 pr-2 pl-3 text-center text-[14px] leading-[18px]'>
          Рейтинг: {rating}
        </div>
        <DialogTrigger asChild>
          <button className='bg-secondary hover:bg-accent cursor-pointer items-center justify-center rounded-r-md p-2 transition-colors ease-in-out'>
            <IconStarFilled width={20} height={20} />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className='bg-secondary sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Оценка аниме</DialogTitle>
          <DialogDescription className='text-balance'>
            Выберите, какую оценку вы хотите поставить этому аниме.
          </DialogDescription>
        </DialogHeader>
        <div className='mb-5 flex w-full justify-between py-6'>
          {[...Array(10)].map((_, idx) => {
            const starValue = idx + 1
            const isActive = hovered
              ? starValue <= hovered
              : starValue <= (selected ?? 0)

            return (
              <button
                key={idx}
                type='button'
                className='relative z-0 cursor-pointer px-1 transition-transform duration-100'
                onMouseEnter={() => setHovered(starValue)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(starValue)}
              >
                {isActive ? (
                  <IconStarFilled className='text-accent size-4 md:size-6' />
                ) : (
                  <IconStar className='text-foreground size-4 md:size-6' />
                )}
                <span className='absolute top-full left-0 z-10 w-full text-center text-[12px] text-white sm:text-sm'>
                  {++idx}
                </span>
              </button>
            )
          })}
        </div>
        <DialogFooter className='flex-row flex-nowrap justify-between'>
          <DialogClose asChild>
            <Button intent='outline'>Отмена</Button>
          </DialogClose>
          <Button intent='outline' disabled={!selected} onClick={submitHandler}>
            Оценить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RatingButton
