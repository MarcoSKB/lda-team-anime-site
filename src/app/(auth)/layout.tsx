import type { Metadata } from 'next'
import { Inter, Roboto_Flex } from 'next/font/google'

import Providers from '@/providers/Providers'

import { Toaster } from '@/components/ui'

import '../globals.css'

const inter = Inter({
  subsets: ['cyrillic'],
  weight: ['800', '700', '600', '500', '400', '300'],
  variable: '--font-inter',
})

const robotoFlex = Roboto_Flex({
  subsets: ['cyrillic'],
  weight: ['800', '700', '600', '500', '400', '300'],
  variable: '--font-roboto-flex',
})

export const metadata: Metadata = {
  title: 'LDA Voice | Смотри аниме онлайн с озвучкой',
  description:
    'Смотри любимые аниме-сериалы онлайн в высоком качестве с профессиональной озвучкой. Удобный выбор серий, сезонов и интерфейс!',
  icons: '/favicon.ico',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable} ${robotoFlex.variable} flex min-h-lvh flex-col`}
      >
        <Providers>
          <main className='flex-1'>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
