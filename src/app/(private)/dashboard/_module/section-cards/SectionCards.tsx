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

export const SectionCards: React.FC<Props> = ({ data }) => {
  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3'>
      <Card className='@container/card gap-4'>
        <CardHeader>
          <CardDescription>Пик пользователей</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {data.dailyMaxOnline}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Максимум пользователей за последние 24 часа
          </div>
          <div className='text-muted-foreground'>
            Значение рассчитывается по данным активности в течение дня
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card gap-4'>
        <CardHeader>
          <CardDescription>Текущие пользователи</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {data.currentOnline}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Количество пользователей онлайн в данный момент
          </div>
          <div className='text-muted-foreground'>
            Обновляется автоматически в реальном времени
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card gap-4'>
        <CardHeader>
          <CardDescription>Всего пользователей</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {data.totalUsers}
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Общее количество зарегистрированных пользователей
          </div>
          <div className='text-muted-foreground'>
            Отражает совокупное число всех аккаунтов в системе
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
