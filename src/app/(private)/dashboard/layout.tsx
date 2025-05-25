import { redirect } from 'next/navigation'

import { getUser } from '@/actions/account'

interface Props {
  children: React.ReactNode
}

const layout: React.FC<Props> = async ({ children }) => {
  const user = await getUser()
  if (user.type == 'error') redirect('/')
  if (user.data?.permission !== 'admin') redirect('/')

  return <div>{children}</div>
}

export default layout
