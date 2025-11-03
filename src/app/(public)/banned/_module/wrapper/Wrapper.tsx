'use client'

import { Suspense } from 'react'

import Content from '../content/Content'

const Wrapper = () => (
  <Suspense>
    <Content />
  </Suspense>
)

export default Wrapper
