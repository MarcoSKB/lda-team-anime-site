import { getRecentVoiceover } from '@/actions/anime'

import VoiceoverCard from './VoiceoverCard'

const VoiceoverList: React.FC = async () => {
  const recentVoiceoverData = await getRecentVoiceover()
  return (
    <ul className='flex max-w-full snap-x snap-mandatory gap-2 overflow-x-scroll scroll-smooth px-2 md:snap-none md:flex-col md:gap-4 md:overflow-auto md:scroll-auto md:px-0'>
      {recentVoiceoverData.map((item) => (
        <VoiceoverCard key={item.id} {...item} />
      ))}
    </ul>
  )
}

export default VoiceoverList
