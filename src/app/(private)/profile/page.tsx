import { Cake, CircleUserRound, Mail } from 'lucide-react'

import { Input } from '@/components/ui'

const page: React.FC = () => {
  return (
    <div className='flex max-w-[500px] flex-col gap-6 px-6 py-4'>
      <label className='flex flex-col gap-1.5'>
        <span className='text-lg leading-[150%]'>Имя пользователя</span>
        <Input
          size='large'
          placeholder='Satoru Gojo'
          icon={
            <CircleUserRound
              width={22}
              height={22}
              className='absolute top-1/2 left-[10px] -translate-y-1/2'
            />
          }
        />
      </label>
      <label className='flex flex-col gap-1.5'>
        <span className='text-lg leading-[150%]'>E-mail адрес</span>
        <Input
          size='large'
          placeholder='example@gmail.com'
          icon={
            <Mail
              width={22}
              height={22}
              className='absolute top-1/2 left-[10px] -translate-y-1/2'
            />
          }
        />
      </label>
      <label className='flex flex-col gap-1.5'>
        <span className='text-lg leading-[150%]'>День рождение</span>
        <Input
          type='date'
          size='large'
          min='1926-01-01'
          placeholder='31/12/2025'
          icon={
            <Cake
              width={22}
              height={22}
              className='absolute top-1/2 left-[10px] -translate-y-1/2'
            />
          }
          className='max-w-fit'
        />
      </label>
      <label className='flex flex-col gap-1.5'>
        <span className='text-lg leading-[150%]'>Смена пароля</span>
        <Input size='large' placeholder='Текущий пароль' />
        <Input size='large' placeholder='Новый пароль' />
      </label>
    </div>
  )
}

export default page
