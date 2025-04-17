import { TitleInfo } from './_module'

interface Props {
  params: Promise<{ slug: string }>
}

const page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  return (
    <div className='md:pt-[72px]'>
      <TitleInfo slug={slug} />
    </div>
  )
}

export default page
