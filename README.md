# function-memoization
Make function memoization via data cache.

## Installation
```sh
npm install --save function-memoization
```

## Usage
```js
const { cacheFunction, cacheMethod } = require('function-memoization');
cacheFunction(func); // return a new function
cacheMethod(obj, 'methodName'); // return obj
```

## License
MIT
