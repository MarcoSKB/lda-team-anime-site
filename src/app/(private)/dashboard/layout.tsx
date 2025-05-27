import { redirect } from 'next/navigation'

import { AppSidebar, SiteHeader } from '@/components/module'
import { SidebarInset, SidebarProvider } from '@/components/ui'

import { auth } from '@/utils/auth'

interface Props {
  children: React.ReactNode
}

const layout: React.FC<Props> = async ({ children }) => {
  const session = await auth()
  if (!session || session.user.permission !== 'admin') redirect('/')
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 60)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        <div className='flex flex-1 flex-col'>
          <div className='@container/main flex flex-1 flex-col gap-2'>
            <div>{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default layout
