/**
 * Refer to https://github.com/substack/json-stable-stringify.
 */
const stringify = require('json-stable-stringify');

/**
 * Generate a unique string for the argument data.
 * @param  {array} argArr   the array of arguments
 * @return {string|null}    the unique string or null
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
 * Make a new function with data memoization for the callback of the origin function.
 * @param  {function} func              the origin function
 * @param  {object|undefined} target    the target of the method
 * @return {function}                   the new function
 * @note   Make sure that the form parameter list of function `func` is
 *         some data and one (or no) callback function in the end.
 */
const cacheFunction = (func, target) => {
    let cache = {};
    return function () {
        let args = Array.prototype.slice.call(arguments);
        let argStr = argDataToUniqueString(args);
        let callback = args[args.length - 1];
        if (cache[argStr] !== undefined) return callback(cache[argStr]);
        args[args.length - 1] = function (argData) {
            cache[argStr] = argData;
            callback(argData);
        };
        return func.apply(target, args);
    };
};

/**
 * Enable memoization for methods of a target.
 * @param  {object} target                      the target of the methods
 * @param  {string|array<string>} methodName    the method name(s)
 * @return {object}                             the target
 */
const cacheMethod = (target, methodName) => {
    if (typeof methodName === 'string') methodName = [methodName];
    if (Object.prototype.toString.call(methodName) !== '[object Array]') return null;
    for (let i = 0, len = methodName.length; i < len; i++) {
        let mn = methodName[i];
        target[mn] = cacheFunction(target[mn], target);
    }
    return target;
};

module.exports = {
    cacheFunction,
    cacheMethod
};
