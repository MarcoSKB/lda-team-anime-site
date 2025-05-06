import { MDXComponents } from 'next-mdx-remote-client/rsc'

import PostInfo from './post-info/PostInfo'

export const MdxComponents: MDXComponents = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className='text-foreground mb-2 font-[Roboto_Flex] text-3xl font-extrabold'
      {...props}
    />
  ),
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className='text-foreground my-2 font-[Roboto_Flex] text-2xl leading-[41px] font-semibold'
      {...props}
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p
      className='text-foreground mb-2 text-base leading-normal font-thin'
      {...props}
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong
      className='text-foreground text-base leading-normal font-semibold'
      {...props}
    />
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul className='mb-3 flex list-disc flex-col gap-1 pl-6' {...props} />
  ),
  PostInfo,
}
