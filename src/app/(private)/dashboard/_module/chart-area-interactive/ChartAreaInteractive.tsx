'use client'

import * as React from 'react'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui'

import { useIsMobile } from '@/hooks/use-mobile'
import { OnlineGraph } from '@/types/dashboard.types'
import { cn } from '@/utils/cn'

export const description = 'Интерактивный график с данными о посетителях'

const chartConfig = {
  visitors: {
    label: 'Посетители',
  },
  online: {
    label: 'Online',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface Props {
  data: OnlineGraph
}

export const ChartAreaInteractive: React.FC<Props> = ({ data }) => {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState('90d')

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  const filteredData = data.data.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Общее количество посетителей</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Итого за последние 3 месяца
          </span>
          <span className='@[540px]/card:hidden'>Последние 3 месяца</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type='single'
            value={timeRange}
            onValueChange={setTimeRange}
            variant='outline'
            className='hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'
          >
            <ToggleGroupItem
              value='90d'
              className={cn(
                'dark:border-foreground/10 cursor-pointer border-black/20 transition-all',
                timeRange == '90d' && 'pointer-events-none cursor-default',
              )}
            >
              3 месяца
            </ToggleGroupItem>
            <ToggleGroupItem
              value='30d'
              className={cn(
                'dark:border-foreground/10 cursor-pointer border-black/20 transition-all',
                timeRange == '30d' && 'pointer-events-none cursor-default',
              )}
            >
              30 дней
            </ToggleGroupItem>
            <ToggleGroupItem
              value='7d'
              className={cn(
                'dark:border-foreground/10 cursor-pointer border-black/20 transition-all',
                timeRange == '7d' && 'pointer-events-none cursor-default',
              )}
            >
              7 дней
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className='flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
              size='sm'
              aria-label='Выберите значение'
            >
              <SelectValue placeholder='Last 3 months' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='90d' className='rounded-lg'>
                Последние 3 месяца
              </SelectItem>
              <SelectItem value='30d' className='rounded-lg'>
                Последние 30 дней
              </SelectItem>
              <SelectItem value='7d' className='rounded-lg'>
                Последние 7 дней
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-online)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-online)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('ru-Ru', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('ru-Ru', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='maxOnline'
              type='natural'
              fill='url(#fillDesktop)'
              stroke='var(--color-online)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
