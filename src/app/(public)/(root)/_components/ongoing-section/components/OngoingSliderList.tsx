import { PosterCard } from '@/components/module'

import { ongoingData } from '@/data/ongoingData'

const OngoingSliderList: React.FC = () => {
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
