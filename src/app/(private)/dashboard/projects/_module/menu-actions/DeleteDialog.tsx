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

import { deleteAnimeTitle } from '@/actions/anime'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  titleId: string
  updateData: () => Promise<void>
}

const DeleteDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpenChange, titleId, updateData } = props

  const onDelete = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const res = await deleteAnimeTitle(titleId)
      if (res.type == 'error') {
        reject(res.message)
      }
      resolve(res.type)
    })

    toast.promise(promise, {
      loading: `Удаление аниме...`,
      success: 'Аниме успешно удалено',
      error: (message) => message ?? 'Ошибка',
    })

    try {
      await promise
      await updateData()
    } catch {}
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Это действие окончательно удалит
            записи аниме из наших серверов.
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
