/**
 * Refer to https://github.com/substack/json-stable-stringify.
 */
const stringify = require('json-stable-stringify');

/**
 * Generate a unique string for the argument data.
 * @param  {Array} argArr   the array of arguments
 * @return {String|null}    a unique string or null
 */
const argDataToUniqueString = argArr => {
    if (Object.prototype.toString.call(argArr) !== '[object Array]') return null;
    let r = {};
    for (let i = 0, len = argArr.length; i < len; i++) {
        if (typeof argArr[i] === 'function') break;
        r[i] = argArr[i];
    }
    return stringify(r);
};

/**
 * Execute a function asynchronously.
 * @param  {Function} func  the function to execute
 */
const asyncDo = func => {
    if (typeof Promise !== 'undefined') {
        new Promise(resolve => resolve()).then(func);
    } else {
        window.setTimeout(func, 0);
    }
};

/**
 * Make a new function with data memoization for the callback of the origin function.
 * @param  {Function} func              the origin function
 * @param  {Object} options             the options
 * @return {Function}                   the new function
 * @note   Make sure that the form parameter list of function `func` is
 *         some data and one (or no) callback function in the end.
 */
const cacheFunction = (func, options = {}) => {
    let cache = {};
    return function () {
        let args = Array.prototype.slice.call(arguments);
        let argStr = argDataToUniqueString(args);
        let callback = args[args.length - 1];
        if (cache[argStr] !== undefined) {
            if (!options.async) {
                return callback(cache[argStr]);
            } else {
                return asyncDo(() => callback(cache[argStr]));
            }
        }
        args[args.length - 1] = function (argData) {
            cache[argStr] = argData;
            callback(argData);
        };
        return func.apply(options.target || null, args);
    };
};

/**
 * Enable memoization for methods of a target.
 * @param  {Object} target                      the target of the methods
 * @param  {String|Array<String>} methodName    the method name(s)
 * @param  {Object} options                     the options
 * @return {Object}                             the target
 */
const cacheMethod = (target, methodName, options = {}) => {
    if (typeof methodName === 'string') methodName = [methodName];
    if (Object.prototype.toString.call(methodName) !== '[object Array]') return null;
    options.target = target;
    for (let i = 0, len = methodName.length; i < len; i++) {
        let mn = methodName[i];
        target[mn] = cacheFunction(target[mn], options);
    }
    return target;
};

module.exports = {
    cacheFunction,
    cacheMethod
};
