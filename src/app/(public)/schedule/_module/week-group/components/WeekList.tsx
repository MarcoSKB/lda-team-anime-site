import Image from 'next/image'

import { Transition } from '@headlessui/react'

import WeekItem from './WeekItem'

interface Props {
  isSelected: boolean
  isAppear?: boolean
  list: {
    title: string
    slug: string
    img: string
    season: number
    episode: number
  }[]
}

const WeekList: React.FC<Props> = ({ isSelected, isAppear, list }) => {
  if (list.length == 0)
    return (
      <div className='mx-auto flex w-fit flex-col flex-wrap items-center gap-2.5 rounded-lg px-3 py-2 pt-4 md:flex-row'>
        <Image
          src='/images/no-content-image.png'
          width={85}
          height={100}
          alt='Милый коричневый котик'
        />
        <span className='text-center text-[15px] md:text-base'>
          Озвучки нету, но кошка всё видит. <br />
          Она внимательно следит за студией ❤️
        </span>
      </div>
    )

  return (
    <ul>
      <Transition
        as='li'
        appear={isAppear}
        show={isSelected}
        enter='transition duration-400 ease-in-out'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition duration-400 ease-in-out'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='flex flex-wrap gap-2'
      >
        {list.map((week) => (
          <WeekItem key={week.slug} {...week} />
        ))}
      </Transition>
    </ul>
  )
}

export default WeekList
