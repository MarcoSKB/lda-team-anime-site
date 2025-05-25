import { useUserSession } from '@/stores/userStore'
import { MenuItem } from '@headlessui/react'

const Username: React.FC = () => {
  const user = useUserSession((state) => state.user)

  if (!user) {
    return (
      <MenuItem as='div'>
        <span className='block cursor-default px-3 py-1 text-sm'>
          Пользователь
        </span>
        <hr className='my-1 opacity-10' />
      </MenuItem>
    )
  }

  return (
    <MenuItem as='div'>
      <span className='block cursor-default px-3 py-1 text-sm'>
        {user.username || 'Пользователь'}
      </span>
      <hr className='my-1 opacity-10' />
    </MenuItem>
  )
}

export default Username
