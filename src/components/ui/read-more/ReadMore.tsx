'use client'

import { useState } from 'react'

import { truncateText } from '@/utils/string'

interface Props {
  children: string
  maxLength?: number
  className?: string
}

const ReadMore: React.FC<Props> = (props) => {
  const { children, maxLength = 10, className } = props
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='flex flex-col'>
      <span className={className}>
        {truncateText(children, isExpanded ? Infinity : maxLength)}
      </span>
      {maxLength < children.length && (
        <button
          type='button'
          onClick={() => setIsExpanded(!isExpanded)}
          className='text-link w-auto cursor-pointer self-start py-1 text-sm transition-opacity ease-in-out hover:opacity-70'
        >
          {isExpanded ? 'Свернуть' : 'Подробнее...'}
        </button>
      )}
    </div>
  )
}

export default ReadMore
