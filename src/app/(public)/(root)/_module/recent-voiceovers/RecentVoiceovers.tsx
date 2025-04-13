import { Suspense } from 'react'

import { VoiceoverList, VoiceoverSkeleton } from './components'

const RecentVoiceovers: React.FC = () => {
  return (
    <section className='flex grow flex-col md:w-[60%]'>
      <h2 className='text-foreground mb-2 pl-4 text-xl leading-[42px] font-bold md:mb-4 md:pl-0'>
        Последний дубляж
      </h2>
      <Suspense fallback={<VoiceoverSkeleton />}>
        <VoiceoverList />
      </Suspense>
    </section>
  )
}

export default RecentVoiceovers
