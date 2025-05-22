import { Suspense } from 'react'

import { getUserInfo } from '@/actions/account'

import { ProfileForm, ProfilePasswordForm } from './_module'

const page: React.FC = async () => {
  return (
    <div className='flex flex-col gap-6 py-4 md:px-6'>
      <Suspense fallback={'Загрузка'}>
        <ProfileForm fetchInitialValue={getUserInfo()} />
      </Suspense>
      <ProfilePasswordForm />
    </div>
  )
}

export default page
