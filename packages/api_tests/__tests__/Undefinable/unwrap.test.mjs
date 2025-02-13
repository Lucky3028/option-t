import test from 'ava';

import { unwrapUndefinable } from 'option-t/Undefinable/unwrap';
import { nonNullableValueCaseListForSync } from '../utils.mjs';

const NULL_VALUE_IN_THIS_TEST_CASE = undefined;
const NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE = null;

for (const [INPUT, , EXPECTED] of nonNullableValueCaseListForSync) {
    test('pass the value' + String(INPUT), (t) => {
        t.plan(2);

        let result;
        t.notThrows(() => {
            result = unwrapUndefinable(INPUT);
        }, 'should not throw error');

        t.is(result, EXPECTED, 'should the expected result');
    });
}

test(`pass ${NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE}`, (t) => {
    t.plan(2);

    let result = Math.random();
    t.notThrows(() => {
        result = unwrapUndefinable(NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE);
    }, 'should not throw error');

    t.is(result, NULLY_VALUE_BUT_NOT_NULL_VALUE_IN_THIS_TEST_CASE, 'should the expected result');
});

test(`pass ${NULL_VALUE_IN_THIS_TEST_CASE}`, (t) => {
    t.plan(1);

    t.throws(
        () => {
            unwrapUndefinable(NULL_VALUE_IN_THIS_TEST_CASE);
        },
        {
            instanceOf: TypeError,
            message: 'called with `undefined`',
        }
    );
});
