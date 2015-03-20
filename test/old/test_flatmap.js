/*
 * @license MIT License
 *
 * Copyright (c) 2015 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var assert = require('power-assert');
var OptionType = require('../../src/index').OptionType;

describe('OptionType.flatMap()', function(){
    describe('self is `None`', function () {
        var option = null;
        var isNotCalled = true;

        before(function(){
            var none = new OptionType();
            assert.ok(!none.isSome);

            option = none.flatMap(function(){
                isNotCalled = false;
            });
        });

        it('the returned value shoule be `None`', function() {
            assert.strictEqual(option.isSome, false);
        });

        it('the passed function should not be called', function() {
            assert.strictEqual(isNotCalled, true);
        });
    });

    describe('self is `Some<T>`, `fn` returns `None`', function () {
        var option = null;

        before(function(){
            var some = new OptionType(1);
            assert.ok(some.isSome);

            option = some.flatMap(function(val){
                return new OptionType();
            });
        });

        it('the returned value shoule be `None`', function() {
            assert.strictEqual(option.isSome, false);
        });
    });

    describe('self is `None`, `fn` don\'t returns `OptionType`', function () {

        var option = null;
        var isNotCalled = true;

        before(function(){
            var none = new OptionType();
            assert.ok(!none.isSome);

            option = none.flatMap(function(){
                return 1;
            });
        });

        it('the returned value shoule be `None`', function() {
            assert.strictEqual(option.isSome, false);
        });
    });

    describe('self is `Some<T>`, `fn` don\'t returns `OptionType`', function () {
        var option = null;
        var error = null;

        before(function(){
            var some = new OptionType(1);
            assert.ok(some.isSome);

            try {
                option = some.flatMap(function(val){
                    var rv = 'hoge';
                    assert.notStrictEqual(val !== rv);
                    return rv;
                });
            }
            catch (e) {
                error = e;
            }
        });

        after(function(){
            option = null;
            error = null;
        });

        it('should throw an error', function() {
            assert.ok(error instanceof Error);
        });

        it('the error message should be the expected', function() {
            assert.strictEqual(error.message, 'OptionType.flatMap()\' param `fn` should return `OptionType`.');
        });
    });
});
