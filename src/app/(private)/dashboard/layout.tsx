import { redirect } from 'next/navigation'

import { auth } from '@/utils/auth'

interface Props {
  children: React.ReactNode
}

const layout: React.FC<Props> = async ({ children }) => {
  const session = await auth()
  if (!session || session.user.permission !== 'admin') redirect('/')

  return <div>{children}</div>
}

export default layout
