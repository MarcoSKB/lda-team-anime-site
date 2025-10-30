import { IconMessages } from '@tabler/icons-react'

import { Button } from '@/components/ui'

interface Props {
  editor?: boolean
  isLoggedIn?: boolean
  openCommentEditor: () => void
}

const CommentActions: React.FC<Props> = (props) => {
  const { openCommentEditor, isLoggedIn, editor = true } = props

  return (
    <div className='flex items-center gap-1'>
      {editor && isLoggedIn && (
        <Button
          intent='primary'
          className='text-foreground flex items-center gap-1 px-2 py-2 hover:text-white'
          onClick={openCommentEditor}
        >
          <IconMessages width={20} height={20} /> Ответить
        </Button>
      )}
    </div>
  )
}

export default CommentActions
