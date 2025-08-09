import { Toaster } from '@/components/ui'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <main className='flex-1'>{children}</main>
      <Toaster />
    </>
  )
}
