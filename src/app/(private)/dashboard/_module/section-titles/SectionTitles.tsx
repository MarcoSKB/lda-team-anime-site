import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui'

import { Statistics } from '@/types/dashboard.types'

interface Props {
  data: Statistics
}

export const SectionTitles: React.FC<Props> = ({ data }) => {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3'>
      <Card className='@container/card gap-4'>
        <CardHeader>
          <CardDescription>Всего тайтлов</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {data.totalTitles}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Общее количество добавленных тайтлов
          </div>
          <div className='text-muted-foreground'>
            Включает все доступные позиции в каталоге
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card gap-4'>
        <CardHeader>
          <CardDescription>Всего эпизодов</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {data.totalEpisodes}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Суммарное количество опубликованных эпизодов
          </div>
          <div className='text-muted-foreground'>
            Подсчёт основан на актуальных данных из базы
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
