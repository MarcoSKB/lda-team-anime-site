'use server'

import { redirect } from 'next/navigation'

import { postListData, postsData } from '@/data/postsData'
import { sleep } from '@/utils/system'

export const getPostPreviewList = async (qtty?: number) => {
  await sleep(3000)

  //Revalidate 1 hour
  return postsData.slice(0, qtty)
}

export const getPost = async (postSlug: string) => {
  await sleep(3000)
  //Revalidate 3 hour
  const post = postListData.find((post) => post.slug == postSlug)

  if (!post) return redirect('/posts')
  return post
}
