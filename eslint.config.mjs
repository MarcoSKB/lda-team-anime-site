import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'react/display-name': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    },
  }),
]

export default eslintConfig
