import jsPlugin from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import mykolaiCrmPlugin from './eslint-plugin-mykolai-crm/index.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', 'eslint.config.mjs'] },
  { languageOptions: { globals: globals.node } },
  jsPlugin.configs.recommended,
  ...tsEslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['{src,test}/**/*.ts'],
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
  mykolaiCrmPlugin.configs.recommended,
  prettierPlugin,
];
