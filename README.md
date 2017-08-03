# function-memoization
Make function memoization via data cache.

## Installation
```sh
npm install --save function-memoization
```

## Usage
```js
const { cacheFunction, cacheMethod } = require('function-memoization');

let func = function (p1 = '', p2 = {}, callback) { /**/ };
func = cacheFunction(func);

let obj = {
    data: { /**/ },
    method: function (p1 = 0, p2 = {}, p3 = [], callback) { /**/ }
};
cacheMethod(obj, 'method');
```

## License
MIT
