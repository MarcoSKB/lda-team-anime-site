'use client'

import Image from 'next/image'

import {
  Captions,
  Controls,
  Gesture,
  MediaPlayer,
  MediaProvider,
  Poster,
  Time as TimeVidStack,
  Track,
  TrackProps,
} from '@vidstack/react'
import '@vidstack/react/player/styles/base.css'

import {
  BufferingIndicator,
  Caption,
  Fullscreen,
  Mute,
  NextButton,
  Play,
  PrevButton,
  SeekButton,
  Settings,
  Time,
  Volume,
} from './components'
import captionStyles from './control-captions.module.css'
import styles from './control-layout.module.css'

interface Props {
  title: string
  src: string
  poster: string
  posterAlt: string
  trackList: TrackProps[]
  thumbnails: string
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
  prevButtonDisabled?: boolean
  nextButtonDisabled?: boolean
}

const VideoPlayer: React.FC<Props> = (props) => {
  const {
    title,
    src,
    poster,
    posterAlt,
    trackList,
    thumbnails,
    onPrevButtonClick,
    onNextButtonClick,
    prevButtonDisabled,
    nextButtonDisabled,
  } = props

  return (
    <MediaPlayer
      viewType='video'
      aspectRatio='16/9'
      storage='storage-key'
      playsInline
      title={title}
      src={src}
      className='ring-media-focus relative z-0 aspect-video w-full overflow-hidden rounded-md bg-black object-contain font-sans text-white data-[focus]:ring-4'
    >
      <MediaProvider>
        <Poster asChild>
          <Image
            fill
            src={poster}
            alt={posterAlt}
            className='absolute inset-0 block h-full w-full rounded-md object-cover opacity-0 transition-opacity data-[visible]:opacity-100'
          />
        </Poster>
        {trackList.map((track) => (
          <Track {...track} key={track.src} />
        ))}
      </MediaProvider>
      <BufferingIndicator />
      <Gesture />
      <Captions
        className={`${captionStyles.captions} media-preview:opacity-0 media-controls:bottom-[90px] media-captions:opacity-100 absolute inset-0 bottom-2 z-10 break-words opacity-0 transition-[opacity,bottom] duration-300 select-none`}
      />
      <Controls.Root
        className={`${styles.controls} media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity`}
      >
        <Controls.Group className='flex-1'>
          <div className='media-buffering:opacity-0 media-buffering:pointer-events-none absolute top-1/2 left-1/2 z-0 hidden -translate-1/2 items-center justify-center gap-3 md:flex'>
            <SeekButton type='backward' tooltipPlacement='top center' />
            <Play tooltipPlacement='top center' />
            <SeekButton type='forward' tooltipPlacement='top center' />
          </div>
        </Controls.Group>
        <Controls.Group className='flex flex-col gap-0.5 px-0 pb-0 md:px-4 md:pb-3'>
          <div className='flex w-full items-center rounded-t-lg bg-[rgba(0,0,0,0.5)] px-1.5 md:px-2'>
            <div className='flex flex-1 items-center'>
              <Mute tooltipPlacement='top start' />
              <Volume />
            </div>
            <div className='flex flex-1 items-center justify-center md:gap-1'>
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevButtonDisabled}
              />
              <Play tooltipPlacement='top center' />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextButtonDisabled}
              />
            </div>
            <div className='flex flex-1 items-center justify-end md:gap-0.5'>
              <Caption tooltipPlacement='top' />
              <Settings placement='top end' tooltipPlacement='top' />
              <Fullscreen tooltipPlacement='top end' />
            </div>
          </div>
          <div className='flex w-full items-center rounded-b-lg bg-[rgba(0,0,0,0.5)] px-3 font-[Inter] text-sm'>
            <TimeVidStack className='time min-w-[32px]' type='current' />
            <Time thumbnails={thumbnails} />
            <TimeVidStack className='time min-w-[32px]' type='duration' />
          </div>
        </Controls.Group>
      </Controls.Root>
    </MediaPlayer>
  )
}

export default VideoPlayer
