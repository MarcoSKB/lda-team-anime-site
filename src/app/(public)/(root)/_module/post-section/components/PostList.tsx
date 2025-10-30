import { Post } from '@/components/module'

import { getPostPreviewList } from '@/actions/post'

const PostList: React.FC = async () => {
  const res = await getPostPreviewList(0, 5, false)
  if (res.type == 'error') {
    return 'Произошла ошибка повторите попытку позже'
  }
  const postPreviewData = res.data.results

  return (
    <ul className='flex flex-col gap-2'>
      {postPreviewData.length == 0 ? (
        <span>Нету постов</span>
      ) : (
        postPreviewData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            slug={post.slug}
            type={post.postType}
            title={post.description}
            description={post.description}
            createdAt={post.createdAt}
          />
        ))
      )}
    </ul>
  )
}

export default PostList
