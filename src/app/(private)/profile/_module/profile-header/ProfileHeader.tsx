import { Breadcrumbs } from '@/components/module'

import { Roles } from '@/types/account.types'
import { auth } from '@/utils/auth'

import ProfileAvatar from './ProfileAvatar'

const ProfileHeader: React.FC = async () => {
  const session = await auth()

  const rolePrefixText = (role?: Roles[]) => {
    if (!role) return 'Пользователь'
    switch (true) {
      case role.includes('Admin'):
        return 'Администратор'
      case role.includes('Moderator'):
        return 'Модератор'
      case role.includes('Donator'):
        return 'Донатер'
      case role.includes('Actor'):
        return 'Актёр'
      default:
        return 'Пользователь'
    }
  }

  return (
    <div className='flex gap-4 border-b-1 border-solid border-[rgba(255,255,255,0.2)] pt-3 pb-6 md:col-span-2 md:items-end md:gap-6 md:pt-0 md:pl-6'>
      <ProfileAvatar />
      <div className='flex flex-col gap-2 md:gap-4'>
        <Breadcrumbs />
        <div className='text-foreground flex flex-col font-[Roboto_Flex]'>
          <h2 className='text-2xl leading-[140%] tracking-[-1%]'>
            Личный кабинет
          </h2>
          <span className='text-base leading-[150%] font-thin opacity-80'>
            {rolePrefixText(session?.user.roles)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
