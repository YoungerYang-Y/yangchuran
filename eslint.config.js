// eslint.config.js
import antfu from '@antfu/eslint-config'
import prettier from 'eslint-config-prettier'

export default antfu(
  {
    formatters: true,
    ignores: ['.github/**', '.vscode/**'],
    rules: {
      'no-console': ['warn'],
      curly: ['error', 'multi-or-nest'],
    },
  },
  prettier,
)
