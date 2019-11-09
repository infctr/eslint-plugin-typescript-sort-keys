// So typescript treats this as a module
export {};

const inlineArrow: (props: {foo: boolean; baz: boolean; bar: boolean}) => null = ({...props}) => null;

const inlineArrow2: (props: {foo: boolean; bar: boolean; baz: boolean}) => null = ({...props}) => null;

const inlineWeird: (props: {foo: boolean;baz: boolean,
          bar: boolean}) => null = ({...props}) => null;

function inlineGeneric<T extends { foo: boolean; baz: boolean; bar: boolean}>({...props}: T | {foo: boolean; bar: boolean; baz: boolean}) {
   return null
}

enum InlineEnum {e="T", c="T", d="T", b="T", a="T"}

enum InlineEnum2 {Foo = 'FOO',Baz = 'BAZ', Bar = 'BAR' }

enum WeirdEnum {
   Foo = 'FOO',Baz = 'BAZ',    Bar = 'BAR',}

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
