import { useSession } from 'next-auth/react'

import { MenuItem } from '@headlessui/react'

const Username: React.FC = () => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <MenuItem as='div'>
        <span className='block cursor-default px-3 py-1 text-sm'>
          Пользователь
        </span>
        <hr className='my-1 opacity-10' />
      </MenuItem>
    )
  }

  return (
    <MenuItem as='div' className='relative z-0 overflow-hidden'>
      <span className='before:from-secondary block w-full cursor-default px-3 py-1 text-sm before:pointer-events-none before:absolute before:top-[-7px] before:right-[-4px] before:z-10 before:h-full before:w-[42px] before:bg-gradient-to-l before:from-20% before:to-[rgba(255,255,255,0)] before:content-[""]'>
        {session.user?.username || 'Пользователь'}
      </span>
      <hr className='my-1 opacity-10' />
    </MenuItem>
  )
}

export default Username
