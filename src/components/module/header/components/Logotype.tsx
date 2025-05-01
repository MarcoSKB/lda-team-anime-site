import Image from 'next/image'
import Link from 'next/link'

const Logotype: React.FC = () => {
  return (
    <Link
      href='/'
      title='LDA Team | Главная страница'
      className='order-3 flex items-center gap-2 md:order-none'
    >
      <Image
        src='/images/logotype.jpg'
        width={40}
        height={40}
        alt='Иконка логотипа LDA Team'
        className='min-w-[40px] rounded-full'
      />
      <span className='dark:text-foreground hidden font-["Roboto_flex"] text-sm font-bold text-[#D15150] uppercase md:inline'>
        LDA Team
      </span>
    </Link>
  )
}

export default Logotype
