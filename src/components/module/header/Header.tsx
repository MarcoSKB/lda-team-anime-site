import Link from 'next/link'

import { Search } from '@/components/module'
import { Container } from '@/components/ui'

import { Logotype, Menu, Navigation, Profile } from './components'

const Header: React.FC = () => {
  return (
    <header className='absolute min-h-screen md:static md:min-h-auto'>
      <Container className='shadow-top border-secondary bg-background fixed bottom-1 left-0 z-50 ml-[1%] flex max-w-[98%] items-center justify-evenly gap-2.5 overflow-hidden rounded-2xl border-1 border-solid md:static md:mx-auto md:w-auto md:max-w-[1320px] md:justify-between md:gap-2 md:border-none md:bg-transparent md:py-3'>
        <Logotype />
        <Navigation />
        <div className='order-3 flex flex-1 items-center md:order-none md:flex-none md:gap-2'>
          <Search />
          <Link
            href='/donate'
            className='hover:bg-accent text-foreground hidden rounded-md bg-[rgba(255,255,255,10%)] px-3 py-2 text-[12px] transition-all ease-out hover:text-white md:flex'
          >
            Поддержать проект
          </Link>
          <Profile />
          <Menu />
        </div>
      </Container>
    </header>
  )
}

export default Header
