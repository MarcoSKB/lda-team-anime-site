'use client'

import { DayPicker } from 'react-day-picker'
import { ru } from 'react-day-picker/locale'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Cake } from 'lucide-react'

const dayPickerStyles = {
  today: `border-white`,
  selected: `bg-accent rounded-sm border-accent text-white`,
  root: 'p-4',
  chevron: 'fill-accent',
  day: 'text-center hover:text-accent data-selected:hover:text-white',
  dropdowns: 'flex gap-3 justify-center',
  dropdown: 'absolute top-0 left-0 w-full h-full opacity-[1%]',
  dropdown_root:
    'relative min-w-fit focus-within:outline focus-within:outline-accent',
  caption_label: 'flex gap-1 capitalize items-center',
  month_caption: 'mb-2 text-base',
  day_button: 'p-1.5 cursor-pointer w-full ease-in-out animate',
  months_dropdown: 'bg-secondary capitalize rounded-sm text-foreground',
  years_dropdown: 'bg-secondary rounded-sm text-foreground',
}

interface Props {
  selected: string | undefined
  onChange: (date: string) => void
  disabled: boolean
}

const BirthdayPicker: React.FC<Props> = ({ selected, onChange, disabled }) => {
  const dateValue = selected
    ? `${new Date(selected).getDate()}/${new Date(selected).getMonth() + 1}/${new Date(selected).getFullYear()}`
    : 'Введите дату'

  return (
    <Popover className='relative z-20'>
      <PopoverButton className='bg-secondary data-focus:outline-accent focus:outline-accent relative z-0 flex w-fit cursor-pointer self-start rounded-md px-3 py-2 pl-[40px] font-[Inter] outline-transparent transition-colors data-focus:outline-2'>
        <span className='text-foreground text-base opacity-50'>
          {dateValue}
        </span>
        <Cake
          width={22}
          height={22}
          className='absolute top-1/2 left-[10px] -translate-y-1/2'
        />
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: 'bottom start', gap: '12px' }}
        className='dark:bg-secondary flex min-w-fit scroll-mt-10 flex-col rounded-md bg-white shadow-lg'
      >
        <DayPicker
          locale={ru}
          selected={selected ? new Date(selected) : undefined}
          onSelect={(date) => onChange(date.toISOString())}
          disabled={disabled}
          classNames={dayPickerStyles}
          captionLayout='dropdown'
          hideNavigation
          required
          mode='single'
        />
      </PopoverPanel>
    </Popover>
  )
}

export default BirthdayPicker
