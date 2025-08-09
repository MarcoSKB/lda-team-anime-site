'use client'

import * as React from 'react'

import { type UniqueIdentifier } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader,
  IconUser,
} from '@tabler/icons-react'
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
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
import { toast } from 'sonner'
import { z } from 'zod'

import { Badge, Input } from '@/components/ui'
import { Button } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Label } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'

export const schema = z.object({
  id: z.number(),
  user: z.string(),
  email: z.string(),
  status: z.string(),
  role: z.string(),
})

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: 'Пользователь',
    header: 'Пользователь',
    cell: ({ row }) => (
      <div className='text-foreground/80 min-w-32 font-thin'>
        {row.original.user}
      </div>
    ),
  },
  {
    accessorKey: 'почта',
    header: 'Почта',
    cell: ({ row }) => (
      <div className='text-muted-foreground w-32 px-1.5'>
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: 'Статус',
    header: 'Статус почты',
    cell: ({ row }) => (
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {row.original.status === 'Подтвержден' ? (
          <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'Роль',
    header: () => <div className='w-full'>Роль</div>,
    cell: ({ row }) => (
      <Select
        defaultValue={'user'}
        // Get initial role from user data
        onValueChange={(role) => {
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Смена роли на ${role}`,
            success: 'Успешно',
            error: 'Ошибка',
          })
        }}
        // Change role
      >
        <SelectTrigger
          className='w-36 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate'
          size='sm'
          id={`${row.original.id}-reviewer`}
        >
          <SelectValue placeholder='Роль пользователя' />
        </SelectTrigger>
        <SelectContent align='center'>
          <SelectItem value='admin'>Админ</SelectItem>
          <SelectItem value='user'>Пользователь</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    id: 'actions',
    header: 'Методы',
    cell: () => (
      <DropdownMenu>
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
        <DropdownMenuContent align='end' className='w-32'>
          <DropdownMenuItem variant='destructive'>
            Заблокировать
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const DraggableRow = ({ row }: { row: Row<z.infer<typeof schema>> }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export const DataTable = ({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) => {
  const [data] = React.useState(() => initialData)
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='w-full flex-col justify-start gap-6'>
      <div className='mb-1 flex items-center justify-between gap-4 px-4 md:mb-2 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          Таблицы
        </Label>
        <Input
          placeholder='Поиск пользователей'
          className='relative max-w-[400px] border-yellow-100 py-2'
          icon={
            <IconUser
              stroke={2}
              className='pointer-events-none absolute top-[6px] left-[8px] z-[1] h-[22px] w-[22px] opacity-80'
            />
          }
        />
        <Select defaultValue='users'>
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'
          >
            <SelectValue placeholder='Выберите' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='users'>Пользователи</SelectItem>
            <SelectItem value='admins'>Админы</SelectItem>
            <SelectItem value='moders'>Модераторы</SelectItem>
            <SelectItem value='banneds'>Забаненые</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                intent='outline'
                size='small'
                className='border-background'
              >
                <span className='sr-only'>Настройка столбцов</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide(),
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
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
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
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
