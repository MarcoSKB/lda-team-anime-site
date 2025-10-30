'use client'

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import {
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowDownZA,
  ArrowUp10,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from 'lucide-react'

import { Button } from '@/components/ui'

import { useFilters } from '../filter-menu/hooks/useFilters'

const orderByList: { query: string; title: string; icon: React.ReactNode }[] = [
  {
    query: 'a-z',
    title: 'По названию (A-Z)',
    icon: <ArrowDownAZ width={20} height={20} />,
  },
  {
    query: 'z-a',
    title: 'По названию (Z-A)',
    icon: <ArrowDownZA width={20} height={20} />,
  },
  {
    query: 'episodes-asc',
    title: 'По эпизодам',
    icon: <ArrowUp10 width={20} height={20} />,
  },
  {
    query: 'episodes-desc',
    title: 'По эпизодам',
    icon: <ArrowDown10 width={20} height={20} />,
  },
  {
    query: 'popular-asc',
    title: 'По популярности',
    icon: <ArrowUpWideNarrow width={20} height={20} />,
  },
  {
    query: 'popular-desc',
    title: 'По популярности',
    icon: <ArrowDownWideNarrow width={20} height={20} />,
  },
]

const Order: React.FC = () => {
  const { filtersValue, setFiltersValue } = useFilters()

  return (
    <Listbox
      value={filtersValue.order ?? 'a-z'}
      defaultValue={filtersValue.order}
      onChange={(value) => setFiltersValue({ ...filtersValue, order: value })}
    >
      <ListboxButton
        as={Button}
        intent='secondary'
        icon={<ArrowUpDown height={19} width={19} />}
      >
        {orderByList.find((order) => order.query == filtersValue.order)
          ?.title ?? 'Сортировка'}
      </ListboxButton>
      <ListboxOptions
        as='ul'
        transition
        anchor='bottom end'
        className='bg-secondary z-[55] mt-2 flex w-[152px] min-w-[185px] origin-top flex-col rounded-md px-1 py-2 transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        {orderByList.map((item) => (
          <ListboxOption
            as='li'
            key={item.query}
            value={item.query}
            disabled={filtersValue.order == item.query}
            className='hover:text-accent group data-[disabled]:hover:text-foreground data-[focus]:text-accent line-clamp-1 flex cursor-pointer items-center gap-2 px-2 py-1 text-[12px] transition ease-in-out data-[disabled]:cursor-default data-[disabled]:select-none'
          >
            {item.icon}
            {item.title}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

export default Order
