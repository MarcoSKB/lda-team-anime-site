import { Suspense } from 'react'

import { TitleInfo, TitleInfoSkeleton } from './_module'

interface Props {
  params: Promise<{ slug: string }>
}

const page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  return (
    <div className='md:pt-[72px]'>
      <Suspense fallback={<TitleInfoSkeleton/>}>
      <TitleInfo slug={slug} />
      </Suspense>
    </div>
  )
}

export default page
