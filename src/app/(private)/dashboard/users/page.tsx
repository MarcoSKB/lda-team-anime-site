'use client'

import { useSearchParams } from 'next/navigation'

import { toast } from 'sonner'

import { getUserList } from '@/actions/dashboard'
import useServerAction from '@/hooks/useServerAction'

import { DataTable, Loading } from './_module'

const Page: React.FC = () => {
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page') ?? 0)
  const pageSize = Number(searchParams.get('count') ?? 10)
  const {
    data: userList,
    error,
    isLoading,
    refetch,
  } = useServerAction(getUserList, pageIndex, pageSize)

  if (error || userList?.type == 'error') {
    toast.error(error)
    return (
      <div className='container mx-auto py-10'>
        Произошла ошибка. Повторите повторите попытку
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
      <DataTable
        data={userList!.data.results}
        totalCount={userList!.data.totalCount}
        refetch={refetch}
      />
    </div>
  )
}

export default Page
