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

import { deleteImage } from '@/actions/image'

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  imageId?: string
  updateData: () => Promise<void>
}

const DeleteBannerDialog: React.FC<Props> = (props) => {
  const { isOpen, onOpenChange, imageId, updateData } = props

  const onDelete = async () => {
    const promise = new Promise(async (resolve, reject) => {
      if (!imageId) return reject('Нету изображения')

      const res = await deleteImage(imageId)
      if (res.type == 'error') {
        reject(res.message)
      }
      resolve(res.type)
    })

    toast.promise(promise, {
      loading: `Удаление баннера...`,
      success: 'Баннер успешно удален',
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
            баннер аниме из наших серверов.
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

export default DeleteBannerDialog
