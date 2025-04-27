'use client'

import Image from 'next/image'

import { AnimeEpisode } from '@/types/anime.types'

interface Props extends AnimeEpisode {
  disabled: boolean
  changeEpisode: (episodeData: AnimeEpisode) => void
}

const EpisodeCard: React.FC<Props> = (props) => {
  const { disabled, changeEpisode, ...episode } = props
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={() => changeEpisode(episode)}
      className='group hover:border-accent disabled:bg-secondary dark:disabled:border-secondary disabled:border-accent flex w-[180px] cursor-pointer snap-start flex-col items-start gap-1.5 rounded-md border-2 border-solid border-[rgba(0,0,0,0.3)] p-2 transition ease-in-out disabled:pointer-events-none disabled:cursor-default dark:border-[rgba(255,255,255,0.1)]'
    >
      <Image
        src={episode.poster}
        width={108}
        height={60}
        alt={episode.posterAlt}
        className='w-full rounded-md'
      />
      <span className='group-hover:text-accent text-sm transition ease-in-out'>
        {episode.episodeNumber} Эпизод
      </span>
    </button>
  )
}

export default EpisodeCard
