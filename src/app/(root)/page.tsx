import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex gap-2 text-lg'>
      <Link href='/catalog'>Каталог</Link>
      <Link href='/schedule'>Расписания</Link>
      <Link href='/voiceover'>Заказать озвучку</Link>
    </div>
  )
}
