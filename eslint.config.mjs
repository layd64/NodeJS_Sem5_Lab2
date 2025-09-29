// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  { ignores: ['eslint.config.mjs'] },

  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Import plugin legacy presets via compat (instead of importPlugin.configs.*)
  ...compat.extends('plugin:import/recommended', 'plugin:import/typescript'),

  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
      sourceType: 'commonjs',
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    settings: {
      'import/resolver': { typescript: true, node: true },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Emulate common Airbnb constraints (non-formatting, Prettier-safe)
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'error',
      'object-shorthand': ['error', 'always'],
      'no-param-reassign': ['error', { props: false }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'no-underscore-dangle': ['error', { allowAfterThis: false, allowAfterSuper: false }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'class-methods-use-this': 'off',

      // Imports discipline
      'import/order': ['warn', {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      }],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: ['**/test/**', '**/*.spec.ts', '**/*.e2e-spec.ts'],
      }],
      'import/extensions': 'off', // TS resolves extensions
    },
  },
);