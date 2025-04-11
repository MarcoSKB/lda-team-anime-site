'use client'

import { Suspense, useCallback } from 'react'

import useEmblaCarousel from 'embla-carousel-react'

import OngoinSkeleton from './OngoinSkeleton'
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
    <Suspense fallback={<OngoinSkeleton />}>
      <div className='flex flex-col gap-4'>
        <div ref={emblaRef}>{children}</div>
        <OngoingSliderAction scrollPrev={scrollPrev} scrollNext={scrollNext} />
      </div>
    </Suspense>
  )
}
export default OngoingWrapper
