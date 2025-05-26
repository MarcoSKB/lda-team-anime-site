'use client'

import { useSession } from 'next-auth/react'

import { MenuItem } from '@headlessui/react'
import { LayoutDashboard } from 'lucide-react'

import { LinkButton } from '@/components/ui'

const Dashboard: React.FC = () => {
  const { data: session } = useSession()
  if (!session || !session.user || session.user.permission !== 'admin') {
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
