import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui'

import { getPopularAnime } from '@/actions/anime'
import { BannerAnime } from '@/types/anime.types'
import { cn } from '@/utils/cn'
import { ANIME_VOICEOVER_TYPE } from '@/utils/global-vars'

const HeroSliderList: React.FC = async () => {
  const res = await getPopularAnime()
  let popularAnimeList: BannerAnime[] = []
  if (res.type == 'ok') popularAnimeList = res.data.results

  return (
    <ul className='flex h-[45vh] min-h-[720px] md:h-screen'>
      {popularAnimeList.map((slider) => (
        <li
          key={slider.id}
          className='relative z-0 min-w-0 flex-[0_0_100%] pb-[25svh] md:pt-[14%]'
        >
          <Container className='mt-auto flex h-full flex-col justify-end md:mt-0 md:h-auto'>
            <Link
              href={`/catalog/${slider.slug}`}
              title='Перейти на страницу с аниме'
              className='hover:text-accent mb-3 line-clamp-2 max-w-[644px] scroll-mt-10 font-["Roboto_Flex"] text-2xl leading-[24px] font-extrabold text-pretty text-white transition md:text-[40px] md:leading-[36px] lg:text-[52px] lg:leading-[48px]'
            >
              {slider.name}
            </Link>
            <span className='mb-4 text-[12px] leading-6 text-[#DEE1E6] uppercase md:text-sm'>
              Озвучка: {ANIME_VOICEOVER_TYPE[slider.currentVoiceoverType]}
            </span>
            <span
              className='line-clamp-3 min-h-[60px] max-w-[640px] text-sm font-light text-pretty text-white select-none md:line-clamp-4 md:text-base md:leading-6'
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              {slider.description}
            </span>
          </Container>
          <div
            className={cn(
              'absolute top-0 left-0 z-[-1] h-full w-full',
              'dark:before:from-background before:absolute before:z-[2] before:block before:h-full before:w-full before:bg-linear-to-t before:from-transparent before:to-[rgba(0,2,13,0)] before:to-[20.5%] before:content-[""]',
              'after:absolute after:z-[1] after:block after:h-full after:w-full after:bg-linear-to-r after:from-transparent after:to-[rgba(0,0,0,0)] after:to-100% after:content-[""] dark:after:from-black/80',
            )}
          >
            <Image
              fill
              priority
              quality={90}
              sizes='100vw'
              alt='Баннер аниме'
              className='z-0 object-cover'
              src={slider.banner?.url ?? '/images/profile-banner.jpg'}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default HeroSliderList
