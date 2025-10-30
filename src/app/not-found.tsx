import Image from 'next/image'
import Link from 'next/link'

const NotFoundPage: React.FC = () => {
  return (
    <div className='flex flex-1'>
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
            404
          </span>
          <h1 className='max-w-[500px] text-lg text-balance'>
            Упс! Кажется, вы забрели не туда. Страница, которую вы ищете, не
            существует или была удалена.
          </h1>
          <Link
            href='/'
            className='text-link hover:text-link/80 inline-block py-2 transition hover:underline'
          >
            Перейти на главную страницу
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
