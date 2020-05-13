# require interface keys to be sorted (interface)

When declaring multiple properties on an interface, some developers prefer to sort property names alphabetically to be able to find necessary property easier at the later time. Others feel that it adds complexity and becomes burden to maintain.

## Rule Details

This rule checks all property definitions of an interface declaration and verifies that all keys are sorted alphabetically.

Examples of **incorrect** code for this rule:

```ts
/* eslint typescript-sort-keys/interface: "error" */

interface U {
  a: T;
  c: T;
  b: T;
}
interface U {
  a: T;
  c: T;
  b: T;
}

// Case-sensitive by default.
interface U {
  a: T;
  b: T;
  C: T;
}

// Non-natural order by default.
interface U {
  1: T;
  2: T;
  10: T;
}

// Non-required first order by default.
interface U {
  a: T;
  c: T;
  b?: T;
}

interface U {
  a: T;
  ['c']: T;
  b: T;
}
```

Examples of **correct** code for this rule:

```ts
/* eslint typescript-sort-keys/interface: "error" */

interface U {
  a: T;
  b: T;
  c: T;
}
interface U {
  a: T;
  b: T;
  c: T;
}

// Case-sensitive by default.
interface U {
  C: T;
  a: T;
  b: T;
}

// Non-natural order by default.
interface U {
  1: T;
  10: T;
  2: T;
}

// Non-required first order by default.
interface U {
  a: T;
  b?: T;
  c: T;
}

// This rule checks computed properties which have a simple name as well.
interface U {
  a: T;
  ['b']: T;
  c: T;
}
```

## Options

```json
{
  "typescript-sort-keys/interface": [
    "error",
    "asc",
    { "caseSensitive": true, "natural": false, "requiredFirst": false }
  ]
}
```

The 1st option is `"asc"` or `"desc"`.

- `"asc"` (default) - enforce properties to be in ascending order.
- `"desc"` - enforce properties to be in descending order.

The 2nd option is an object which has 3 properties.

- `caseSensitive` - if `true`, enforce properties to be in case-sensitive order. Default is `true`.
- `natural` - if `true`, enforce properties to be in natural order. Default is `false`. Natural Order compares strings containing combination of letters and numbers in the way a human being would sort. It basically sorts numerically, instead of sorting alphabetically. So the number 10 comes after the number 3 in Natural Sorting.
- `requiredFirst` - if `true`, enforce properties optional properties to come after required ones.

Example for a list:

With `natural` as true, the ordering would be
1
3
6
8
10

With `natural` as false, the ordering would be
1
10
3
6
8

### desc

Examples of **incorrect** code for the `"desc"` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "desc"] */

interface U {
  b: T;
  c: T;
  a: T;
}
interface U {
  b: T;
  c: T;
  a: T;
}

// Case-sensitive by default.
interface U {
  C: T;
  b: T;
  a: T;
}

// Non-required first order by default.
interface U {
  a: T;
  b?: T;
  c: T;
}

// Non-natural order by default.
interface U {
  10: T;
  2: T;
  1: T;
}
```

Examples of **correct** code for the `"desc"` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "desc"] */

interface U {
  c: T;
  b: T;
  a: T;
}
interface U {
  c: T;
  b: T;
  a: T;
}

// Case-sensitive by default.
interface U {
  b: T;
  a: T;
  C: T;
}

// Non-required first order by default.
interface U {
  b?: T;
  c: T;
  a: T;
}

// Non-natural order by default.
interface U {
  2: T;
  10: T;
  1: T;
}
```

### insensitive

Examples of **incorrect** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "asc", { caseSensitive: false }] */

interface U {
  a: T;
  c: T;
  C: T;
  b: T;
}
interface U {
  a: T;
  C: T;
  c: T;
  b: T;
}
```

Examples of **correct** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "asc", { caseSensitive: false }] */

interface U {
  a: T;
  b: T;
  c: T;
  C: T;
}
interface U {
  a: T;
  b: T;
  C: T;
  c: T;
}
```

### natural

Examples of **incorrect** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "asc", { natural: true }] */

interface U {
  1: T;
  10: T;
  2: T;
}
```

Examples of **correct** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "asc", { natural: true }] */

interface U {
  1: T;
  2: T;
  10: T;
}
```

### required

Examples of **incorrect** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "asc", { requiredFirst: true }] */

interface U {
  d: T;
  c?: T;
  b?: T;
  a: T;
}
```

Examples of **correct** code for the `{ requiredFirst: true }` option:

```ts
/* eslint typescript-sort-keys/interface: ["error", "asc", { requiredFirst: true }] */

interface U {
  a: T;
  d: T;
  b?: T;
  c?: T;
}
```

## When Not To Use It

If you don't want to notify about properties' order, then it's safe to disable this rule.
