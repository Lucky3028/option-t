import test from 'ava';

import { isSome, isNone } from 'option-t/__dist/esm/PlainOption/Option.js';
import { createOk, createErr } from 'option-t/__dist/esm/PlainResult/Result.js';
import { toOptionFromOk, toOptionFromErr } from 'option-t/__dist/esm/PlainResult/toOption.js';

test('input=Ok(T), output=Some(T)', (t) => {
    const EXPECTED = Symbol('expected');

    const input = createOk(EXPECTED);
    const actual = toOptionFromOk(input);

    t.true(isSome(actual), 'should be Some');
    t.is(actual.val, EXPECTED, 'should be the same inner value');
});

test('input=Err(E), output=None', (t) => {
    const NOT_EXPECTED = Symbol('expected');

    const input = createErr(NOT_EXPECTED);
    const actual = toOptionFromOk(input);

    t.true(isNone(actual), 'should be None');
});

test('input=Ok(T), output=None', (t) => {
    const NOT_EXPECTED = Symbol('expected');

    const input = createOk(NOT_EXPECTED);
    const actual = toOptionFromErr(input);

    t.true(isNone(actual), 'should be None');
});

test('input=Err(E), output=Some(E)', (t) => {
    const EXPECTED = Symbol('expected');

    const input = createErr(EXPECTED);
    const actual = toOptionFromErr(input);

    t.true(isSome(actual), 'should be Some');
    t.is(actual.val, EXPECTED, 'should be the same inner value');
});
