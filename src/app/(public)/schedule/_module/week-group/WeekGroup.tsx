'use client'

import { use, useState } from 'react'

import { AnimeScheduleList } from '@/types/anime.types'
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from '@headlessui/react'

import { WeekList } from './components'

const weekList = [
  'Неделя',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресение',
]

interface Props {
  fetchSceduleList: Promise<AnimeScheduleList>
}

const WeekGroup: React.FC<Props> = ({ fetchSceduleList }) => {
  const scheduleList = use(fetchSceduleList)
  const [selectedIndex, setSelectedIndex] = useState(new Date().getDay())

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <TabList className='dark:bg-secondary mx-auto mb-3 flex w-fit flex-wrap justify-center gap-y-1 rounded-xl border-1 border-solid border-[#e2e7f1] p-2 md:mb-4 md:gap-2 dark:border-none'>
        {weekList.map((week) => (
          <Tab
            key={week}
            className='data-hover:text-accent text-foreground dark:data-selected:text-foreground dark:data-selected:data-hover:text-foreground data-selected:bg-accent cursor-pointer rounded-lg px-3 py-1 text-sm leading-6 transition-colors ease-in-out outline-none data-focus:outline-black data-focus:outline-solid data-selected:cursor-default data-selected:text-white data-selected:data-hover:text-white md:text-base dark:data-focus:outline-white'
          >
            {week}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Transition
            as='div'
            appear={true}
            show={selectedIndex == 0}
            enter='transition duration-400 ease-in-out'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition duration-400 ease-in-out'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            className='flex flex-col gap-8'
          >
            {Object.keys(scheduleList).map((weekName, idx) => {
              const key = weekName as keyof AnimeScheduleList
              if (scheduleList[key].length == 0) return null

              return (
                <div key={key} className='flex flex-col'>
                  <div className='mb-4 flex w-full items-center gap-2'>
                    <span className='text-foreground mb-1 text-xl font-semibold opacity-90'>
                      {weekList[++idx]}
                    </span>
                    <hr className='border-secondary bg-secondary flex h-[3px] w-full self-center' />
                  </div>
                  <WeekList isSelected={true} list={scheduleList[key]} />
                </div>
              )
            })}
          </Transition>
        </TabPanel>
        {Object.keys(scheduleList).map((weekName, idx) => {
          const key = weekName as keyof AnimeScheduleList
          return (
            <TabPanel key={key}>
              <WeekList
                isSelected={selectedIndex == ++idx}
                isAppear={true}
                list={scheduleList[key]}
              />
            </TabPanel>
          )
        })}
      </TabPanels>
    </TabGroup>
  )
}

export default WeekGroup
