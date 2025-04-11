import Image from 'next/image'
import Link from 'next/link'

import { getPopularAnime } from '@/actions/anime'

import { Container } from '@/components/ui'

import { truncateText } from '@/utils/string'

const HeroSliderList: React.FC = async () => {
  const popularAnimeList = await getPopularAnime()

  return (
    <ul className='flex h-[45vh] min-h-[618px] md:h-screen'>
      {popularAnimeList.map((slider) => (
        <li
          key={slider.id}
          className='relative z-0 min-w-0 flex-[0_0_100%] pb-[25svh] md:pt-[14%]'
        >
          <Container className='mt-auto flex h-full flex-col justify-end md:mt-0 md:h-auto'>
            <Link
              href={`/catalog/${slider.slug}`}
              title='Перейти на страницу с аниме'
              className='hover:text-accent mb-3 max-w-[550px] font-["Roboto_Flex"] text-2xl leading-[24px] font-extrabold text-balance text-white transition md:text-[40px] md:leading-[36px] lg:text-[52px] lg:leading-[48px]'
            >
              {slider.title}
            </Link>
            <span className='mb-4 text-[12px] leading-6 text-[#DEE1E6] uppercase md:text-sm'>
              {slider.subtitle}
            </span>
            <span className='min-h-[60px] max-w-[720px] text-sm font-light text-pretty text-white md:text-base md:leading-6'>
              {truncateText(slider.description, 245)}
            </span>
          </Container>
          <div className='before:from-background absolute top-0 left-0 z-[-1] h-full w-full before:absolute before:z-[1] before:block before:h-full before:w-full before:bg-linear-to-t before:to-[rgba(0,2,13,0)] before:to-[20.5%] before:content-[""]'>
            <Image
              fill
              src={slider.img}
              className='z-0 object-cover'
              alt='Баннер аниме'
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default HeroSliderList
