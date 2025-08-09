import { getUserList } from '@/actions/dashboard'

import { DataTable } from './_module'

const page: React.FC = async () => {
  const userList = await getUserList()
  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <DataTable data={userList} />
    </div>
  )
}

export default page
