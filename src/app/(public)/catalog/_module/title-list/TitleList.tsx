import { getCatalogList } from '@/actions/anime'

import { Card } from '@/components/module'

const TitleList: React.FC = async () => {
  const catalogList = await getCatalogList()
  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-2 gap-y-4 md:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] md:gap-x-4 md:gap-y-6'>
      {catalogList.map((item) => (
        <li key={item.id}>
          <Card {...item} />
        </li>
      ))}
    </ul>
  )
}

export default TitleList
