import Image from 'next/image'

import { Footer, Header } from '@/components/module'
import { Container } from '@/components/ui'

import { Navigation, ProfileHeader } from './_module'

interface Props {
  children: React.ReactNode
}

const page: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='relative z-[-1] mx-auto box-border hidden min-h-[128px] w-full max-w-[1420px] overflow-hidden px-4 md:block lg:min-h-[200px] lg:rounded-b-lg'>
        <Image
          width={1320}
          height={400}
          sizes='100vw'
          src='/images/profile-banner.jpg'
          alt='Баннер профиля'
          className='absolute top-0 left-0 hidden h-full w-full object-cover md:block'
        />
      </div>
      <Container className='flex min-h-screen flex-col'>
        <div className='grid min-h-screen grid-cols-1 grid-rows-[auto_60px_1fr] md:mt-[-40px] md:grid-cols-[256px_1fr] md:grid-rows-[184px_1fr]'>
          <ProfileHeader />
          <Navigation />
          <div>{children}</div>
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default page
