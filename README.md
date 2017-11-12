# function-memoization
Make function memoization via data cache, to skip some async process (for the same data) and call the callback function directly.

## Installation
```sh
npm install --save function-memoization
```

## Usage
```js
const { cacheFunction, cacheMethod } = require('function-memoization');

let func = function (p1 = '', p2 = {}, callback) { /**/ };
func = cacheFunction(func);
func(/* args */);

let obj = {
    method: function (p1 = 0, p2 = {}, p3 = [], callback) { /**/ }
};
cacheMethod(obj, 'method');
obj.method(/* args */);
```

## Options

### async
Boolean value, whether to execute the callback function asynchronously, `false` by default.

```js
func = cacheFunction(func, { async: true });
func(/* args */);

cacheMethod(obj, 'method', { async: true });
obj.method(/* args */);
```

## License
MIT
