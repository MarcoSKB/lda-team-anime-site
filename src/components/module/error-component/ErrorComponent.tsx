import Link from 'next/link'

import { ArrowRightIcon } from 'lucide-react'

const ErrorComponent: React.FC = () => {
  return (
    <div className='bg-secondary mx-auto flex max-w-xl flex-col items-center gap-1 rounded-md px-2 py-4 text-center shadow-xl'>
      <span className='text-xl font-semibold'>Упс! Что-то не сработало.</span>
      <p className='mb-3 text-base text-[15px] text-balance'>
        Возможно, проблема временная - попробуйте ещё раз чуть позже.
      </p>
      <Link
        href='/'
        className='text-link group hover:text-foreground flex items-center gap-1 transition-colors'
      >
        Вернуться в главную страницу
        <ArrowRightIcon
          width={22}
          height={22}
          className='leading-normal transition ease-in-out group-hover:translate-x-2'
        />
      </Link>
    </div>
  )
}

export default ErrorComponent
