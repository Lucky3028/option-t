import { assertIsFrozen } from '../internal/assert.js';
import type { Mutable } from '../internal/Mutable.js';
import type { Option } from './Option.js';

/**
 *  This allows to mutate the value to save needless allocation.
 *
 *  We don't define `MutSome<T>` or `MutNone` because we can always mutable properties on `MutOption<T>`.
 *  This means that it's hard to check the type on static type system.
 */
export type MutOption<T> = Mutable<Option<T>>;

/**
 *  @throws
 *  This throw an `Error` instance if the _input_ is frozen.
 */
export function asMutOption<T>(input: Option<T>): MutOption<T> {
    assertIsFrozen(input);
    return input as MutOption<T>;
}
