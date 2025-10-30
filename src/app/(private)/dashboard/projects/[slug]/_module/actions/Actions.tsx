'use client'

import { useState } from 'react'

import { IconEdit, IconTrashX } from '@tabler/icons-react'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui'

import { AnimeEpisode } from '@/types/anime.types'

import DeleteEpisodeDialog from '../delete-episode-dialog/DeleteEpisodeDialog'
import EditEpisodeDialog from '../edit-episode-dialog/EditEpisodeDialog'

interface Props {
  episodesList: AnimeEpisode[] | []
  episodeTotal: number
  episode: AnimeEpisode
  episodeId: string
}

const MenuActions: React.FC<Props> = ({
  episodesList,
  episodeTotal,
  episode,
  episodeId,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  return (
    <div className='ml-2 flex gap-2'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            intent='secondary'
            size='small'
            onClick={() => setEditDialogOpen(true)}
          >
            <IconEdit width={20} height={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Редактировать эпизод</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            intent='secondary'
            size='small'
            className='hover:bg-destructive group'
            onClick={() => setDeleteDialogOpen(true)}
          >
            <IconTrashX
              width={20}
              height={20}
              className='dark:text-white dark:group-hover:text-white'
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Удалить эпизод</p>
        </TooltipContent>
      </Tooltip>
      <DeleteEpisodeDialog
        episodeId={episodeId}
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
      <EditEpisodeDialog
        episodesList={episodesList}
        episodesTotal={episodeTotal}
        initialValue={episode}
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  )
}
export default MenuActions
