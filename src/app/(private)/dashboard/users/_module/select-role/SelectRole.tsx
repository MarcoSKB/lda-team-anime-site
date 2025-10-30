'use client'

import * as React from 'react'
import { useState, useTransition } from 'react'

import { Check, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'

import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui'

import { changeUserRole } from '@/actions/dashboard'
import { cn } from '@/utils/cn'
import { ROLE_LABELS } from '@/utils/global-vars'

interface SelectRolesProps {
  roles: string[]
  userId: string
}

const SelectRoleComponent: React.FC<SelectRolesProps> = ({
  userId,
  roles: initialRoles,
}) => {
  const [roles, setRoles] = useState(() => initialRoles)
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [, startTransition] = useTransition()

  const handleToggle = async (role: string) => {
    if (role === 'User') return
    setOpen(false)

    const newRoles = roles.includes(role)
      ? roles.filter((r) => r !== role)
      : [...roles, role]

    if (!newRoles.includes('User')) newRoles.push('User')
    startTransition(() => setRoles(newRoles))

    const promise = new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true)
        const res = await changeUserRole(userId, newRoles)
        if (res.type == 'error') reject(res.message)
        resolve('Ok')
      } catch (err) {
        reject(err)
      } finally {
        setIsLoading(false)
      }
    })

    toast.promise(promise, {
      loading: 'Редактирование ролей...',
      success: 'Роли успешно изменены',
      error: (error) => {
        if (error instanceof Error) {
          return error.message
        }
        if (typeof error === 'string') {
          return error
        }
        return 'Не удалось изменить роли'
      },
    })

    try {
      await promise
      setRoles(newRoles)
    } catch {
      startTransition(() => setRoles(initialRoles))
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          intent='secondary'
          role='combobox'
          aria-expanded={open}
          disabled={isLoading}
          className='w-[220px] justify-between active:hover:scale-100'
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className='overflow-x-hidden pr-4 text-xs'>
                {roles.length > 0
                  ? roles.map((role) => ROLE_LABELS[role]).join(', ')
                  : 'Выберите роли...'}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {roles.length > 0
                ? roles.map((role) => ROLE_LABELS[role]).join(', ')
                : 'Выберите роли...'}
            </TooltipContent>
          </Tooltip>
          <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[220px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {Object.entries(ROLE_LABELS).map(([role, label]) => (
                <CommandItem
                  key={role}
                  onSelect={() => handleToggle(role)}
                  className='cursor-pointer'
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      roles.includes(role) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export const SelectRole = React.memo(
  SelectRoleComponent,
  (prev, next) =>
    prev.userId === next.userId &&
    JSON.stringify(prev.roles) === JSON.stringify(next.roles),
)

export default SelectRole
