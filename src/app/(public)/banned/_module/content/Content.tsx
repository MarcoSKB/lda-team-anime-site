'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui'

const Content: React.FC = () => {
  const params = useSearchParams()
  const reason = params.get('reason') || 'Вы были заблокированы.'

  return (
    <div className='relative z-0 mx-auto flex flex-col items-center gap-1 self-center justify-self-center text-center'>
      <div className='relative z-0 h-[250px] w-[250px] overflow-hidden'>
        <Image
          src='/images/mascot-idk.PNG'
          alt='Маскот LDA Team'
          className='absolute z-0 h-full w-full object-cover'
          width={400}
          height={400}
          priority={true}
        />
      </div>
      <div className='flex flex-col'>
        <span className='text-foreground pointer-events-none absolute -top-[20%] left-1/2 z-[-1] -translate-x-1/2 font-[Roboto_Flex] text-[270px] font-bold opacity-30'>
          Бан
        </span>
        <h1 className='mb-2 max-w-[500px] text-lg text-balance'>{reason}</h1>
        <Button
          intent='outline'
          className='justify-center self-center py-2 transition hover:underline'
          icon={<LogOut width={18} height={18} />}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  )
}

export default Content
