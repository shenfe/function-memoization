// Import
const { cacheFunction, cacheMethod } = require('../src/index.js');

// Define function1
let testFunc1 = (p1, p2, p3, callback) => {
    console.log('func1 begins');
    let arr = ['func1', p1, p2.n, p3[0]];
    setTimeout(function () {
        callback(arr);
    }, 1000);
};

// Define function2
const testFunc2 = ;

// Define an object and a method
const obj = {
    testMethod: function (p1, p2, p3, callback) {
        console.log('func2 begins');
        let arr = ['func2', p1, p2.n, p3[0]];
        setTimeout(function () {
            callback(arr);
        }, 1000);
    }
};

// Cache function1
testFunc1 = cacheFunction(testFunc1, {
    async: true
});

// Cache f
cacheMethod(obj, 'testFunc2');

testFunc1(1, { n: 2 }, [3], function (res) {
    console.log(res);
});

obj.testFunc2(4, { n: 5 }, [6], function (res) {
    console.log(res);
});

setTimeout(function () {
    testFunc1(1, { n: 2 }, [3], function (res) {
        console.log(res);
    });

    obj.testFunc2(4, { n: 5 }, [6], function (res) {
        console.log(res);
    });
}, 1000);