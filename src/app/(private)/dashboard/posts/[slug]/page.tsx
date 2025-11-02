import { getPost } from '@/actions/post'

import { PostForm } from './_module'

interface Props {
  params: Promise<{ slug: string }>
}

const page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const res = await getPost(slug)
  if (res.type == 'error') {
    return (
      <div className='container mx-auto py-10'>
        Произошла ошибка. Повторите повторите попытку
      </div>
    )
  }
  const postData = res.data
  return (
    <div>
      <PostForm initialValue={postData} />
    </div>
  )
}

export default page
