import test from 'ava';

import { mapOrElseAsyncForMaybe } from 'option-t/Maybe/mapOrElseAsync';
import { nonNullableValueCaseListForAsync } from '../utils.mjs';

for (const [INPUT, PASSED_VALUE, EXPECTED] of nonNullableValueCaseListForAsync) {
    test('value:' + String(INPUT), async (t) => {
        t.plan(4);

        const DEFAULT_VAL = Symbol('def');

        const result = mapOrElseAsyncForMaybe(
            INPUT,
            async () => {
                t.fail('do not call here');
                return DEFAULT_VAL;
            },
            async (v) => {
                t.pass('should call selector fn');
                t.is(v, PASSED_VALUE, 'the arg is the input');
                return v;
            }
        );

        t.true(result instanceof Promise, 'result should be Promise');
        const actual = await result;
        t.is(actual, EXPECTED);
    });
}

for (const NULL_VALUE of [undefined, null]) {
    test(`pass ${NULL_VALUE}`, async (t) => {
        t.plan(3);

        const DEFAULE_VAL = Symbol('default');
        const COMPUTED_VAL = Symbol('computed');

        const result = mapOrElseAsyncForMaybe(
            NULL_VALUE,
            async () => {
                t.pass('should be called');
                return DEFAULE_VAL;
            },
            async (_v) => {
                t.fail('should not call selector fn');
                return COMPUTED_VAL;
            }
        );

        t.true(result instanceof Promise, 'result should be Promise');
        const actual = await result;
        t.is(actual, DEFAULE_VAL);
    });

    test(`assert that do not return Maybe<*> as the transformer's result. transformer's result=${String(
        NULL_VALUE
    )}`, async (t) => {
        t.plan(2);

        await t.throwsAsync(
            async () => {
                const INPUT = Math.random();
                await mapOrElseAsyncForMaybe(
                    INPUT,
                    async () => {
                        t.fail('do not call this');
                        return Math.random();
                    },
                    async (_v) => {
                        t.pass('call here');
                        return NULL_VALUE;
                    }
                );
            },
            {
                instanceOf: TypeError,
                message: '`transformer` must not return `null` or `undefined`',
            }
        );
    });

    for (const FALLBACK_VALUE of [undefined, null]) {
        test(`v = ${String(NULL_VALUE)}, def = ${String(FALLBACK_VALUE)}`, async (t) => {
            t.plan(2);
            await t.throwsAsync(
                async () => {
                    await mapOrElseAsyncForMaybe(
                        NULL_VALUE,
                        async () => {
                            t.pass('call this');
                            return FALLBACK_VALUE;
                        },
                        async (_v) => {
                            t.fail('do not call this');
                            return Math.random();
                        }
                    );
                },
                {
                    instanceOf: TypeError,
                    message: '`recoverer` must not return `null` or `undefined`',
                }
            );
        });
    }

    test(`${NULL_VALUE}: transformer should return Promise`, async (t) => {
        t.plan(2);

        await t.throwsAsync(
            async () => {
                const INPUT = Math.random();
                await mapOrElseAsyncForMaybe(
                    INPUT,
                    () => {
                        t.fail('do not call this');
                        return Math.random();
                    },
                    () => {
                        t.pass('this should be called');
                        return Math.random();
                    }
                );
                t.fail('do not reach here');
            },
            {
                instanceOf: TypeError,
                message: '`transformer` must return Promise',
            }
        );
    });

    test(`${NULL_VALUE}: recoverer should return Promise`, async (t) => {
        t.plan(2);

        await t.throwsAsync(
            async () => {
                await mapOrElseAsyncForMaybe(
                    NULL_VALUE,
                    () => {
                        t.pass('this should be called');
                        return Math.random();
                    },
                    () => {
                        t.fail('do not call this');
                        return Math.random();
                    }
                );
                t.fail('do not reach here');
            },
            {
                instanceOf: TypeError,
                message: '`recoverer` must return Promise',
            }
        );
    });
}
