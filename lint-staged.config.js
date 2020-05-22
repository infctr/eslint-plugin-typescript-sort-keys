module.exports = {
  '*.{js,ts}': ['eslint --fix --ext js,jsx,tsx,ts --max-warnings 0 --no-ignore'],
  '*.{md,yml,json}': ['prettier --write'],
}
