'use client'

import { signIn } from 'next-auth/react'

import { Icon } from '@/components/ui'

const SignInWith: React.FC = () => {
  return (
    <div className='mb-6 flex flex-col items-center gap-4'>
      <span className='text-foreground text-center text-lg leading-[150%]'>
        Войти с помощью
      </span>
      <div className='flex gap-4'>
        <button
          type='button'
          title='Google авторизация'
          onClick={() => signIn('google', { redirectTo: '/' })}
          className='bg-secondary border-secondary group cursor-pointer rounded-lg border-2 border-solid p-3 transition ease-in-out hover:bg-transparent'
        >
          <Icon
            name='google'
            className='group-hover:fill-accent fill-foreground m-0.5 h-[20px] w-[20px] transition ease-in-out'
          />
        </button>
        <button
          type='button'
          title='Discord авторизация'
          onClick={() => signIn('discord', { redirectTo: '/' })}
          className='bg-secondary border-secondary group cursor-pointer rounded-lg border-2 border-solid p-3 transition ease-in-out hover:bg-transparent'
        >
          <Icon
            name='discord'
            className='group-hover:fill-accent fill-foreground h-[24px] w-[24px] transition ease-in-out'
          />
        </button>
        {/* <button
          type='button'
          title='Mailru авторизация'
          onClick={() => signIn('mailru')}
          className='bg-secondary border-secondary group cursor-pointer rounded-lg border-2 border-solid p-3 transition ease-in-out hover:bg-transparent'
        >
          <Icon
            name='mailru'
            className='group-hover:fill-accent fill-foreground h-[24px] w-[24px] transition ease-in-out'
          />
        </button> */}
      </div>
    </div>
  )
}

export default SignInWith
