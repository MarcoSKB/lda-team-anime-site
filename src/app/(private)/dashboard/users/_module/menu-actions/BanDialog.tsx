import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Calendar,
  Form,
  Input,
  Label,
  Popover,
  Switch,
} from '@/components/ui'

import { banUserAccount } from '@/actions/dashboard'
import { BanFormData, banFormSchema } from '@/schemas/dashboard.schema'
import { cn } from '@/utils/cn'

interface Props {
  userId: string
  dialogOpen: boolean
  dialogHandler: (state: boolean) => void
  refetch: () => Promise<void>
}

const initialValue = {
  reason: '',
  blockedUntil: '',
  isPermanent: false,
}

const BanDialog: React.FC<Props> = (props) => {
  const { userId, dialogOpen, dialogHandler, refetch } = props
  const form = useForm<BanFormData>({
    defaultValues: initialValue,
    resolver: yupResolver(banFormSchema) as unknown as Resolver<BanFormData>,
  })

  const onSubmit: SubmitHandler<BanFormData> = async (data) => {
    const banUser = new Promise(async (resolve, reject) => {
      const res = await banUserAccount({
        userId,
        reason: data.reason,
        blockedUntil: new Date(data.blockedUntil).toISOString(),
        isPermanent: !!data.isPermanent,
      })
      if (res.type == 'error') reject(res.message)
      resolve(res.type)
    })

    toast.promise(banUser, {
      loading: 'Загрузка...',
      success: () => {
        form.reset(initialValue)
        return `Пользователь заблокирован`
      },
      error: (message) => {
        form.reset(initialValue)
        if (message) return message
        return 'Что-то пошло не так'
      },
    })

    try {
      await banUser
      await refetch()
    } catch {}
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={dialogHandler}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Блокировка</AlertDialogTitle>
          <AlertDialogDescription>
            Укажите причину и срок блокировки пользователя
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col space-y-8'
          >
            <div className='flex gap-4'>
              <div className='grid w-full gap-3'>
                <Label htmlFor='ban-date'>Причина</Label>
                <Input
                  id='ban-date'
                  {...form.register('reason', { required: true })}
                />
              </div>
              <div className='grid w-full gap-3'>
                <Label htmlFor='ban-date'>Навсегда</Label>
                <Controller
                  name='isPermanent'
                  control={form.control}
                  render={({ field }) => (
                    <Switch
                      enabled={field.value}
                      setEnabled={field.onChange}
                      disabled={false}
                    />
                  )}
                />
              </div>
            </div>
            <div className='grid w-full gap-3'>
              <Label htmlFor='ban-date'>Дата блокировки</Label>
              <Controller
                control={form.control}
                name='blockedUntil'
                render={({ field }) => (
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        id='ban-date'
                        intent='default'
                        className={cn(
                          'w-full border border-solid border-white/10 pl-3 text-left font-normal hover:bg-transparent active:hover:scale-100',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ru })
                        ) : (
                          <span>Выберите дату</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        locale={ru}
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        hidden={{ before: new Date() }}
                        disabled={{ before: new Date() }}
                        onSelect={field.onChange}
                        captionLayout='dropdown'
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <AlertDialogFooter className='flex w-full justify-between'>
              <AlertDialogCancel intent='primary' className='mr-auto'>
                Закрыть
              </AlertDialogCancel>
              <Button
                intent='destructive'
                type='submit'
                className='self-end'
                disabled={form.formState.isLoading}
                icon={
                  form.formState.isSubmitting && (
                    <LoaderCircle
                      width={22}
                      height={22}
                      className='animate-spin'
                    />
                  )
                }
              >
                Заблокировать
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BanDialog
