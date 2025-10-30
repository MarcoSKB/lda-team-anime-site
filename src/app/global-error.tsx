'use client'

import { Inter, Roboto_Flex } from 'next/font/google'
import Image from 'next/image'

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

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body
        className={`antialiased ${inter.variable} ${robotoFlex.variable} flex min-h-lvh flex-col pb-[72px] md:pb-0`}
      >
        <div className='flex flex-1'>
          <div className='relative z-0 mx-auto flex flex-col items-center gap-1 self-center justify-self-center text-center'>
            <div className='relative z-0 h-[250px] w-[250px] overflow-hidden'>
              <Image
                src='/images/mascot-think.PNG'
                alt='Маскот LDA Team'
                className='absolute z-0 h-full w-full object-cover'
                width={400}
                height={400}
              />
            </div>
            <div className='flex flex-col'>
              <span className='text-foreground pointer-events-none absolute -top-[20%] left-1/2 z-[-1] -translate-x-1/2 font-[Roboto_Flex] text-[270px] font-bold opacity-30'>
                {error.name}
              </span>
              <h1 className='text-lg text-balance'>
                Упс! Что-то пошло не так.
                <br />
                Наш маскот тоже не понимает, что случилось:
              </h1>
              <span>{error.message}</span>
              <button
                onClick={() => reset()}
                className='text-link hover:text-link/80 inline-block py-2 transition hover:underline'
              >
                Повторить попытку
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
