'use client'

import Image from 'next/image'
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation'
import * as React from 'react'

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconLoader,
  IconProgressCheck,
} from '@tabler/icons-react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Badge,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui'

import { AnimeTitle } from '@/types/anime.types'
import { ANIME_STATUS_TITLE, ANIME_VOICEOVER_TYPE } from '@/utils/global-vars'
import { truncateText } from '@/utils/string'

import { MenuActions } from '..'
import ColumnSettings from './ColumnSettings'
import CreateTitle from './CreateTitle'
import GenreModal from './GenreModal'

const animeStatus: Record<string, React.ReactNode> = {
  0: <IconProgressCheck className='fill-yellow-500 dark:fill-yellow-400' />,
  1: <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />,
  2: <IconLoader />,
}

interface Props {
  data: AnimeTitle[]
  refetchData: () => Promise<void>
  totalCount: number
  searchParams: ReadonlyURLSearchParams
  page: number
  count: number
}

const AnimeTable: React.FC<Props> = ({
  data: initialData,
  totalCount,
  refetchData,
  searchParams,
  page,
  count,
}) => {
  const [data] = React.useState(() => initialData)
  const router = useRouter()
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns: ColumnDef<AnimeTitle>[] = [
    {
      accessorKey: 'Аниме',
      header: 'Аниме',
      cell: ({ row }) => {
        const imageUrl =
          row.original.images?.find((image) => image.imageType == '4')?.url ??
          '/images/placeholder-image.jpg'

        return (
          <div className='text-foreground/80 flex min-w-32 gap-1 font-thin'>
            <Image
              src={imageUrl}
              alt='Превью аниме'
              width={42}
              height={32}
              className='mr-2 inline-block aspect-[2/3] min-w-[42px] rounded object-cover'
            />
            <div className='flex flex-col gap-1'>
              <Tooltip>
                <TooltipTrigger className='inline-flex'>
                  {truncateText(row.original.name, 20)}
                </TooltipTrigger>
                {truncateText(row.original.name, 20).length !==
                  row.original.name.length && (
                  <TooltipContent side='top' align='center'>
                    {row.original.name}
                  </TooltipContent>
                )}
              </Tooltip>
              <Badge
                variant='secondary'
                className='text-muted-foreground px-1.5'
              >
                {animeStatus[row.original.currentTitleStatus]}
                {ANIME_STATUS_TITLE[row.original.currentTitleStatus]}
              </Badge>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'Озвучка',
      header: 'Озвучка',
      cell: ({ row }) => (
        <div className='text-foreground/80 min-w-6 font-normal'>
          <Badge
            variant='outline'
            className='px-1.5 text-sm font-normal dark:text-white/70'
          >
            {ANIME_VOICEOVER_TYPE[row.original.currentVoiceoverType]}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'Серии',
      header: 'Серии',
      cell: ({ row }) => (
        <div className='text-foreground/80 min-w-6 font-normal'>
          {row.original.episodes.length.toString()} /{' '}
          {row.original.episodesTotal}
        </div>
      ),
    },
    {
      accessorKey: 'Рейтинг',
      header: 'Рейтинг',
      cell: ({ row }) => (
        <div className='text-foreground/80 min-w-8 font-thin'>
          {row.original.rating}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Методы',
      cell: ({ row }) => (
        <MenuActions
          animeData={row.original}
          updateData={refetchData}
          titleId={row.original.id}
          episodesList={[...row.original.episodes]}
          episodesTotal={row.original.episodesTotal}
        />
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / count),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination: { pageIndex: page, pageSize: count },
    },
    manualPagination: true,
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: async (updater) => {
      const newPagination =
        typeof updater === 'function'
          ? updater({ pageIndex: page, pageSize: count })
          : updater

      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(newPagination.pageIndex))
      params.set('count', String(newPagination.pageSize))
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='w-full flex-col justify-start gap-6'>
      <div className='mb-1 flex items-center justify-end gap-4 px-4 md:mb-2 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          Таблица аниме
        </Label>
        {/* <Input
          placeholder='Поиск аниме'
          className='relative max-w-[400px] border-yellow-100 py-2'
          icon={
            <IconEdit
              stroke={2}
              className='pointer-events-none absolute top-[6px] left-[8px] z-[1] h-[22px] w-[22px] opacity-80'
            />
          }
        /> */}
        <div className='flex items-center gap-2'>
          <CreateTitle updateData={refetchData} />
          <GenreModal updateData={refetchData} />
          <ColumnSettings table={table} />
        </div>
      </div>
      <div className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted sticky top-0 z-10'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='**:data-[slot=table-cell]:first:w-8'>
              {table.getRowModel().rows?.length ? (
                <>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className='relative z-0'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    Нету результатов.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center px-4 md:justify-end'>
          <div className='flex w-full items-center gap-8 lg:w-fit'>
            <div className='hidden items-center gap-2 lg:flex'>
              <Label htmlFor='rows-per-page' className='text-sm font-medium'>
                Строк на странице
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-fit items-center justify-center text-sm font-medium'>
              Страница {table.getState().pagination.pageIndex + 1} из{' '}
              {table.getPageCount()}
            </div>
            <div className='ml-auto flex items-center gap-2 lg:ml-0'>
              <Button
                intent='outline'
                size='small'
                className='border-background hidden h-8 w-8 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                icon={<IconChevronsLeft width={20} height={24} />}
              >
                <span className='sr-only'>Перейти на первую страницу</span>
              </Button>
              <Button
                intent='outline'
                className='border-background size-8'
                size='small'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                icon={<IconChevronLeft />}
              >
                <span className='sr-only'>Перейти на предыдущую страницу</span>
              </Button>
              <Button
                intent='outline'
                className='border-background size-8'
                size='small'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                icon={<IconChevronRight />}
              >
                <span className='sr-only'>Перейти к следующей странице</span>
              </Button>
              <Button
                intent='outline'
                className='border-background hidden size-8 lg:flex'
                size='small'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                icon={<IconChevronsRight width={20} height={24} />}
              >
                <span className='sr-only'>Перейти к последней странице</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimeTable
