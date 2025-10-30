'use client'

import { memo, useEffect, useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'

import { getGenres } from '@/actions/genres'

import CreateGenreForm from '../create-genre-form/CreateGenreForm'
import DeleteGenreForm from '../delete-genre-form/DeleteGenreForm'

interface Props {
  updateData: () => Promise<void>
}

const GenreModal: React.FC<Props> = ({ updateData }) => {
  const [autoTags, setAutoTags] = useState<{ id: string; label: string }[]>([])
  useEffect(() => {
    const updateAutoComplete = async () => {
      const res = await getGenres()
      if (res.type == 'ok') {
        const genres = res.data
        setAutoTags(
          genres.map((genre) => ({ id: genre.id, label: genre.name })),
        )
      }
    }
    updateAutoComplete()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button intent='secondary'>Жанры</Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] w-full max-w-[512px] overflow-y-auto'>
        <DialogTitle>Управление</DialogTitle>
        <div className='flex w-full flex-col gap-6'>
          <Tabs defaultValue='create'>
            <TabsList className='mb-3 w-full'>
              <TabsTrigger value='create' asChild>
                <Button intent='outline'>Создать жанры</Button>
              </TabsTrigger>
              <TabsTrigger value='delete' asChild>
                <Button intent='outline'>Удалить жанры</Button>
              </TabsTrigger>
            </TabsList>
            <TabsContent value='create' className='w-full'>
              <CreateGenreForm updateData={updateData} autoTags={autoTags} />
            </TabsContent>
            <TabsContent value='delete' className='w-full'>
              <DeleteGenreForm updateData={updateData} autoTags={autoTags} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default memo(GenreModal)
