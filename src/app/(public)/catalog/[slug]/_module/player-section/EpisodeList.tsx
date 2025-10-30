'use client'

import { useEffect } from 'react'

import { EpisodeCard } from '@/components/ui'

import { addViewEpisode } from '@/actions/anime'
import { AnimeEpisode } from '@/types/anime.types'

interface Props {
  episodeList: AnimeEpisode[]
  currentEpisode: AnimeEpisode
  changeEpisode: (episodeData: AnimeEpisode) => void
}

const EpisodeList: React.FC<Props> = ({
  episodeList,
  currentEpisode,
  changeEpisode,
}) => {
  useEffect(() => {
    if (currentEpisode.id !== 'placeholder') {
      addViewEpisode(currentEpisode.id)
    }
  }, [currentEpisode])

  return (
    <>
      <h3 className='px-4 pt-4 pb-2 text-lg font-semibold'>Выбор эпизодов</h3>
      <div className='before:from-background relative z-0 w-full before:pointer-events-none before:absolute before:top-0 before:right-0 before:h-full before:w-[40px] before:bg-gradient-to-l before:to-[rgba(255,255,255,0)] before:content-[""]'>
        <ul className='flex max-w-full snap-x snap-mandatory flex-nowrap gap-2 overflow-x-auto scroll-smooth pr-[40px]'>
          {episodeList
            .sort((a, b) => a.number - b.number)
            .map((episode) => (
              <li key={episode.id}>
                <EpisodeCard
                  changeEpisode={changeEpisode}
                  disabled={currentEpisode.number == episode.number}
                  {...episode}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default EpisodeList
