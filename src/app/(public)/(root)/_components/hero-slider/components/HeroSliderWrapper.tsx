'use client'

import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'

import { HERO_SLIDER_DURATION } from '@/utils/global-vars'

import HeroSliderProgressDots from './HeroSliderProgressDots'

interface Props {
  children: React.ReactNode
}

const HeroSliderWrapper: React.FC<Props> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: HERO_SLIDER_DURATION,
      stopOnInteraction: false,
    }),
    Fade(),
  ])

  return (
    <>
      <div className='overflow-hidden' ref={emblaRef}>
        {children}
      </div>
      <HeroSliderProgressDots emblaApi={emblaApi} />
    </>
  )
}

export default HeroSliderWrapper
