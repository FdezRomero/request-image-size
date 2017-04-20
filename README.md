# request-image-size

[![NPM](https://nodei.co/npm/request-image-size.png)](https://nodei.co/npm/request-image-size/)

This NodeJS module is an extension of [http-image-size](https://github.com/jo/http-image-size) by Johannes J. Schmidt. It detects image dimensions via [request](https://github.com/mikeal/request) instead of Node.js native `http`/`https`, allowing for more flexibility and following redirects by default. Tries [image-size](https://github.com/netroy/image-size) on each chunk received until the image dimensions are obtained, and the request is aborted.

## Basic usage
```js
var size = require('request-image-size');

requestImageSize('http://nodejs.org/images/logo.png', function(err, size, downloaded) {

  if (err) {
    return console.error('An error has ocurred:', error);
  }

  if (!size) {
    return console.error('Could not get image size');
  }

  console.log('Image is %dpx x %dpx, downloaded %d bytes', size.width, size.height, downloaded);

});
```

## Advanced usage

Specifying a request `options` object ([docs](https://github.com/mikeal/request#requestoptions-callback)):

```js
var requestImageSize = require('request-image-size');

var options = {
  url: 'http://nodejs.org/images/logo.png',
  headers: {
    'User-Agent': 'request-image-size'
  }
};

requestImageSize(options, function(err, size, length) {
  console.log(err, size, length);
});
```

The callback receives three arguments: `err`, `size`, `downloaded`:

- `err` returns an `Error` object if anything goes wrong.
- `size` is in the form `{ width: 245, height: 66, type: 'png' }`.
- `downloaded` is the number of bytes downloaded before being able to extract the image size.

## License
Copyright (c) 2017 Rodrigo Fernández Romero
Licensed under the MIT license.
