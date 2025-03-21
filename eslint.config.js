// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  ignores: [
    '.github/**',
    '.vscode/**',
  ],
  rules: {
    'style/semi': ['error', 'always'],
    'no-console': ['warn'],
    'curly': ['error', 'multi-or-nest'],
  },
})
