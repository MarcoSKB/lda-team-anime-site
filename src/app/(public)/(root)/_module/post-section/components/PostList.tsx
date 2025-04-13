import { getPostPreviewList } from '@/actions/post'

import PostItem from './PostItem'

const PostList: React.FC = async () => {
  const postPreviewData = await getPostPreviewList()

  return (
    <ul className='flex flex-col gap-2'>
      {postPreviewData.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </ul>
  )
}

export default PostList
