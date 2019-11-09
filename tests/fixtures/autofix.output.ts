// So typescript treats this as a module
export {};

const inlineArrow: (props: {bar: boolean; baz: boolean; foo: boolean;}) => null = ({...props}) => null;

const inlineArrow2: (props: {bar: boolean; baz: boolean; foo: boolean;}) => null = ({...props}) => null;

const inlineWeird: (props: {          bar: boolean,baz: boolean,
          foo: boolean;}) => null = ({...props}) => null;

function inlineGeneric<T extends { bar: boolean; baz: boolean; foo: boolean;}>({...props}: T | {bar: boolean; baz: boolean; foo: boolean;}) {
   return null
}

enum InlineEnum {a="T", b="T", c="T", d="T", e="T"}

enum InlineEnum2 {Bar = 'BAR',Baz = 'BAZ', Foo = 'FOO' }

enum WeirdEnum {
      Bar = 'BAR',Baz = 'BAZ',       Foo = 'FOO'}

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
  Foo = 'FOO'
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
