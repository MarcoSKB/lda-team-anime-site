import Link from 'next/link'

import { Badge, Button } from '@/components/ui'

import { getAnimeTitle } from '@/actions/anime'
import { EPISODE_STATUS_LABELS } from '@/utils/global-vars'

import { Actions } from './_module'

interface Props {
  params: Promise<{ slug: string }>
}

const page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const res = await getAnimeTitle(slug, false)
  if (res.type == 'error') {
    return (
      <div className='container mx-auto py-10'>
        Произошла ошибка. Повторите повторите попытку
      </div>
    )
  }
  const episodesList = res.data.episodes

  if (episodesList.length == 1 && episodesList[0].slug == 'episode-not-found') {
    return (
      <div className='container mx-auto mb-1 flex flex-col gap-4 px-4 py-10 md:mb-2 lg:px-6'>
        <h2 className='text-lg font-semibold'>
          Список эпизодов &quot;{res.data.name}&quot;
        </h2>
        <p>Список эпизодов пуст</p>
        <Button intent='primary' className='self-start'>
          <Link href='/dashboard/projects'>Назад</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='container mx-auto mb-1 flex flex-col gap-4 px-4 py-10 md:mb-2 lg:px-6'>
      <h2 className='text-lg font-semibold'>
        Список эпизодов &quot;{res.data.name}&quot;
      </h2>
      <ul className='flex flex-col gap-2'>
        {episodesList
          .sort((a, b) => a.number - b.number)
          .map((episode) => (
            <li
              key={episode.id}
              className='bg-background border-secondary flex w-full items-center rounded-md border border-solid px-2 py-1.5'
            >
              <Badge variant='secondary' className='py-1'>
                {episode.number} Эпизод
              </Badge>
              <span className='mx-2'>{episode.name}</span>
              <span className='ml-auto text-sm'>
                Статус:{' '}
                <Badge
                  variant='secondary'
                  className='fill-green-500 dark:fill-green-400'
                >
                  {EPISODE_STATUS_LABELS[episode.status]}
                </Badge>
              </span>
              <Actions
                episodesList={episodesList}
                episodeTotal={res.data.episodesTotal}
                episode={episode}
                episodeId={episode.id}
              />
            </li>
          ))}
      </ul>
      <Button intent='primary' className='self-start'>
        <Link href='/dashboard/projects'>Назад</Link>
      </Button>
    </div>
  )
}

export default page
