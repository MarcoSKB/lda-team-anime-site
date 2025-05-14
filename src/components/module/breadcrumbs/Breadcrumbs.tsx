'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'
import { BREADCRUMB_LABELS } from '@/utils/global-vars'
import { formatSlug } from '@/utils/query'

interface Props {
  hideLastLink?: boolean
}

const Breadcrumbs: React.FC<Props> = ({ hideLastLink = false }) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (hideLastLink) segments.pop()
  if (segments.length <= 0) return null

  const crumbs = [
    { name: 'Главная', href: '/' },
    ...segments.map((slug, idx) => ({
      name: BREADCRUMB_LABELS[slug] || formatSlug(slug),
      href: '/' + segments.slice(0, idx + 1).join('/'),
    })),
  ]

  return (
    <nav className='mb-2 flex gap-2.5 text-sm opacity-90'>
      {crumbs.map((crumb, idx) => (
        <span key={crumb.href} className='flex gap-2.5'>
          <Link
            href={crumb.href}
            className={cn(
              'text-foreground hover:text-accent font-[Roboto_Flex] transition-colors ease-in-out',
              idx == crumbs.length - 1
                ? 'hover:text-foreground pointer-events-none'
                : '',
            )}
          >
            {crumb.name}
          </Link>
          <span className='pointer-events-none'>
            {idx < crumbs.length - 1 && ' / '}
          </span>
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs
