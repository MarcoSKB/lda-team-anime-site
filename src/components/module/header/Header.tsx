import { ProfileButton, Search } from '@/components/module'
import { Container } from '@/components/ui'

import { HeaderWrapper, Logotype, Menu, Navigation } from './components'

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Container className='shadow-top border-secondary bg-background fixed bottom-1 left-0 z-50 ml-[1%] flex max-w-[98%] items-center justify-evenly gap-2.5 overflow-hidden rounded-2xl border-1 border-solid md:top-0 md:left-1/2 md:mx-auto md:w-full md:max-w-[1320px] md:-translate-x-1/2 md:justify-between md:gap-2 md:self-start md:rounded-none md:border-none md:bg-transparent md:py-3 md:shadow-none'>
        <Logotype />
        <Navigation />
        <div className='order-3 flex flex-1 items-center md:order-none md:flex-none md:gap-2'>
          <Search />
          {/* <a
            type='_blank'
            href='https://boosty.to/ldateam'
            title='Поддержать проект'
            className='hover:bg-accent text-foreground hidden rounded-md bg-[rgba(255,255,255,10%)] px-3 py-2 text-[12px] transition-all ease-out hover:text-white md:flex md:text-white'
          >
            Поддержать проект
          </a> */}
          <ProfileButton />
          <Menu />
        </div>
      </Container>
    </HeaderWrapper>
  )
}

export default Header
