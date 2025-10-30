import { getRecentVoiceover } from '@/actions/anime'

import VoiceoverCard from './VoiceoverCard'

const VoiceoverList: React.FC = async () => {
  const res = await getRecentVoiceover()

  if (res.type == 'error') {
    return 'Произошла какая то ошибка'
  }
  const recentVoiceoverData = res.data.results

  return (
    <ul className='flex max-w-full snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth px-2 md:snap-none md:flex-col md:gap-4 md:overflow-auto md:scroll-auto md:px-0'>
      {recentVoiceoverData.map((item) => (
        <VoiceoverCard
          key={item.id}
          id={item.id}
          slug={item.slug}
          title={item.name}
          description={item.description}
          img={item.poster?.url ?? '/images/placeholder-image.jpg'}
          createdAt={item.createdAt}
          episode={item.episodesTotal}
          tags={item.genres.map((genre) => genre.name)}
        />
      ))}
    </ul>
  )
}

export default VoiceoverList
