// So typescript treats this as a module
export {};

interface Interface {
  /**
   * %foo
   */
  foo: boolean;
  /* %baz */
  baz: boolean;
  // %bar
  bar: boolean;
}

type Type1<TKey extends string> = Partial<{
  // %foo
  foo: boolean;
  /* %baz */ baz: boolean;

  /**
   * %bar
   */
  bar: boolean;
}> & {/* %foo */
  foo: boolean;

// %baz
  baz: boolean;
  /**
   * %bar
   */
  bar: boolean;
} & {
    [K in keyof TKey]: boolean;
  };

enum StringEnum {
  /* %foo */
  Foo = 'FOO',

  // %baz
  Baz = 'BAZ',

  /**
   * %bar
   */
  Bar = 'BAR',
}

type Type2 = {/* %foo */
  foo: boolean;

// %baz
  baz: boolean;
  /**
   * %bar
   */
  bar: boolean;
}
