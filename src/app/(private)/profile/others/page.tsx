import { redirect } from 'next/navigation'

// import { changeAccountTheme } from '@/actions/account'

// import { Switch } from '@/components/ui'

// import useTheme from '@/hooks/useTheme'

const page: React.FC = async () => {
  redirect('/profile')

  // const { resolvedTheme } = useTheme()
  // const [isDarkTheme, setIsDarkTheme] = useState(resolvedTheme == 'dark')
  // const [isLoading, setIsLoading] = useState(false)

  // const themeSwitchHandler = async (switchIsDark: boolean) => {
  //   setIsLoading(true)
  //   if (!isLoading) setIsDarkTheme(switchIsDark)
  //   const res = await changeAccountTheme(switchIsDark ? 'Dark' : 'Light')
  //   if (res.type == 'error') {
  //     // Notify
  //   }
  //   if (res.type == 'ok') {
  //     // Notify
  //   }
  //   setIsLoading(false)
  // }

  // return (
  //   <div className='flex flex-col gap-1 py-4 md:px-6'>
  //     <span className='text-lg leading-[150%]'>Тема сайта</span>
  //     <div className='flex gap-2'>
  //       <Switch
  //         enabled={isDarkTheme}
  //         setEnabled={themeSwitchHandler}
  //         disabled={isLoading}
  //       />
  //       {isDarkTheme ? 'Темная' : 'Светлая'}
  //     </div>
  //   </div>
  // )
}

export default page
