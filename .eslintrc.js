module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-console': 'warn',
  },
  ignorePatterns: ['node_modules/', 'dist/', '.next/', 'out/'],
  overrides: [
    {
      files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      settings: {
        react: { version: 'detect' },
      },
    },
    {
      files: ['backend/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
      },
    },
  ],
};