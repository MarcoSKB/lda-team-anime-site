import { AnimeEpisode } from '@/types/anime.types'

export const usePlayerNavigation = (
  episodeList: AnimeEpisode[],
  currentEpisode: AnimeEpisode,
  changeEpisode: (episodeData: AnimeEpisode) => void,
) => {
  const onNextButtonClick = () => {
    let currentEpisodeIndex = episodeList.findIndex(
      (el) => el.episodeNumber == currentEpisode.episodeNumber,
    )
    changeEpisode(episodeList[++currentEpisodeIndex])
  }
  const onPrevButtonClick = () => {
    let currentEpisodeIndex = episodeList.findIndex(
      (el) => el.episodeNumber == currentEpisode.episodeNumber,
    )
    if (currentEpisode.episodeNumber !== 1)
      changeEpisode(episodeList[--currentEpisodeIndex])
  }

  const isNextEpAvailable =
    currentEpisode.episodeNumber ==
    episodeList[episodeList.length - 1].episodeNumber
  const isPrevEpAvailable = currentEpisode.episodeNumber == 1

  return {
    onNextButtonClick,
    onPrevButtonClick,
    isNextEpAvailable,
    isPrevEpAvailable,
  }
}
