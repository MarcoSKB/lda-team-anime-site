import { DataTable } from '@/components/module'

import data from './data.json'

const page: React.FC = () => {
  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <DataTable data={data} />
    </div>
  )
}

export default page
