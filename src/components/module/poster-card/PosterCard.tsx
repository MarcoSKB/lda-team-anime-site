import Image from 'next/image'

import { ShortAnimeTitle } from '@/types/anime.types'

import { PosterCardInfo } from './components'

interface Props extends ShortAnimeTitle {}

const PosterCard: React.FC<Props> = ({ poster, ...props }) => {
  const img = poster?.url ?? '/images/placeholder-image.jpg'

  return (
    <div className='group relative z-1 h-full w-full overflow-hidden rounded-lg'>
      <PosterCardInfo {...props} />
      <Image
        fill
        src={img}
        className='z-0 h-full w-full object-cover'
        alt='Аниме постер'
        sizes='288px'
      />
    </div>
  )
}

export default PosterCard
