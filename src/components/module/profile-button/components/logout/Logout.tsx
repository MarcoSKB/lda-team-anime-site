import { MenuItem } from '@headlessui/react'
import { LogOut } from 'lucide-react'

import { LinkButton } from '@/components/ui'

const Logout: React.FC = () => {
  return (
    <MenuItem
      as={LinkButton}
      href='/logout'
      intent='secondary'
      size='small'
      title='Выйти с аккаунта'
      icon={<LogOut width={18} height={18} />}
    >
      Выйти
    </MenuItem>
  )
}

export default Logout
