// So typescript treats this as a module
export {};

interface Interface {
  // %bar
  bar: boolean;
  /* %baz */
  baz: boolean;
  /**
   * %foo
   */
  foo: boolean;
}

type Type1<TKey extends string> = Partial<{
  /**
   * %bar
   */
  bar: boolean;
  /* %baz */ baz: boolean;

  // %foo
  foo: boolean;
}> & {
  /**
   * %bar
   */
  bar: boolean;

// %baz
  baz: boolean;
  /* %foo */
  foo: boolean;
} & {
    [K in keyof TKey]: boolean;
  };

enum StringEnum {
  /**
   * %bar
   */
  Bar = 'BAR',

  // %baz
  Baz = 'BAZ',

  /* %foo */
  Foo = 'FOO',
}

type Type2 = {
  /**
   * %bar
   */
  bar: boolean;

// %baz
  baz: boolean;
  /* %foo */
  foo: boolean;
}
