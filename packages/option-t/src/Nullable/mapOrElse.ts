import { expectNotNull } from './expect.js';
import {
    ERR_MSG_TRANSFORMER_MUST_NOT_RETURN_NO_VAL_FOR_NULLABLE,
    ERR_MSG_RECOVERER_MUST_NOT_RETURN_NO_VAL_FOR_NULLABLE,
} from './ErrorMessage.js';
import type { TransformFn, RecoveryFn } from '../internal/Function.js';
import { isNotNull, type NotNull, type Nullable } from './Nullable.js';

/**
 *  Return the result of _transformer_ with using _input_ as an argument for it if _input_ is not `null`.
 *  Otherwise, return the result of _recoverer_.
 *
 *  Basically, this operation is a combination `map()` and `unwrapOrElse()`.
 *
 *  * `U` must not be `Nullable<*>`.
 *      * If the result of _transformer_ is `null`, this throw an `Error`.
 *      * If the result of _recoverer_ is null`, this throw an `Error`.
 *  * If you'd like to accept `Nullable<*>` as `U`, use a combination `andThen()` and `orElse()`.
 */
export function mapOrElseForNullable<T, U>(
    input: Nullable<T>,
    recoverer: RecoveryFn<NotNull<U>>,
    transformer: TransformFn<T, NotNull<U>>
): NotNull<U> {
    let result: U;
    let msg = '';
    if (isNotNull(input)) {
        result = transformer(input);
        msg = ERR_MSG_TRANSFORMER_MUST_NOT_RETURN_NO_VAL_FOR_NULLABLE;
    } else {
        result = recoverer();
        msg = ERR_MSG_RECOVERER_MUST_NOT_RETURN_NO_VAL_FOR_NULLABLE;
    }
    const passed = expectNotNull(result, msg);
    return passed;
}
