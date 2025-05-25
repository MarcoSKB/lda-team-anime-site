import { MenuItem } from '@headlessui/react'
import { Settings as SettingsIcon } from 'lucide-react'

import { LinkButton } from '@/components/ui'

const Settings: React.FC = () => {
  return (
    <MenuItem
      as={LinkButton}
      href='/profile'
      intent='secondary'
      size='small'
      title='Настройки аккаунта'
      icon={<SettingsIcon width={18} height={18} />}
    >
      Настройки
    </MenuItem>
  )
}

export default Settings
