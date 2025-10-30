import type { Metadata } from 'next'
import { Inter, Roboto_Flex } from 'next/font/google'

import Providers from '@/providers/Providers'

import './globals.css'

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
  metadataBase: new URL(`${process.env.NEXTAUTH_URL}`),
  title: {
    default: 'LDA Team | Смотри аниме онлайн с озвучкой',
    template: '%s | LDA Team',
  },
  description:
    'Смотри любимые аниме-сериалы онлайн в высоком качестве с профессиональной озвучкой. Удобный выбор серий, сезонов и интерфейс!',
  icons: '/favicon.ico',
  openGraph: {
    type: 'website',
    title: 'LDA Team | Смотри аниме онлайн с озвучкой',
    description:
      'Смотри любимые аниме-сериалы онлайн в высоком качестве с профессиональной озвучкой. Удобный выбор серий, сезонов и интерфейс!',
    url: `${process.env.NEXTAUTH_URL}`,
    siteName: 'LDA Team',
    images: {
      url: '/opengraph-image.png',
      width: 1200,
      height: 630,
      alt: 'Баннер с маскотом LDA Team',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LDA Team | Смотри аниме онлайн с озвучкой',
    description:
      'Смотри любимые аниме-сериалы онлайн в высоком качестве с профессиональной озвучкой. Удобный выбор серий, сезонов и интерфейс!',
    images: {
      url: '/opengraph-image.png',
      width: 1200,
      height: 630,
      alt: 'Баннер с маскотом LDA Team',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable} ${robotoFlex.variable} flex min-h-lvh flex-col pb-[72px] md:pb-0`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
