# require string enum members to be sorted (string-enum)

When declaring multiple members on an string enum, some developers prefer to sort enum member names alphabetically to be able to find necessary members easier at the later time. Others feel that it adds complexity and becomes burden to maintain.

## Rule Details

This rule checks all members of a string enum declaration and verifies that all keys are sorted alphabetically.

Examples of **incorrect** code for this rule:

```ts
/* eslint typescript-sort-keys/string-enum: "error" */

enum U {
  a = 'T',
  c = 'T',
  b = 'T',
}
enum U {
  a = 'T',
  c = 'T',
  b = 'T',
}

// Case-sensitive by default.
enum U {
  a = 'T',
  b = 'T',
  C = 'T',
}

enum U {
  a = 'T',
  'c' = 'T',
  b = 'T',
}
```

Examples of **correct** code for this rule:

```ts
/* eslint typescript-sort-keys/string-enum: "error" */

enum U {
  a = 'T',
  b = 'T',
  c = 'T',
}
enum U {
  a = 'T',
  b = 'T',
  c = 'T',
}

// Case-sensitive by default.
enum U {
  C = 'T',
  a = 'T',
  b = 'T',
}

// This rule checks computed properties which have a simple name as well.
enum U {
  a = 'T',
  'b' = 'T',
  c = 'T',
}
```

## Options

```json
{
  "typescript-sort-keys/string-enum": ["error", "asc", { "caseSensitive": true }]
}
```

The 1st option is `"asc"` or `"desc"`.

- `"asc"` (default) - enforce enum members to be in ascending order.
- `"desc"` - enforce enum members to be in descending order.

The 2nd option is an object which has 2 properties.

- `caseSensitive` - if `true`, enforce enum members to be in case-sensitive order. Default is `true`.
- `natural` - if `true`, enforce enum members to be in natural order. Default is `false`. Natural Order compares strings containing combination of letters and numbers in the way a human being would sort. It basically sorts numerically, instead of sorting alphabetically. So the number 10 comes after the number 3 in Natural Sorting.

### desc

Examples of **incorrect** code for the `"desc"` option:

```ts
/* eslint typescript-sort-keys/string-enum: ["error", "desc"] */

enum U {
  b = 'T',
  c = 'T',
  a = 'T',
}
enum U {
  b = 'T',
  c = 'T',
  a = 'T',
}

// Case-sensitive by default.
enum U {
  C = 'T',
  b = 'T',
  a = 'T',
}
```

Examples of **correct** code for the `"desc"` option:

```ts
/* eslint typescript-sort-keys/string-enum: ["error", "desc"] */

enum U {
  c = 'T',
  b = 'T',
  a = 'T',
}
enum U {
  c = 'T',
  b = 'T',
  a = 'T',
}

// Case-sensitive by default.
enum U {
  b = 'T',
  a = 'T',
  C = 'T',
}
```

### insensitive

Examples of **incorrect** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort-keys/string-enum: ["error", "asc", { caseSensitive: false }] */

enum U {
  a = 'T',
  c = 'T',
  C = 'T',
  b = 'T',
}
enum U {
  a = 'T',
  C = 'T',
  c = 'T',
  b = 'T',
}
```

Examples of **correct** code for the `{ caseSensitive: false }` option:

```ts
/* eslint typescript-sort-keys/string-enum: ["error", "asc", { caseSensitive: false }] */

enum U {
  a = 'T',
  b = 'T',
  c = 'T',
  C = 'T',
}
enum U {
  a = 'T',
  b = 'T',
  C = 'T',
  c = 'T',
}
```

### natural

Examples of **incorrect** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort-keys/string-enum: ["error", "asc", { natural: true }] */

enum U {
  a = 'T',
  _ = 'T',
  A = 'T',
  $ = 'T',
}
```

Examples of **correct** code for the `{natural: true}` option:

```ts
/* eslint typescript-sort-keys/string-enum: ["error", "asc", { natural: true }] */

enum U {
  a = 'T',
  A = 'T',
  _ = 'T',
  $ = 'T',
}
```

## When Not To Use It

If you don't want to notify about enum members' order, then it's safe to disable this rule.
