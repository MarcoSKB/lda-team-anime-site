import Image from 'next/image'

import { getAnimeTitle } from '@/actions/anime'
import { Bookmark } from 'lucide-react'

import { Button, Container, ReadMore, Tag } from '@/components/ui'

interface Props {
  slug: string
}

const TitleInfo: React.FC<Props> = async ({ slug }) => {
  const animeData = await getAnimeTitle(slug)

  return (
    <>
      <h1 className='sr-only'>
        Смотреть аниме {animeData.title} в хорошем качестве
      </h1>
      <Container className='mb-8 flex flex-col gap-6 pt-4 md:flex-row md:pt-0'>
        <div className='mx-auto flex w-1/2 max-w-[260px] min-w-[190px] flex-col gap-3 md:mx-0 md:w-auto'>
          <Image
            src={animeData.img}
            width={190}
            height={297}
            className='h-auto w-auto min-w-[190px] rounded-md'
            alt={`Постер аниме ${animeData.title}`}
          />
          <div className='flex items-start gap-2'>
            <Button intent='primary' className='px-2 py-2'>
              <Bookmark width={24} height={24} />
            </Button>
            <div className='bg-secondary flex h-full w-full items-center justify-center rounded-md px-2.5 py-2 text-center text-sm leading-[18px]'>
              Рейтинг: {animeData.rating}&nbsp;/&nbsp;10
            </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-3'>
          <h2 className='text-foreground max-w-[70%] font-[Roboto_Flex] text-[32px] leading-[36px] font-extrabold text-balance'>
            {animeData.title}
          </h2>
          <div className='before:from-background relative w-fit before:pointer-events-none before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-gradient-to-l before:to-[rgba(255,255,255,0)] before:to-10% before:content-[""]'>
            <div className='flex max-w-[400px] gap-1.5 overflow-x-auto pr-5'>
              {animeData.tags.map((tag) => (
                <Tag key={tag} className='py-0.5'>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
          <ReadMore
            maxLength={300}
            className='text-foreground max-w-[700px] text-sm leading-[22px] font-light text-balance md:text-base md:leading-[26px] dark:opacity-90'
          >
            {animeData.description}
          </ReadMore>
        </div>
      </Container>
    </>
  )
}

export default TitleInfo
