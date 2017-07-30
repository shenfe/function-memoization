/**
 * Refer to https://github.com/substack/json-stable-stringify.
 */
var stringify = require('json-stable-stringify');

var argDataToUniqueString = function (argArr) {
    if (Object.prototype.toString.call(argArr) !== '[object Array]') return null;
    var r = {};
    for (var i = 0, len = argArr.length; i < len; i++) {
        if (typeof argArr[i] === 'function') break;
        r[i] = argArr[i];
    }
    return stringify(r);
};

/**
 * Make sure that the form parameter list of function `func` is some data and one (or no) callback function in the end.
 */
var cacheFunction = function (func, target) {
    var cache = {};
    return function () {
        var args = Array.prototype.slice.call(arguments);
        var argStr = argDataToUniqueString(args);
        var callback = args[args.length - 1];
        if (cache[argStr] !== undefined) return callback(cache[argStr]);
        args[args.length - 1] = function (argData) {
            cache[argStr] = argData;
            callback(argData);
        };
        return func.apply(target, args);
    };
};

var cacheMethod = function (target, methodName) {
    if (typeof methodName === 'string') methodName = [methodName];
    if (Object.prototype.toString.call(methodName) !== '[object Array]') return null;
    for (var i = 0, len = methodName.length; i < len; i++) {
        var mn = methodName[i];
        target[mn] = cacheFunction(target[mn], target);
    }
    return target;
};

module.exports = {
    cacheFunction: cacheFunction,
    cacheMethod: cacheMethod
};

