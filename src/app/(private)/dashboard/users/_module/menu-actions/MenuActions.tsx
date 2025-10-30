'use client'

import { useEffect, useState } from 'react'

import { IconDotsVertical } from '@tabler/icons-react'
import { toast } from 'sonner'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'

import { unbanUserAccount } from '@/actions/dashboard'
import { DashboardUser } from '@/types/dashboard.types'

import BanDialog from './BanDialog'
import DeleteDialog from './DeleteDialog'

interface Props {
  user: DashboardUser
  refetch: () => Promise<void>
}

const MenuActions: React.FC<Props> = ({ user, refetch }) => {
  const [isActionOpen, setActionOpen] = useState(false)
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (!isDeleteDialogOpen || !isBanDialogOpen) {
      document.body.style.pointerEvents = ''
    }
    return () => {
      document.body.style.pointerEvents = ''
    }
  }, [isBanDialogOpen, isDeleteDialogOpen])

  const unbanHandler = async () => {
    const res = await unbanUserAccount(user.id)
    if (res.type == 'error') {
      toast.error(res.message)
    } else {
      refetch()
      toast.success(`Пользователь ${user.nickname} разбанен`)
    }
  }

  return (
    <>
      <DropdownMenu open={isActionOpen} onOpenChange={setActionOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            intent='default'
            className='data-[state=open]:bg-muted text-muted-foreground flex size-8 items-center justify-center'
            size='small'
          >
            <IconDotsVertical />
            <span className='sr-only'>Открыть меню</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-42'>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
              setActionOpen(false)
              requestAnimationFrame(() => setIsDeleteDialogOpen(true))
            }}
            className='text-destructive focus:text-destructive'
          >
            Удалить аккаунт
          </DropdownMenuItem>
          {user.isPermanentlyBanned || !!user.blockedUntil ? (
            <DropdownMenuItem onSelect={() => unbanHandler()}>
              Разблокировать
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                setActionOpen(false)
                requestAnimationFrame(() => setIsBanDialogOpen(true))
              }}
              className='text-destructive focus:text-destructive'
            >
              Заблокировать
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog
        userId={user.id}
        email={user.email}
        isOpen={isDeleteDialogOpen}
        refetch={refetch}
        onOpenChange={(open) => {
          setIsDeleteDialogOpen(open)
          if (open) setActionOpen(false)
          if (!open) document.body.style.pointerEvents = ''
        }}
      />
      <BanDialog
        userId={user.id}
        dialogOpen={isBanDialogOpen}
        refetch={refetch}
        dialogHandler={(open) => {
          setIsBanDialogOpen(open)
          if (open) setActionOpen(false)
          if (!open) document.body.style.pointerEvents = ''
        }}
      />
    </>
  )
}

export default MenuActions
