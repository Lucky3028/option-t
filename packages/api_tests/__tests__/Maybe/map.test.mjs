import test from 'ava';

import { mapForMaybe } from 'option-t/Maybe/map';
import { nonNullableValueCaseListForSync } from '../utils.mjs';

for (const [INPUT, PASSED_VALUE, EXPECTED] of nonNullableValueCaseListForSync) {
    test('value:' + String(INPUT), (t) => {
        t.plan(3);

        const result = mapForMaybe(INPUT, (v) => {
            t.pass('should call selector fn');
            t.is(v, PASSED_VALUE, 'the arg is the input');
            return v;
        });

        t.is(result, EXPECTED);
    });
}

for (const NULL_VALUE of [undefined, null]) {
    test(`pass ${NULL_VALUE}`, (t) => {
        t.plan(1);
        const result = mapForMaybe(NULL_VALUE, (_v) => {
            t.fail('should not call selector fn');
        });
        t.is(result, NULL_VALUE);
    });
}

{
    const testcases = [
        [1, undefined],
        [1, null],
    ];
    for (const [src, def] of testcases) {
        test(`assert that do not return Maybe<*> as the selector's resultv = ${String(
            src
        )}, def = ${String(def)}`, (t) => {
            t.plan(1);
            t.throws(
                () => {
                    mapForMaybe(src, (_v) => def);
                },
                {
                    instanceOf: TypeError,
                    message: '`transformer` must not return `null` or `undefined`',
                }
            );
        });
    }
}
