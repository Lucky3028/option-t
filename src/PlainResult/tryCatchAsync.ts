import { assertIsPromise } from '../internal/assert';
import { ERR_MSG_PRODUCER_MUST_RETURN_PROMISE } from '../internal/ErrorMessage';
import type { AsyncProducerFn } from '../internal/Function';
import { type Result, createOk, createErr } from './Result';

/**
 *  This function converts the returend value from _producer_ into `Ok(TValue)`.
 *  If _producer_ throw a something, this returns it with wrapping `Err(unknown)`.
 *
 *  NOTE:
 *  An user should narrow the scope of _producer_ to make it predictable that is in `Err(E)`.
 */
export function tryCatchIntoResultAsync<T>(
    producer: AsyncProducerFn<T>
): Promise<Result<T, unknown>> {
    const value = producer();

    assertIsPromise(value, ERR_MSG_PRODUCER_MUST_RETURN_PROMISE);

    const wrapped: Promise<Result<T, unknown>> = value.then(createOk, createErr);
    return wrapped;
}