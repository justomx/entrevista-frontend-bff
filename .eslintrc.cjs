/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: [
    'standard-with-typescript',
    'prettier',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules'],
  plugins: ['prettier', 'promise'],
  overrides: [
    {
      files: '**/*.spec.ts',
      parserOptions: {
        project: './tsconfig.spec.json',
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    {
      files: '.eslintrc.cjs',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/space-before-function-paren': 'off',
    'no-console': 'warn',
  },
}
