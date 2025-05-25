'use client'

import { useUserSession } from '@/stores/userStore'
import { MenuItem } from '@headlessui/react'
import { LayoutDashboard } from 'lucide-react'

import { LinkButton } from '@/components/ui'

const Dashboard: React.FC = () => {
  const { user } = useUserSession((state) => state)

  if (!user || user.permission !== 'admin') {
    return null
  }

  return (
    <MenuItem
      as={LinkButton}
      href='/dashboard'
      intent='secondary'
      size='small'
      title='Админ панель'
      icon={<LayoutDashboard width={18} height={18} />}
    >
      Админ панель
    </MenuItem>
  )
}

export default Dashboard
