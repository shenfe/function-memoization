const { cacheFunction, cacheMethod } = require('../src/index.js');

const testFunc1 = (p1, p2, p3, callback) => {
    // todo
};

const testFunc2 = function (p1, p2, p3, callback) {
    // todo
};

const obj = {
    foo: {
        bar: 1
    },
    testFunc2
};

cacheFunction(testFunc1);

cacheMethod(obj, 'testFunc2');

testFunc1('', {}, [], function (res) {});

obj.testFunc2('', {}, [], function (res) {});
