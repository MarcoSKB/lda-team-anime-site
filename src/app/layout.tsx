import type { Metadata } from 'next'
import './(root)/globals.css'

export const metadata: Metadata = {
  title: 'LDA Voice | Смотри аниме онлайн с озвучкой',
  description:
    'Смотри любимые аниме-сериалы онлайн в высоком качестве с профессиональной озвучкой. Удобный выбор серий, сезонов и интерфейс!',
  icons: './favicon.ico',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
