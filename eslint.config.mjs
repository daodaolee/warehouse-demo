import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // 让ESLint使用Prettier的规则
      'prettier/prettier': 'error',
      // 禁用与Prettier冲突的规则
      'max-len': 'off',
      // 保留ESLint的代码质量规则
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];

export default eslintConfig;
