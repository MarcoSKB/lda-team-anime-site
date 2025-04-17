'use client'

import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useState } from 'react'

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
  ArrowUpDown,
} from 'lucide-react'

import { Button } from '@/components/ui'

import { updateQuery } from '@/utils/query'

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
    query: 'episodes',
    title: 'По кол-во эпизодов',
    icon: <ArrowDown10 width={20} height={20} />,
  },
  {
    query: 'popular',
    title: 'По популярности',
    icon: <ArrowDownWideNarrow width={20} height={20} />,
  },
]

const Order: React.FC = () => {
  const [selectedOrderBy, setSelectedOrderBy] = useState(orderByList[3])
  const searchParams = useSearchParams()

  const onSelectHandler = (
    data: typeof selectedOrderBy,
    searchParams: ReadonlyURLSearchParams,
  ) => {
    setSelectedOrderBy(data)
    updateQuery('order', selectedOrderBy.query, searchParams)
  }

  return (
    <Listbox
      value={selectedOrderBy}
      onChange={(data) => onSelectHandler(data, searchParams)}
    >
      <ListboxButton
        as={Button}
        intent='secondary'
        icon={<ArrowUpDown height={19} width={19} />}
      >
        {selectedOrderBy.title}
      </ListboxButton>
      <ListboxOptions
        as='ul'
        transition
        anchor='bottom'
        className='bg-secondary z-[55] mt-2 flex w-[152px] min-w-[185px] origin-top flex-col rounded-md px-1 py-2 transition ease-out data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        {orderByList.map((item) => (
          <ListboxOption
            as='li'
            key={item.query}
            value={item}
            disabled={selectedOrderBy.query == item.query}
            className='hover:text-accent group data-[disabled]:hover:text-foreground data-[focus]:text-accent flex cursor-pointer items-center gap-2 px-2 py-1.5 text-[13px] text-nowrap transition ease-in-out data-[disabled]:cursor-default data-[disabled]:select-none'
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
