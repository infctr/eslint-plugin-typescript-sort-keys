const memo: Record<string, any> = {}

// Getting strange test failures? Could be this! Disable and try again.
export function memoize<T>(key: string, valueFn: () => T): T {
  if (hasMemoized(key)) {
    return memo[key]
  }
  memo[key] = valueFn()
  return memo[key]
}

export function getMemoized(key: string): any {
  return memo[key]
}

export function hasMemoized(key: string): boolean {
  return !!memo[key]
}
