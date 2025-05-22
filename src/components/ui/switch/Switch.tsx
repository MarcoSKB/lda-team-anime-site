'use client'

import { Switch as SwitchHeadless } from '@headlessui/react'

interface Props {
  enabled: boolean
  setEnabled: (bool: boolean) => void
  disabled: boolean
}

const Switch: React.FC<Props> = ({ enabled, setEnabled, disabled }) => {
  return (
    <SwitchHeadless
      checked={enabled}
      onChange={setEnabled}
      disabled={disabled}
      className='group bg-foreground inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition disabled:cursor-default disabled:opacity-90'
    >
      <span className='bg-background group-data-checked:bg-accent size-4 translate-x-1 rounded-full transition group-data-checked:translate-x-6' />
    </SwitchHeadless>
  )
}

export default Switch
