'use client'

import { useState } from 'react'

import { VideoPlayer } from '@/components/module'
import { Container } from '@/components/ui'

import { AnimeEpisode, AnimeTitle } from '@/types/anime.types'
import { ASSET_BASE } from '@/utils/global-vars'

import EpisodeList from './EpisodeList'
import EpisodeNotExist from './EpisodeNotExist'
import WatchedButton from './WatchedButton'
import { usePlayerNavigation } from './hooks/usePlayerNavigation'

interface Props {
  data: AnimeTitle
}

const PlayerSection: React.FC<Props> = ({ data: animeData }) => {
  const [episode, setEpisode] = useState<AnimeEpisode>(
    animeData.episodes.sort((a, b) => a.number - b.number)[0],
  )
  const changeEpisode = (episodeData: AnimeEpisode) => {
    setEpisode(episodeData)
  }

  const {
    isNextEpAvailable,
    isPrevEpAvailable,
    onNextButtonClick,
    onPrevButtonClick,
  } = usePlayerNavigation(animeData.episodes, episode, changeEpisode)

  const imageUrl = episode.previewUrl
    ? `${episode.previewUrl}`
    : '/images/black-screen.jpg'

  return (
    <section>
      <Container className='flex flex-col'>
        <div className='bg-secondary mb-1.5 flex w-full justify-between rounded-md border border-solid border-[#b2b9c8] dark:border-none'>
          <span className='px-3 py-2 text-[#000000] dark:text-[rgba(255,255,255,0.5)]'>
            Смотреть онлайн
          </span>
          <WatchedButton titleId={animeData.id} />
        </div>
        {animeData.episodes[0].id == 'placeholder' ? (
          <EpisodeNotExist />
        ) : (
          <VideoPlayer
            title={animeData.name}
            poster={imageUrl}
            posterAlt='Постер аниме'
            src={`${ASSET_BASE}${episode.videoUrl}`}
            onNextButtonClick={onNextButtonClick}
            onPrevButtonClick={onPrevButtonClick}
            nextButtonDisabled={isNextEpAvailable}
            prevButtonDisabled={isPrevEpAvailable}
          />
        )}
        <EpisodeList
          episodeList={animeData.episodes}
          currentEpisode={episode}
          changeEpisode={changeEpisode}
        />
      </Container>
    </section>
  )
}

export default PlayerSection
