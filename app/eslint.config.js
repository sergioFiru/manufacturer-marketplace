import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  // Base JavaScript rules
  js.configs.recommended,

  // Vue 3 rules
  ...pluginVue.configs['flat/recommended'],

  // Prettier compatibility (turns off conflicting rules)
  prettier,

  // Source code settings (browser environment)
  {
    files: ['src/**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-prop-types': 'off'
    }
  },

  // Config files (Node environment)
  {
    files: ['*.config.js', '*.config.cjs'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // Ignore dist and node_modules
  {
    ignores: ['dist/**', 'node_modules/**', '*.cjs']
  }
]
