import { Footer, Header } from '@/components/module'
import { Toaster } from '@/components/ui'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>{children}</main>
      <div id='headlessui-portal-root' />
      <Toaster />
      <Footer />
    </div>
  )
}
