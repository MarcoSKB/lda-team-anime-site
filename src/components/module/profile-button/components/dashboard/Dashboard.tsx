'use client'

import { useSession } from 'next-auth/react'

import { MenuItem } from '@headlessui/react'
import { LayoutDashboard } from 'lucide-react'

import { LinkButton } from '@/components/ui'

import { requireAuth } from '@/utils/system'

const Dashboard: React.FC = () => {
  const { data: session } = useSession()
  if (!requireAuth(session, ['Admin'])) {
    return null
  }

  return (
    <MenuItem
      as={LinkButton}
      href='/dashboard'
      intent='secondary'
      size='small'
      title='Админ панель'
      className='hover:bg-secondary py-1.5'
      icon={<LayoutDashboard width={18} height={18} />}
    >
      Админ панель
    </MenuItem>
  )
}

export default Dashboard
