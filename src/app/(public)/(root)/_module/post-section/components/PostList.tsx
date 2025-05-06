import { getPostPreviewList } from '@/actions/post'

import { Post } from '@/components/module'

const PostList: React.FC = async () => {
  const postPreviewData = await getPostPreviewList(5)

  return (
    <ul className='flex flex-col gap-2'>
      {postPreviewData.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </ul>
  )
}

export default PostList
