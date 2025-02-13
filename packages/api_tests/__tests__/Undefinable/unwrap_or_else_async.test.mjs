import test from 'ava';

import { unwrapOrElseAsyncFromUndefinable } from 'option-t/Undefinable/unwrapOrElseAsync';
import { nonNullableValueCaseListForAsync } from '../utils.mjs';

const NULL_VALUE_IN_THIS_TEST_CASE = undefined;
const NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE = null;

for (const [INPUT, , EXPECTED] of nonNullableValueCaseListForAsync) {
    test('pass the value: ' + String(INPUT), async (t) => {
        t.plan(3);

        const DEFAULT_VAL = Math.random();

        let result;
        t.notThrows(() => {
            result = unwrapOrElseAsyncFromUndefinable(INPUT, () => {
                t.fail('should not call recover fn');
                return DEFAULT_VAL;
            });
        });

        t.true(result instanceof Promise, 'result should be Promise');

        const actual = await result;
        t.is(actual, EXPECTED);
    });
}

test(`pass ${NULL_VALUE_IN_THIS_TEST_CASE}`, async (t) => {
    t.plan(3);

    const DEFAULT_VAL = Math.random();
    const result = unwrapOrElseAsyncFromUndefinable(NULL_VALUE_IN_THIS_TEST_CASE, async () => {
        t.pass('should call recover fn');
        return DEFAULT_VAL;
    });

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, DEFAULT_VAL);
});

test(`pass ${NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE}`, async (t) => {
    t.plan(2);

    const DEFAULT_VAL = Math.random();
    const result = unwrapOrElseAsyncFromUndefinable(
        NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE,
        async () => {
            t.fail('should not call recover fn');
            return DEFAULT_VAL;
        }
    );

    t.true(result instanceof Promise, 'result should be Promise');

    const actual = await result;
    t.is(actual, NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE);
});

const testcases = [[NULL_VALUE_IN_THIS_TEST_CASE, NULL_VALUE_IN_THIS_TEST_CASE]];
for (const [src, def] of testcases) {
    test(`should not accept null as default value, v = ${String(src)}, def = ${String(
        def
    )}`, async (t) => {
        await t.throwsAsync(
            async () => {
                await unwrapOrElseAsyncFromUndefinable(src, async () => def);
            },
            { instanceOf: TypeError, message: '`recoverer` must not return `undefined`' }
        );
    });
}

test('callback should return Promise', async (t) => {
    t.plan(2);

    await t.throwsAsync(
        async () => {
            await unwrapOrElseAsyncFromUndefinable(NULL_VALUE_IN_THIS_TEST_CASE, () => {
                t.pass();
                return 1;
            });
        },
        {
            instanceOf: TypeError,
            message: '`recoverer` must return Promise',
        }
    );
});
