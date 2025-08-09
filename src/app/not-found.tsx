import Link from 'next/link'

const NotFoundPage: React.FC = () => {
  return (
    <div className='flex flex-1'>
      <div className='mx-auto self-center justify-self-center text-center'>
        <span className='text-foreground font-[Roboto_Flex] text-9xl font-bold'>
          404
        </span>
        <h1 className='text-lg text-balance'>
          Cтраница, которую вы ищете, не найдена
        </h1>
        <Link
          href='/'
          className='text-link hover:text-link/80 inline-block py-2 transition'
        >
          Перейти на главную страницу
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
