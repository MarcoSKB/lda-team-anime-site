import Image from 'next/image'

import { Breadcrumbs } from '@/components/module'

import { auth } from '@/utils/auth'

const ProfileHeader: React.FC = async () => {
  const session = await auth()

  return (
    <div className='flex gap-4 border-b-1 border-solid border-[rgba(255,255,255,0.2)] pt-3 pb-6 md:col-span-2 md:items-end md:gap-6 md:pt-0 md:pl-6'>
      <Image
        width={160}
        height={160}
        src={session?.user.userAvatar ?? '/images/avatar-blank.jpg'}
        alt='Аватар профиля'
        className='h-[80px] w-[80px] rounded-full outline-4 outline-offset-[-1px] outline-white sm:h-[100px] sm:w-[100px] md:h-[160px] md:w-[160px]'
      />
      <div className='flex flex-col gap-2 md:gap-4'>
        <Breadcrumbs />
        <div className='text-foreground flex flex-col font-[Roboto_Flex]'>
          <h2 className='text-2xl leading-[140%] tracking-[-1%]'>
            Личный кабинет
          </h2>
          <span className='text-base leading-[150%] font-thin opacity-80'>
            Пользователь
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
