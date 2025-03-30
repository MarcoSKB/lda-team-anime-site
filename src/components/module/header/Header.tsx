import Link from 'next/link'

import { Search } from '@/components/module'
import { Container } from '@/components/ui'

import Logotype from './components/Logotype'
import Menu from './components/Menu'
import Navigation from './components/Navigation'
import Profile from './components/Profile'

const Header: React.FC = () => {
  return (
    <header>
      <Container className='bg-secondary absolute bottom-0 left-0 z-10 flex items-center justify-evenly gap-2.5 overflow-hidden py-1.5 md:static md:justify-between md:gap-2 md:bg-transparent md:py-3'>
        <Logotype />
        <Navigation />
        <div className='order-3 flex flex-1 items-center md:order-none md:flex-none md:gap-2'>
          <Search />
          <Link
            href='/donate'
            className='hover:bg-accent hidden rounded-md bg-[rgba(255,255,255,10%)] px-3 py-2 text-[12px] transition-all ease-out md:flex'
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
