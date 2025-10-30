'use client'

import { useState } from 'react'

import { cn } from '@/utils/cn'

interface Props {
  children: React.ReactNode
}

const Spoiler: React.FC<Props> = ({ children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <button
      type='button'
      className={cn(
        'spoiler inline-block cursor-pointer px-1 select-none',
        !visible
          ? 'text-link underline decoration-dashed'
          : 'bg-link/20 font-normal',
      )}
      onClick={() => setVisible((v) => !v)}
    >
      {visible ? `[ ${children} ]` : 'спойлер'}
    </button>
  )
}

export default Spoiler
