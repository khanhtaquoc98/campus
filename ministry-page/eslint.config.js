import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Console rules
      'no-console': ['warn', {
        allow: ['warn', 'error'],
      }],
      'no-debugger': 'warn',

      // React rules
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Code style
      'quotes': ['error', 'single', {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }],
      'jsx-quotes': ['error', 'prefer-double'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      }],
      'indent': ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],

      // Best practices
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'no-eval': 'error',
      'no-useless-return': 'error',
      'no-duplicate-imports': 'error',

      // Code quality
      'max-depth': ['warn', 4],
      'max-params': ['warn', 5],
    },
  },
]
