import { createClassicSome, createClassicNone } from '../ClassicOption/ClassicOption.js';

/* eslint-enable valid-jsdoc */

/**
 *  @deprecated
 *      See https://github.com/option-t/option-t/issues/459
 *
 *  @constructor
 *  @template   T, E
 *  @param  {boolean}   ok
 *  @param  {T|undefined}   val
 *  @param  {E|undefined}   err
 *
 *  A base object of `Result<T, E>`.
 *  This is only used to `option instanceof ResultBase`
 *  in an language environment which does not have an interface type system.
 *
 *  The usecase example is a `React.PropTypes`.
 */
export function ClassicResultBase(ok, val, err) {
    /**
     *  @private
     *  @type   {boolean}
     */
    this._isOk = ok;
    /**
     *  @private
     *  @type   {T}
     */
    this._v = val;
    /**
     *  @private
     *  @type   {E}
     */
    this._e = err;
    Object.seal(this);
}
ClassicResultBase.prototype = Object.freeze({
    /**
     *  Returns true if the result is `Ok`.
     *
     *  @return {boolean}
     */
    isOk() {
        return this._isOk;
    },

    /**
     *  Returns true if the result is `Err`.
     *
     *  @return {boolean}
     */
    isErr() {
        return !this._isOk;
    },

    /**
     *  Converts from `Result<T, E>` to `Option<T>`.
     *  If the self is `Ok`, returns `Some<T>`.
     *  Otherwise, returns `None<T>`.
     *
     *  @return {!OptionT<T>}
     */
    ok() {
        if (this._isOk) {
            return createClassicSome(this._v);
        } else {
            return createClassicNone();
        }
    },

    /**
     *  Converts from `Result<T, E>` to `Option<E>`.
     *  If the self is `Err`, returns `Some<E>`.
     *  Otherwise, returns `None<E>`.
     *
     *  @return {!OptionT<E>}
     */
    err() {
        if (!this._isOk) {
            return createClassicSome(this._e);
        } else {
            return createClassicNone();
        }
    },

    /**
     *  Maps a `Result<T, E>` to `Result<U, E>` by applying a function `mapFn<T, U>`
     *  to an contained `Ok` value, leaving an `Err` value untouched.
     *
     *  This function can be used to compose the results of two functions.
     *
     *  @template   U
     *  @param  {!function(T):U}    op
     *  @return {!Result<U, E>}
     */
    map(op) {
        if (!this._isOk) {
            // cheat to escape from a needless allocation.
            return this;
        }

        const value = op(this._v);
        const result = createClassicOk(value);
        return result;
    },

    /**
     *  Maps a `Result<T, E>` to `U` by applying a function to a contained `Ok` value,
     *  or a `fallback` function to a contained `Err` value.
     *  This function can be used to unpack a successful result while handling an error.
     *
     *  @template   U
     *  @param  {!function(E):U}    fallback
     *  @param  {!function(T):U}    selector
     *  @return {U}
     */
    mapOrElse(fallback, selector) {
        if (!this._isOk) {
            const r = fallback(this._e);
            return r;
        }

        const r = selector(this._v);
        return r;
    },

    /**
     *  Maps a `Result<T, E>` to `Result<T, F>` by applying a function `mapFn<E, F>`
     *  to an contained `Err` value, leaving an `Ok` value untouched.
     *
     *  This function can be used to pass through a successful result while handling an error.
     *
     *  @template   U
     *  @param  {!function(E):F}    op
     *  @return {!Result<T, F>}
     */
    mapErr(op) {
        if (this._isOk) {
            // cheat to escape from a needless allocation.
            return this;
        }

        const value = op(this._e);
        const result = createClassicErr(value);
        return result;
    },

    /**
     *  Returns `res` if the result is `Ok`, otherwise returns the `Err` value of self.
     *
     *  @template   U
     *  @param  {!Result<U, E>} res
     *  @return {!Result<U, E>}
     */
    and(res) {
        if (this._isOk) {
            return res;
        } else {
            // cheat to escape from a needless allocation.
            return this;
        }
    },

    /**
     *  Calls `op` if the result is `Ok`, otherwise returns the `Err` value of self.
     *  This function can be used for control flow based on result values.
     *
     *  @template   U
     *  @param  {!function(T):!Result<U, E>} op
     *  @return {!Result<U, E>}
     */
    andThen(op) {
        if (!this._isOk) {
            // cheat to escape from a needless allocation.
            return this;
        }

        const mapped = op(this._v);
        const isResult = mapped instanceof ClassicResultBase;
        if (!isResult) {
            throw new TypeError("Result<T, E>.andThen()' param `op` should return `Result<U, E>`.");
        }

        return mapped;
    },

    /**
     *  Returns `res` if the result is `Err`, otherwise returns the `Ok` value of self.
     *
     *  @template   F
     *  @param  {!Result<T, F>} res
     *  @return {!Result<T, F>}
     */
    or(res) {
        if (this._isOk) {
            // cheat to escape from a needless allocation.
            return this;
        } else {
            return res;
        }
    },

    /**
     *  Calls `op` if the result is `Err`, otherwise returns the `Ok` value of self.
     *  This function can be used for control flow based on result values.
     *
     *  @template   F
     *  @param  {!function(E):!Result<T, F>} op
     *  @return {!Result<T, F>}
     */
    orElse(op) {
        if (this._isOk) {
            // cheat to escape from a needless allocation.
            return this;
        }

        const mapped = op(this._e);
        const isResult = mapped instanceof ClassicResultBase;
        if (!isResult) {
            throw new TypeError("Result<T, E>.orElse()' param `op` should return `Result<T, F>`.");
        }

        return mapped;
    },

    /**
     *  Return the inner `T` of a `Ok(T)`.
     *
     *  @return {T}
     *
     *  @throws {TypeError}
     *      Throws if the self is a `Err`.
     */
    unwrap() {
        return this.expect('called `unwrap()` on a `Err` value');
    },

    /**
     *  Return the inner `E` of a `Err(E)`.
     *
     *  @return {E}
     *
     *  @throws {TypeError}
     *      Throws if the self is a `Ok`.
     */
    unwrapErr() {
        if (this._isOk) {
            throw new TypeError('called `unwrapErr()` on a `Ok` value');
        } else {
            return this._e;
        }
    },

    /**
     *  Unwraps a result, return the content of an `Ok`. Else it returns `optb`.
     *
     *  @param  {T} optb
     *  @return {T}
     */
    unwrapOr(optb) {
        if (this._isOk) {
            return this._v;
        } else {
            return optb;
        }
    },

    /**
     *  Unwraps a result, returns the content of an `Ok`.
     *  If the value is an `Err` then it calls `op` with its value.
     *
     *  @param  {!function(E):T}    op
     *  @return {T}
     */
    unwrapOrElse(op) {
        if (this._isOk) {
            return this._v;
        }

        const recovered = op(this._e);
        return recovered;
    },

    /**
     *  Return the inner `T` of a `Ok(T)`.
     *
     *  @param  {string}    message
     *  @return {T}
     *
     *  @throws {TypeError}
     *      Throws the passed `message` if the self is a `Err`.
     */
    expect(message) {
        if (this._isOk) {
            return this._v;
        } else {
            throw new TypeError(message);
        }
    },

    /**
     *  The destructor method inspired by Rust's `Drop` trait.
     *  We don't define the object's behavior after calling this.
     *
     *  @param  {function(T)=}  destructor
     *      This would be called with the inner value if self is `Ok<T>`.
     *  @param  {function(E)=}  errDestructor
     *      This would be called with the inner value if self is `Err<E>`.
     *  @return {void}
     */
    drop(destructor, errDestructor) {
        if (this._isOk) {
            if (typeof destructor === 'function') {
                destructor(this._v);
            }
            this._v = null;
        } else {
            if (typeof errDestructor === 'function') {
                errDestructor(this._e);
            }
            this._e = null;
        }
        Object.freeze(this);
    },
});

/**
 *  @deprecated
 *      See https://github.com/option-t/option-t/issues/459
 *
 *  @template   T, E
 *  @param  {!T} v
 *  @return    {Result<T, E>}
 */
export function createClassicOk(v) {
    const o = new ClassicResultBase(true, v, undefined);
    return o;
}

/**
 *  @deprecated
 *      See https://github.com/option-t/option-t/issues/459
 *
 *  @template   T, E
 *  @param  {!E} e
 *  @return    {Result<T, E>}
 */
export function createClassicErr(e) {
    const o = new ClassicResultBase(false, undefined, e);
    return o;
}

/**
 *  @deprecated
 *      See https://github.com/option-t/option-t/issues/459
 */
export function ClassicOkConstructor(val) {
    return createClassicOk(val);
}

/**
 *  @deprecated
 *      See https://github.com/option-t/option-t/issues/459
 */
export function ClassicErrConstructor(e) {
    return createClassicErr(e);
}
