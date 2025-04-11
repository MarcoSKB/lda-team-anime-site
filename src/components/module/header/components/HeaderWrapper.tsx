'use client'

import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
}

const HeaderWrapper: React.FC<Props> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`absolute min-h-screen md:static md:min-h-auto md:w-full md:before:fixed md:before:top-0 md:before:left-0 md:before:z-[49] md:before:h-[68px] md:before:w-full md:before:bg-gradient-to-b md:before:from-[rgba(0,2,13,0.3)] md:before:to-[rgba(0,2,13,0)] md:before:backdrop-blur-[5px] md:before:transition md:before:duration-1000 md:before:ease-in-out md:before:content-[""] ${isScrolled ? 'md:before:opacity-100' : 'md:before:opacity-0'}`}
    >
      {children}
    </header>
  )
}

export default HeaderWrapper
