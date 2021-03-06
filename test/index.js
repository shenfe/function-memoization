const { cacheFunction, cacheMethod } = require('../src/index.js');

// Define function1
let testFunction = (p1, p2, p3, callback) => {
    console.log('function1 begins');
    let arr = ['function1', p1, p2.n, p3[0]];
    setTimeout(function () {
        callback(arr);
    }, 1000);
};

// Define function2 as a method of an object
const obj = {
    testMethod: function (p1, p2, p3, callback) {
        console.log('function2 begins');
        let arr = ['function2', p1, p2.n, p3[0]];
        setTimeout(function () {
            callback(arr);
        }, 1000);
    }
};

// Cache function1, keeping the callback "async"
testFunction = cacheFunction(testFunction, {
    async: true
});

// Cache function2
cacheMethod(obj, 'testMethod');

// Execute function1 1st time
testFunction(1, { n: 2 }, [3], function (res) {
    console.log(res);
});

// Execute function2 1st time
obj.testMethod(4, { n: 5 }, [6], function (res) {
    console.log(res);
});

setTimeout(function () {
    // Execute function1 2nd time
    testFunction(1, { n: 2 }, [3], function (res) {
        console.log(res);
    });

    // Execute function2 2nd time
    obj.testMethod(4, { n: 5 }, [6], function (res) {
        console.log(res);
    });
}, 1000);