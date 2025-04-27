'use client'

import { use, useState } from 'react'

import { AnimeEpisode, AnimeEpisodes } from '@/types/anime.types'

import { VideoPlayer } from '@/components/module'
import { Container } from '@/components/ui'

import EpisodeList from './EpisodeList'

interface Props {
  fetchAnimeEpisodes: Promise<AnimeEpisodes>
}

const PlayerSection: React.FC<Props> = ({ fetchAnimeEpisodes }) => {
  const animeTitle = use(fetchAnimeEpisodes)
  const [episode, setEpisode] = useState<AnimeEpisode>(
    animeTitle.episodeList[0],
  )

  const changeEpisode = (episodeData: AnimeEpisode) => {
    setEpisode(episodeData)
  }

  return (
    <section>
      <Container className='flex flex-col'>
        <div className='bg-secondary mb-1.5 flex w-full justify-between rounded-md border-1 border-solid border-[#b2b9c8] px-3 py-2 text-[#000000] dark:border-none dark:text-[rgba(255,255,255,0.5)]'>
          Смотреть онлайн
        </div>
        <VideoPlayer
          {...episode}
          nextButtonDisabled={false}
          prevButtonDisabled={false}
        />
        <EpisodeList
          episodeList={animeTitle.episodeList}
          currentEpisode={episode.episodeNumber}
          changeEpisode={changeEpisode}
        />
      </Container>
    </section>
  )
}

export default PlayerSection
