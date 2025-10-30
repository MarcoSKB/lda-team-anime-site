import { PosterCard } from '@/components/module'

import { getOngoingTitles } from '@/actions/anime'

const OngoingSliderList: React.FC = async () => {
  const res = await getOngoingTitles()

  if (res.type == 'error') {
    return (
      <ul className='flex gap-4'>Произошла ошибка. Повторите попытку позже!</ul>
    )
  }

  const ongoingData = res.data.results

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
