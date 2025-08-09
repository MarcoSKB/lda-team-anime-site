import { redirect } from 'next/navigation'

import { Toaster } from '@/components/ui'

import { auth } from '@/utils/auth'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) redirect('/')

  return (
    <>
      <main className='flex-1'>{children}</main>
      <Toaster />
      <div id='headlessui-portal-root' />
    </>
  )
}
