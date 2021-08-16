export default {
  plugins: ['typescript-sort-keys'],
  rules: {
    'typescript-sort-keys/interface': 'error' as const,
    'typescript-sort-keys/string-enum': 'error' as const,
  },
}
