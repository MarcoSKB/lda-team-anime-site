import { getUserFavoriteTitles, getUserWatchedTitles } from '@/actions/account'

import { FavoriteList, WatchedList } from './_module'

const page: React.FC = async () => {
  const favoriteRes = await getUserFavoriteTitles()
  const watchedRes = await getUserWatchedTitles()

  return (
    <div className='flex flex-col py-4'>
      <h1 className='sr-only'>Список избранных аниме тайтлов</h1>
      <FavoriteList data={favoriteRes} />
      <WatchedList data={watchedRes} />
    </div>
  )
}

export default page
