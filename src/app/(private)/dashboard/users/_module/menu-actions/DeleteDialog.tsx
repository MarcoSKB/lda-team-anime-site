'use client'

import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui'

import { deleteUserAccount } from '@/actions/dashboard'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  email: string
  refetch: () => Promise<void>
}

const DeleteDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpenChange, userId, email, refetch } = props

  const onDelete = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const res = await deleteUserAccount(userId, email)
      if (res.type == 'error') {
        reject(res.message)
      }
      resolve(res.type)
    })

    toast.promise(promise, {
      loading: `Удаление аккаунта...`,
      success: 'Аккаунт успешно удалено',
      error: (message) => message ?? 'Ошибка',
    })

    try {
      await promise
      refetch()
    } catch {}
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Это действие окончательно удалит
            данные пользователя из наших серверов.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction intent='destructive' onClick={onDelete}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
