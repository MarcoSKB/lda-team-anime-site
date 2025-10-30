import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

import { ASSET_BASE } from '@/utils/global-vars'

interface Props {
  userAvatar?: string
}

const CommentAvatar: React.FC<Props> = ({ userAvatar }) => {
  let avatar = '/images/avatar-blank.jpg'

  if (userAvatar) avatar = `${ASSET_BASE}/api/files/image/${userAvatar}`

  return (
    <Avatar className='h-8 w-8 rounded-lg'>
      <AvatarImage src={avatar} alt='Аватар пользователя' />
      <AvatarFallback className='rounded-lg'>АВ</AvatarFallback>
    </Avatar>
  )
}

export default CommentAvatar
