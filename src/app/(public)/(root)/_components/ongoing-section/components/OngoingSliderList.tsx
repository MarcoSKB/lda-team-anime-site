import { getOngoingTitles } from '@/actions/anime'

import { PosterCard } from '@/components/module'

const OngoingSliderList: React.FC = async () => {
  const ongoingData = await getOngoingTitles()
  return (
    <ul className='flex gap-4'>
      {ongoingData.map((ongoingSlide) => (
        <li
          key={ongoingSlide.id}
          className='relative z-0 box-content min-h-[400px] min-w-[288px]'
        >
          <PosterCard {...ongoingSlide} />
        </li>
      ))}
    </ul>
  )
}

export default OngoingSliderList
