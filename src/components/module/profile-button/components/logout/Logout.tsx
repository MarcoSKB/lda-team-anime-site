import { signOut } from 'next-auth/react'

import { MenuItem } from '@headlessui/react'
import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui'

const Logout: React.FC = () => {
  return (
    <MenuItem
      as={Button}
      title='Выйти с аккаунта'
      intent='default'
      size='default'
      className='hover:text-accent px-2 active:hover:scale-100'
      icon={<LogOut width={18} height={18} />}
      onClick={(e) => {
        signOut()
        e.preventDefault()
      }}
    >
      Выйти
    </MenuItem>
  )
}

export default Logout
