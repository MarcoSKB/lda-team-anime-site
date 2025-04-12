'use client'

import { useEffect, useState } from 'react'

import { EmblaCarouselType } from 'embla-carousel'

import { Container } from '@/components/ui'

interface Props {
  emblaApi: EmblaCarouselType | undefined
}

const HeroSliderProgressDots: React.FC<Props> = ({ emblaApi }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)
  const [isSlideActive, setIsSlideActive] = useState(true)

  const logSlidesInView = (emblaApi: EmblaCarouselType) => {
    setCurrentSlide(emblaApi.selectedScrollSnap())
  }
  const scrollToSlide = (snapIndex: number) => {
    emblaApi?.scrollTo(snapIndex)
  }

  useEffect(() => {
    if (!emblaApi) return
    setTotalSlides(emblaApi.scrollSnapList().length)
    emblaApi.on('select', logSlidesInView)
    emblaApi.on('autoplay:play', () => setIsSlideActive(true))
    emblaApi.on('autoplay:stop', () => setIsSlideActive(false))
    return () => {
      emblaApi.off('select', logSlidesInView)
      emblaApi.off('autoplay:play', () => setIsSlideActive(true))
      emblaApi.off('autoplay:stop', () => setIsSlideActive(false))
    }
  }, [emblaApi])

  return (
    <Container className='pointer-events-none absolute bottom-[22svh] left-1/2 z-10 flex -translate-x-1/2 justify-end md:bottom-[29dvh]'>
      <div className='pointer-events-auto flex h-1.5 w-full gap-4 sm:w-[368px]'>
        {[...Array(totalSlides)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className='h-full w-full cursor-pointer overflow-hidden rounded-sm bg-[rgba(255,255,255,25%)]'
          >
            <div
              className={
                currentSlide == idx && isSlideActive
                  ? 'animate-progress h-full'
                  : 'h-full'
              }
            />
          </button>
        ))}
      </div>
    </Container>
  )
}

export default HeroSliderProgressDots
