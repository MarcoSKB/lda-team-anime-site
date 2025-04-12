import { Suspense } from 'react'

import { VoiceoverList, VoiceoverSkeleton } from './components'

const RecentVoiceovers: React.FC = () => {
  return (
    <>
      <h2 className='text-foreground mb-2 text-xl leading-[42px] font-bold md:mb-4'>
        Последний дубляж
      </h2>
      <Suspense fallback={<VoiceoverSkeleton />}>
        <VoiceoverList />
      </Suspense>
    </>
  )
}

export default RecentVoiceovers
