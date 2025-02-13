import test from 'ava';

import { isOk, isErr, unwrapOk, unwrapErr } from 'option-t/PlainResult/Result';
import { toResultErrFromNullable } from 'option-t/Nullable/toPlainResult';
import { nonNullableValueCaseListForSync } from '../../utils.mjs';

for (const [INPUT, , EXPECTED] of nonNullableValueCaseListForSync) {
    test('pass the value' + String(INPUT), (t) => {
        const actual = toResultErrFromNullable(INPUT);
        t.true(isErr(actual), 'should be Err(E)');
        t.is(unwrapErr(actual), EXPECTED, 'should the expected result');
    });
}

test(`pass undefined`, (t) => {
    const actual = toResultErrFromNullable(undefined);
    t.true(isErr(actual), 'should be Err(undefined)');
    t.is(unwrapErr(actual), undefined, 'should the expected result');
});

test(`pass null`, (t) => {
    const actual = toResultErrFromNullable(null);
    t.true(isOk(actual), 'should be Ok(void)');
    t.is(unwrapOk(actual), undefined, 'should the expected result');
});
