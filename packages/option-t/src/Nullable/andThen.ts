import type { TransformFn } from '../internal/Function.js';
import { type Nullable, isNull } from './Nullable.js';

export type NullableTryTransformFn<T, U> = TransformFn<T, Nullable<U>>;

/**
 *  Returns `null` if the _input_ is `null`,
 *  otherwise calls _transformer_ with the value and returns the result.
 *
 *  XXX:
 *  Some languages call this operation flatmap.
 *  But we don't provide `flatMap()` as alias of this function.
 *  because it's too hard to undarstand that "flatMap" operation for `T | null`
 */
export function andThenForNullable<T, U>(
    input: Nullable<T>,
    transformer: NullableTryTransformFn<T, U>
): Nullable<U> {
    if (isNull(input)) {
        return input;
    }

    const result = transformer(input);
    return result;
}
