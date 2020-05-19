// So typescript treats this as a module
export {};

class GraphQLExtension<T> {_: T}

interface GraphQLResponse {}

namespace Koa {
  export interface Context {}
}

const inlineArrow: (props: {foo: boolean; baz?: boolean; bar: boolean}) => null = ({...props}) => null;

const inlineArrow2: (props: {foo: boolean; bar?: boolean; baz: boolean}) => null = ({...props}) => null;

const inlineWeird: (props: {foo?: boolean;baz: boolean,
          bar: boolean}) => null = ({...props}) => null;

function inlineGeneric<T extends { foo: boolean; baz?: boolean; bar: boolean}>({...props}: T | {foo: boolean; bar: boolean; baz?: boolean}) {
   return null
}

enum InlineEnum {e="T", c="T", d="T", b="T", a="T"}

enum InlineEnum2 {Foo = 'FOO',Baz = 'BAZ', Bar = 'BAR' }

enum InlineEnum3 {b_="T", c="T", C="T"}

enum WeirdEnum {
  Foo = 'FOO',Baz = 'BAZ',    Bar = 'BAR',}

interface InlineInterface {e: "T"; c?:"T"; d:"T"; b:"T"; a?:"T"}

class Class extends GraphQLExtension<{
  graphqlResponse: GraphQLResponse;
  context?: Koa.Context;
}> {
  public method(o: {
    graphqlResponse: GraphQLResponse;
    context?: Koa.Context;
  }): void | { graphqlResponse?: GraphQLResponse; context?: Koa.Context } {
    //
  }
}

interface Interface {
  /**
   * %foo
   */
  foo: boolean;
  /* %baz */
  baz?: boolean;
  // %bar
  bar: boolean;
}

type Type1<TKey extends string> = Partial<{
  // %foo
  foo?: boolean;
  /* %baz */ baz: boolean;

  /**
   * %bar
   */
  bar: boolean;
}> & {/* %foo */
  foo?: boolean;

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
  foo?: boolean;

// %baz
  baz: boolean;
  /**
   * %bar
   */
  bar: boolean;
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
  new (hour: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

interface Methods {
  /**
   * %foo
   */
  quux(): any;
  qux?();
  quuz?(): any;
  foo: boolean;
  /* %baz */
  baz: boolean;
  // %bar
  bar(): boolean;
  ['grault']?(): void;
  ['corge']?(): void;
  ['garply']();
}
