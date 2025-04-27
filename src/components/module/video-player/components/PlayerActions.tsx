import {
  CaptionButton,
  FullscreenButton,
  MuteButton,
  PlayButton,
  SeekButton as SeekButtonVidstack,
  Tooltip,
  type TooltipPlacement,
  isTrackCaptionKind,
  useMediaState,
} from '@vidstack/react'
import {
  CaptionsIcon,
  CaptionsOff,
  ChevronFirst,
  ChevronLast,
  Maximize,
  Minimize,
  PauseIcon,
  PlayIcon,
  RotateCcw,
  RotateCw,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react'

interface MediaButtonProps {
  tooltipPlacement: TooltipPlacement
}

interface NavButtonProps {
  disabled?: boolean
}

interface SeekButtonProps extends MediaButtonProps {
  type: 'forward' | 'backward'
  timeSkip?: number
}

export const buttonClass =
  'group ring-media-focus relative inline-flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4'

export const tooltipClass =
  'animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-sm bg-[rgba(0,0,0,0.5)] px-2 py-0.5 text-sm font-medium text-white parent-data-[open]:hidden'

export const Play: React.FC<MediaButtonProps> = ({ tooltipPlacement }) => {
  const isPaused = useMediaState('paused')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={buttonClass}>
          {isPaused ? (
            <PlayIcon className='group-hover:text-accent h-7 w-7 translate-x-[1px] transition ease-in-out' />
          ) : (
            <PauseIcon className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          )}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isPaused ? 'Смотреть (k)' : 'Пауза (k)'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const PrevButton: React.FC<NavButtonProps> = ({ disabled }) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className={buttonClass} disabled={disabled}>
          <ChevronFirst className='group-hover:text-accent h-7 w-7 transition ease-in-out group-disabled:text-white' />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement='top center'>
        Предыдущий эпизод
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const NextButton: React.FC<NavButtonProps> = ({ disabled }) => {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className={buttonClass} disabled={disabled}>
          <ChevronLast className='group-hover:text-accent h-7 w-7 transition ease-in-out group-disabled:text-white' />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement='top center'>
        Следующий эпизод
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const SeekButton: React.FC<SeekButtonProps> = ({
  tooltipPlacement,
  type,
  timeSkip = 10,
}) => {
  if (type == 'forward')
    return (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <SeekButtonVidstack
            className='group relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md ring-sky-400 outline-none ring-inset hover:bg-white/20 aria-hidden:hidden data-[focus]:ring-4'
            seconds={timeSkip}
          >
            <RotateCw className='group-hover:text-accent h-6 w-6 transition ease-in-out' />
          </SeekButtonVidstack>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          {`Пропустить ${timeSkip} секунд (→)`}
        </Tooltip.Content>
      </Tooltip.Root>
    )

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButtonVidstack
          className='group relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md ring-sky-400 outline-none ring-inset hover:bg-white/20 aria-hidden:hidden data-[focus]:ring-4'
          seconds={-timeSkip}
        >
          <RotateCcw className='group-hover:text-accent h-6 w-6 transition ease-in-out' />
        </SeekButtonVidstack>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {`Вернуть ${timeSkip} секунд (←)`}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const Mute: React.FC<MediaButtonProps> = ({ tooltipPlacement }) => {
  const volume = useMediaState('volume')
  const isMuted = useMediaState('muted')

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className={buttonClass}>
          {isMuted || volume == 0 ? (
            <VolumeX className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          ) : volume < 0.5 ? (
            <Volume1 className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          ) : (
            <Volume2 className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isMuted ? 'Выключить звук (m)' : 'Включить звук (m)'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const Caption: React.FC<MediaButtonProps> = ({ tooltipPlacement }) => {
  const track = useMediaState('textTrack'),
    isOn = track && isTrackCaptionKind(track)
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className={buttonClass}>
          {isOn ? (
            <CaptionsIcon className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          ) : (
            <CaptionsOff className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          )}
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isOn ? 'Cубтитры выкл (c)' : 'Cубтитры вкл (c)'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

export const Fullscreen: React.FC<MediaButtonProps> = ({
  tooltipPlacement,
}) => {
  const isActive = useMediaState('fullscreen')
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className={buttonClass}>
          {isActive ? (
            <Minimize className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          ) : (
            <Maximize className='group-hover:text-accent h-7 w-7 transition ease-in-out' />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isActive ? 'Выход из полноэкранного режима (f)' : 'Во весь экран (f)'}
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
