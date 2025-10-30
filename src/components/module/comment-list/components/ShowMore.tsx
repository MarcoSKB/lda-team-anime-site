'use client'

import { IconArrowDown, IconArrowUp } from '@tabler/icons-react'

import { Button } from '@/components/ui'

interface Props {
  setIsExpanded: () => void
  isExpanded: boolean
}

const ShowMore: React.FC<Props> = (props) => {
  const { setIsExpanded, isExpanded } = props

  return (
    <Button
      intent='primary'
      className='mx-auto flex items-center gap-1'
      onClick={setIsExpanded}
    >
      {isExpanded ? (
        <>
          Скрыть <IconArrowUp width={20} height={20} />
        </>
      ) : (
        <>
          Показать больше <IconArrowDown width={20} height={20} />
        </>
      )}
    </Button>
  )
}

export default ShowMore
