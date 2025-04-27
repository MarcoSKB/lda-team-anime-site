import { Spinner } from '@vidstack/react'

const BufferingIndicator = () => {
  return (
    <div className='pointer-events-none absolute inset-0 z-50 flex h-full w-full items-center justify-center'>
      <Spinner.Root
        className='media-buffering:animate-spin media-buffering:opacity-100 text-white opacity-0 transition-opacity duration-200 ease-linear'
        size={84}
      >
        <Spinner.Track className='opacity-25' width={8} />
        <Spinner.TrackFill className='opacity-75' width={8} />
      </Spinner.Root>
    </div>
  )
}

export default BufferingIndicator
