'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { IconDotsVertical } from '@tabler/icons-react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'

import { AnimeEpisode, AnimeTitle } from '@/types/anime.types'

import BannerDialog from './BannerDialog'
import ChangeDataDialog from './ChangeDataDialog'
import DeleteBannerDialog from './DeleteBannerDialog'
import DeleteDialog from './DeleteDialog'
import SeriesDialog from './SeriesDialog'

interface Props {
  animeData: AnimeTitle
  titleId: string
  episodesList: AnimeEpisode[] | []
  episodesTotal: number
  updateData: () => Promise<void>
}

const MenuActions: React.FC<Props> = ({
  animeData,
  titleId,
  episodesList,
  episodesTotal,
  updateData,
}) => {
  const [isMenuActionsOpen, setIsMenuActionsOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [seriesDialogOpen, setSeriesDialogOpen] = useState(false)
  const [bannerDialogOpen, setBannerDialogOpen] = useState(false)
  const [deleteBannerDialogOpen, setDeleteBannerDialogOpen] = useState(false)
  const [changeDataDialogOpen, setChangeDataDialogOpen] = useState(false)

  useEffect(() => {
    const anyDialogOpen =
      deleteDialogOpen ||
      seriesDialogOpen ||
      changeDataDialogOpen ||
      bannerDialogOpen ||
      deleteBannerDialogOpen

    if (anyDialogOpen) {
      document.body.style.pointerEvents = ''
    }
    return () => {
      document.body.style.pointerEvents = ''
    }
  }, [
    deleteDialogOpen,
    seriesDialogOpen,
    changeDataDialogOpen,
    bannerDialogOpen,
    deleteBannerDialogOpen,
  ])

  return (
    <>
      <DropdownMenu
        open={isMenuActionsOpen}
        onOpenChange={setIsMenuActionsOpen}
      >
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
            onSelect={() => {
              setChangeDataDialogOpen(true)
            }}
          >
            Изменить аниме
          </DropdownMenuItem>
          {episodesList.length > 0 && (
            <DropdownMenuItem>
              <Link href={`/dashboard/projects/${animeData.slug}`}>
                Списки эпизодов
              </Link>
            </DropdownMenuItem>
          )}

          {episodesList.length !== episodesTotal && (
            <DropdownMenuItem
              onSelect={() => {
                setSeriesDialogOpen(true)
              }}
            >
              Добавить серию
            </DropdownMenuItem>
          )}
          {!animeData.images.find((image) => image.imageType == '5') ? (
            <DropdownMenuItem
              onSelect={() => {
                setBannerDialogOpen(true)
              }}
            >
              Добавить баннер
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={() => {
                setDeleteBannerDialogOpen(true)
              }}
              className='text-destructive focus:text-destructive'
            >
              Удалить баннер
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onSelect={() => {
              setDeleteDialogOpen(true)
            }}
            className='text-destructive focus:text-destructive'
          >
            Удалить аниме
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        updateData={updateData}
        titleId={titleId}
        isOpen={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open)
          if (!open) document.body.style.pointerEvents = ''
        }}
      />
      <SeriesDialog
        updateData={updateData}
        episodesTotal={episodesTotal}
        titleId={titleId}
        isOpen={seriesDialogOpen}
        episodesList={episodesList}
        onOpenChange={(open) => setSeriesDialogOpen(open)}
      />
      <ChangeDataDialog
        updateData={updateData}
        anime={animeData}
        isOpen={changeDataDialogOpen}
        onOpenChange={(open) => {
          setChangeDataDialogOpen(open)
          if (!open) document.body.style.pointerEvents = ''
        }}
      />
      <BannerDialog
        updateData={updateData}
        anime={animeData}
        isOpen={bannerDialogOpen}
        onOpenChange={(open) => {
          setBannerDialogOpen(open)
          if (!open) document.body.style.pointerEvents = ''
        }}
      />
      <DeleteBannerDialog
        updateData={updateData}
        imageId={animeData.images.find((image) => image.imageType == '5')?.id}
        isOpen={deleteBannerDialogOpen}
        onOpenChange={(open) => {
          setDeleteBannerDialogOpen(open)
          if (!open) document.body.style.pointerEvents = ''
        }}
      />
    </>
  )
}
export default MenuActions
