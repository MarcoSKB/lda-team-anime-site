'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { formatSlug } from '@/utils/query'

const slugToTitle = (slug: string): string => {
  const map: Record<string, string> = {
    products: 'Каталог',
    posts: 'Посты',
    schedule: 'Расписание',
    catalog: 'Каталог',
  }

  return map[slug] || formatSlug(slug)
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  segments.pop()
  if (segments.length <= 0) return null

  const crumbs = [
    { name: 'Главная', href: '/' },
    ...segments.map((slug, idx) => ({
      name: slugToTitle(slug),
      href: '/' + segments.slice(0, idx + 1).join('/'),
    })),
  ]

  return (
    <nav className='mb-2 flex gap-2.5 text-sm opacity-90'>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className='flex gap-2.5'>
          <Link
            href={crumb.href}
            className='text-foreground hover:text-accent font-[Roboto_Flex] transition-colors ease-in-out'
          >
            {crumb.name}
          </Link>
          <span className='pointer-events-none'>
            {i < crumbs.length - 1 && ' / '}
          </span>
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs
