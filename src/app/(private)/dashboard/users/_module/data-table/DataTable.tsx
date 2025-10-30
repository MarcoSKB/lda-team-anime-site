'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useMemo } from 'react'

import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
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

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
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
} from '@/components/ui'

import { DashboardUser } from '@/types/dashboard.types'

import { MenuActions, SelectRole } from '..'

interface Props {
  data: DashboardUser[]
  totalCount: number
  refetch: () => Promise<void>
}

const RoleCell: React.FC<{ row: Row<DashboardUser> }> = ({ row }) => {
  const userId = row.original.id
  const roles = React.useMemo(() => row.original.roles, [row.original.roles])

  return <SelectRole userId={userId} roles={roles} />
}

export const DataTable: React.FC<Props> = ({ data, totalCount, refetch }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const pageIndex = Number(searchParams.get('page') ?? 0)
  const pageSize = Number(searchParams.get('count') ?? 10)

  const columns = useMemo<ColumnDef<DashboardUser>[]>(
    () => [
      {
        accessorKey: 'Пользователь',
        header: 'Пользователь',
        cell: ({ row }) => (
          <div className='text-foreground/80 min-w-32 font-thin'>
            {row.original.nickname}
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
            {row.original.emailConfirmed ? (
              <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
            ) : (
              <IconLoader />
            )}
            {row.original.emailConfirmed ? 'Потвержден' : 'Не потвержден'}
          </Badge>
        ),
      },
      {
        accessorKey: 'Роль',
        header: () => <div className='w-full'>Роль</div>,
        cell: ({ row }) => <RoleCell row={row} />,
      },
      {
        id: 'actions',
        header: 'Методы',
        cell: ({ row }) => (
          <MenuActions user={row.original} refetch={refetch} />
        ),
      },
    ],
    [data],
  )

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination: { pageIndex, pageSize },
    },
    manualPagination: true,
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: async (updater) => {
      const newPagination =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater

      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(newPagination.pageIndex))
      params.set('count', String(newPagination.pageSize))
      router.replace(`?${params.toString()}`, { scroll: false })
      router.refresh()
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
