import { getRecentVoiceover } from '@/actions/anime'

import VoiceoverCard from './VoiceoverCard'

const VoiceoverList: React.FC = async () => {
  const recentVoiceoverData = await getRecentVoiceover()
  return (
    <ul className='flex flex-col gap-2 md:w-1/2 md:gap-4'>
      {recentVoiceoverData.map((item) => (
        <VoiceoverCard key={item.id} {...item} />
      ))}
    </ul>
  )
}

export default VoiceoverList
