'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

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

import { deleteEpisode } from '@/actions/dashboard'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  episodeId: string
}

const DeleteEpisodeDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpenChange, episodeId } = props
  const [, startTransition] = useTransition()
  const router = useRouter()

  const onDelete = async () => {
    const promise = new Promise(async (resolve, reject) => {
      const res = await deleteEpisode(episodeId)
      if (res.type == 'error') {
        reject(res.message)
      }
      resolve(res.type)
      startTransition(() => router.refresh())
    })

    toast.promise(promise, {
      loading: `Удаление эпизода...`,
      success: 'Эпизод успешно удален',
      error: (message) => message ?? 'Ошибка',
    })

    try {
      await promise
    } catch {}
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Это действие окончательно удалит
            эпизод аниме из наших серверов.
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

export default DeleteEpisodeDialog
