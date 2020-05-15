// So typescript treats this as a module
export {};

class GraphQLExtension<T> {_: T}

interface GraphQLResponse {}

namespace Koa {
  export interface Context {}
}

const inlineArrow: (props: {bar: boolean, foo: boolean; baz?: boolean;}) => null = ({...props}) => null;

const inlineArrow2: (props: {baz: boolean, foo: boolean; bar?: boolean;}) => null = ({...props}) => null;

const inlineWeird: (props: {bar: boolean,baz: boolean,
          foo?: boolean;}) => null = ({...props}) => null;

function inlineGeneric<T extends { bar: boolean, foo: boolean; baz?: boolean;}>({...props}: T | {bar: boolean; foo: boolean; baz?: boolean}) {
   return null
}

enum InlineEnum {a="T", b="T", c="T", d="T", e="T"}

enum InlineEnum2 {Bar = 'BAR',Baz = 'BAZ', Foo = 'FOO' }

enum InlineEnum3 {C="T", b_="T", c="T"}

enum WeirdEnum {
  Bar = 'BAR',Baz = 'BAZ',    Foo = 'FOO'}

interface InlineInterface {b:"T"; d:"T"; e: "T"; a?:"T", c?:"T";}

class Class extends GraphQLExtension<{
  graphqlResponse: GraphQLResponse;
  context?: Koa.Context;
}> {
  public method(o: {
    graphqlResponse: GraphQLResponse;
    context?: Koa.Context;
  }): void | { context?: Koa.Context, graphqlResponse?: GraphQLResponse; } {
    //
  }
}

interface Interface {
  // %bar
  bar: boolean;
  /**
   * %foo
   */
  foo: boolean;
  /* %baz */
  baz?: boolean;
}

type Type1<TKey extends string> = Partial<{
  /**
   * %bar
   */
  bar: boolean;
  /* %baz */ baz: boolean;

  // %foo
  foo?: boolean;
}> & {
  /**
   * %bar
   */
  bar: boolean;

// %baz
  baz: boolean;
  /* %foo */
  foo?: boolean;
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
  foo?: boolean;
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
  new (hour: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}
