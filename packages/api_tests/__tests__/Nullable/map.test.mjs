import test from 'ava';

import { mapForNullable } from 'option-t/Nullable/map';
import { nonNullableValueCaseListForSync } from '../utils.mjs';

const NULL_VALUE_IN_THIS_TEST_CASE = null;
const NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE = undefined;

for (const [INPUT, PASSED_VALUE, EXPECTED] of nonNullableValueCaseListForSync) {
    test('pass the value:  ' + String(INPUT), (t) => {
        t.plan(3);
        const result = mapForNullable(INPUT, (v) => {
            t.pass();
            t.is(v, PASSED_VALUE, 'the arg is the input');
            return v;
        });

        t.is(result, EXPECTED);
    });
}

test(`pass ${NULL_VALUE_IN_THIS_TEST_CASE}`, (t) => {
    t.plan(1);

    const actual = mapForNullable(NULL_VALUE_IN_THIS_TEST_CASE, (_v) => {
        t.fail('do not call this');
    });
    t.is(actual, NULL_VALUE_IN_THIS_TEST_CASE);
});

test(`pass ${NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE}`, (t) => {
    t.plan(2);

    const result = mapForNullable(NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE, (v) => {
        t.pass();
        return v;
    });

    t.is(result, NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE);
});

const testcases = [[1, NULL_VALUE_IN_THIS_TEST_CASE]];
for (const [src, def] of testcases) {
    test(`assert that do not return Nullable<*> as the selector's result, v = ${String(
        src
    )}, def = ${String(def)}`, (t) => {
        t.throws(
            () => {
                mapForNullable(src, (_v) => def);
            },
            { instanceOf: TypeError, message: '`transformer` must not return `null`' }
        );
    });
}
