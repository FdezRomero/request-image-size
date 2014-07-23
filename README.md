# request-image-size

[![NPM](https://nodei.co/npm/request-image-size.png)](https://nodei.co/npm/request-image-size/)

This NodeJS module is a clone of [http-image-size](https://github.com/jo/http-image-size) by Johannes J. Schmidt. It detects image dimensions via [request](https://github.com/mikeal/request) instead of `http`/`https`, allowing for more flexibility and following redirects by default. Tries [image-size](https://github.com/netroy/image-size) on each chunk received until the image dimensions are obtained, and the request is aborted.

## Basic usage
```js
var size = require('request-image-size');

size('http://nodejs.org/images/logo.png', function(err, dimensions, length) {
  console.log(err, dimensions, length);
});
```

## Advanced usage

Specifying a request `options` object ([docs](https://github.com/mikeal/request#requestoptions-callback)):

```js
var size = require('request-image-size');

var options = {
  url: 'http://nodejs.org/images/logo.png',
  headers: {
    'User-Agent': 'request-image-size'
  }
};

size(options, function(err, dimensions, length) {
  console.log(err, dimensions, length);
});
```

The callback receives three arguments: `err`, `dimensions`, `length`:

`dimensions` is in the form `{ height: 1063, width: 1600 }`.  
`length` is the number of bytes loaded.

## License
Copyright (c) 2014 Rodrigo Fernández Romero
Licensed under the MIT license.
