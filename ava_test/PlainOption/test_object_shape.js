import test from 'ava';

const { createSome, createNone} = require('../../__dist/cjs/PlainOption');

test('The shape of PlainOption::Some', (t) => {
    const INNER_VAL = Symbol('');
    const actual = createSome(INNER_VAL);

    t.true(actual.ok, 'Some.ok');
    t.is(actual.val, INNER_VAL, 'Some.val');
});

test('The shape of PlainOption::None', (t) => {
    const actual = createNone();
    t.false(actual.ok, 'None.ok');
    t.is(actual.val, undefined, 'None.val');
    // eslint-disable-next-line no-prototype-builtins
    t.true(actual.hasOwnProperty('val'), '`val` should be added on creating this object to stabilize object\'s Shape/Structure/Hidden Class');
});
