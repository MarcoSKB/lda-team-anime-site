import { TrackProps } from '@vidstack/react'

export const textTracksData: TrackProps[] = [
  {
    src: 'https://files.vidstack.io/sprite-fight/subs/english.vtt',
    label: 'Английский',
    language: 'en-US',
    kind: 'subtitles',
    default: true,
  },
  {
    src: 'https://files.vidstack.io/sprite-fight/subs/spanish.vtt',
    label: 'Испанский',
    language: 'es-ES',
    kind: 'subtitles',
  },
  {
    src: 'https://files.vidstack.io/sprite-fight/chapters.vtt',
    kind: 'chapters',
    language: 'ru-RU',
    default: true,
  },
] as const
