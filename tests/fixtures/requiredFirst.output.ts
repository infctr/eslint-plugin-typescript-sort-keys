// So typescript treats this as a module
export { };

class GraphQLExtension<T> {_: T}

interface GraphQLResponse {}

namespace Koa {
  export interface Context {}
}

const inlineArrow: (props: {bar: boolean; foo: boolean; baz?: boolean;}) => null = ({...props}) => null;

const inlineArrow2: (props: {baz: boolean; foo: boolean; bar?: boolean;}) => null = ({...props}) => null;

const inlineNewline: (props: {/* bar0 */ bar: boolean /* bar1 */;baz: boolean;
          /* foo0 */ foo?: boolean /* foo1 */;}) => null = ({...props}) => null;

const inlineArrowEmbedded: (props: {bar: boolean; foo: {x: string; y: string;}; baz?: boolean;}) => null = ({...props}) => null;

function inlineGeneric<T extends { bar: boolean; foo: boolean; baz?: boolean;}>({...props}: T | {bar: boolean; foo: boolean; baz?: boolean;}) {
   return null
}

enum InlineEnum { a="T", b="T", c="T", d="T", e="T"}

enum InlineEnum2 {Bar = 'BAR',Baz = 'BAZ', Foo = 'FOO' }

enum InlineEnum3 {C="T", b_="T", c="T"}

enum WeirdEnum {
  Bar = 'BAR',Baz = 'BAZ',    Foo = 'FOO'    }

enum WeirderEnum { Bar = 'BAR',
Baz = 'BAZ',    Foo = 'FOO' // FOO
 }

enum WeirdestEnum { Bar = 'BAR', Baz = 'BAZ',
Foo = 'FOO', // FOO
    Gorp = 'GORP' }

interface InlineInterface {b:"T"; d:"T"; e: "T"; a?:"T"; c?:"T";}

class Class extends GraphQLExtension<{
  graphqlResponse: GraphQLResponse;
  context?: Koa.Context;
}> {
  public method(o: {
    graphqlResponse: GraphQLResponse;
    context?: Koa.Context;
  }): void | { context?: Koa.Context; graphqlResponse?: GraphQLResponse; } {
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
  // end comment no sort
}

type Type1<TKey extends string> = Partial<{
  /**
   * %bar
   */
  bar: boolean;
  /* %baz */ baz: boolean;

  // %foo
  foo?: boolean;
}> & {/**
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
  Foo = 'FOO' //Fooend
  // end comment no sort
}

enum BasicEnum {
  Bar = 'BAR',
  Foo = 'FOO'
}

type Type2 = {/**
   * %bar
   */
  bar: boolean;

// %baz
  baz: boolean;
  /* %foo */
  foo?: boolean; //fooend
  // end comment no sort
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
  new (hour: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

interface Methods {
  // %bar
  bar(): boolean;
  /* %baz */
  baz: boolean;
  foo: boolean;
  ['garply']();
  /**
   * %foo
   */
  quux(): any;
  ['corge']?(): void;
  ['grault']?(): void;
  quuz?(): any;
  qux?();
}
