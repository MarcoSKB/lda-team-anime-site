import Image from 'next/image'

import { OngoingTitle } from '@/types/anime.types'

import { PosterCardInfo } from './components'

interface Props extends OngoingTitle {}

const PosterCard: React.FC<Props> = ({ img, ...props }) => {
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
