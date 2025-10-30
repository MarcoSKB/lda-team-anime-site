import { AnimeEpisode } from '@/types/anime.types'

export const usePlayerNavigation = (
  episodeList: AnimeEpisode[],
  currentEpisode: AnimeEpisode,
  changeEpisode: (episodeData: AnimeEpisode) => void,
) => {
  const onNextButtonClick = () => {
    let currentEpisodeIndex = episodeList.findIndex(
      (el) => el.number == currentEpisode.number,
    )
    changeEpisode(episodeList[++currentEpisodeIndex])
  }
  const onPrevButtonClick = () => {
    let currentEpisodeIndex = episodeList.findIndex(
      (el) => el.number == currentEpisode.number,
    )
    if (currentEpisode.number !== 1)
      changeEpisode(episodeList[--currentEpisodeIndex])
  }

  const isNextEpAvailable =
    currentEpisode.number == episodeList[episodeList.length - 1].number
  const isPrevEpAvailable = currentEpisode.number == 1

  return {
    onNextButtonClick,
    onPrevButtonClick,
    isNextEpAvailable,
    isPrevEpAvailable,
  }
}
