
import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig([
  // Ignored files and directories
  {
    ignores: [
      '**/.eslintrc.js',
      '**/postgres/**',
      '**/dist/**',
      '**/node_modules/**'
    ]
  },

  {
    files: ['**/*.ts'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended
    ],

    languageOptions: {
      sourceType: 'module',

      globals: {
        ...globals.node,
        ...globals.vitest
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir
      }
    },

    plugins: {
      '@stylistic': stylistic
    },

    rules: {
      // TypeScript
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      // General
      'require-await': 'error',

      // Stylistic
      '@stylistic/eol-last': 'error',
      '@stylistic/no-multiple-empty-lines': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/comma-spacing': [
        'error',
        { before: false, after: true }
      ],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/block-spacing': 'error',
      '@stylistic/list-style': [
        'error',
        {
          empty: 'ignore',

          singleLine: {
            spacing: 'never'
          },

          multiLine: {
            minItems: 0
          },

          overrides: {
            '{}': {
              singleLine: {
                spacing: 'always'
              }
            }
          }
        }
      ],
      '@stylistic/max-len': ['error', { code: 120 }],
      '@stylistic/key-spacing': 'error',
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/type-annotation-spacing': 'error',
      '@stylistic/no-multi-spaces': 'error',

      '@stylistic/indent': [
        'warn',
        2,
        {
          ignoredNodes: [
            'FunctionExpression > .params[decorators.length > 0]',
            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
          ]
        }
      ]
    }
  }
])
