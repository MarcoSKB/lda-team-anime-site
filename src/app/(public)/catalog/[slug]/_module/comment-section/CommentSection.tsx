import { CommentEditor, CommentList } from '@/components/module'
import { Container } from '@/components/ui'

import { getComments } from '@/actions/comment'
import { auth } from '@/utils/auth'

interface Props {
  titleId: string
  slug: string
}

const CommentSection: React.FC<Props> = async ({ titleId, slug }) => {
  const res = await getComments(slug)
  const session = await auth()

  if (res && res.type == 'error') {
    return <div>Не удалось загрузить комментарии. Повторите попытку позже.</div>
  }

  return (
    <Container className='flex flex-col gap-5 py-8'>
      <CommentEditor titleId={titleId} isLoggedIn={!!session} />
      <CommentList
        titleId={titleId}
        isLoggedIn={!!session}
        comments={res.data.results}
      />
    </Container>
  )
}

export default CommentSection
