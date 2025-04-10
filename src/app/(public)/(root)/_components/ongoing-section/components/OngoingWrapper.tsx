'use client'

import { useCallback } from 'react'

import useEmblaCarousel from 'embla-carousel-react'

import OngoingSliderAction from './OngoingSliderAction'

interface Props {
  children: React.ReactNode
}

const OngoingWrapper: React.FC<Props> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    slidesToScroll: 2,
  })

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <div className='flex flex-col gap-4'>
      <div ref={emblaRef}>{children}</div>
      <OngoingSliderAction scrollPrev={scrollPrev} scrollNext={scrollNext} />
    </div>
  )
}
export default OngoingWrapper
