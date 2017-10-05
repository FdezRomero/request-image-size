<a name="2.1.0"></a>
# 2.1.0 (2017-10-05)

- Minor change: Better error handling by returning an error of type `HttpError` if the response status code is 4xx/5xx, instead of the generic `TypeError: unsupported file type: undefined (file: undefined)` passed by `image-size`. Fixes #8, thanks to @Arturszott and @dustingraves for their contribution.

<a name="2.0.0"></a>
# 2.0.0 (2017-08-10)

- Breaking change: `request-image-size` now returns an ES6 native promise instead of using a callback. Please read about the new API in the [README](README.md). Requires Node.js v4+.
- Updated `image-size` to 0.6.1, adds support for ICO/CUR.

<a name="1.3.0"></a>
# 1.3.0 (2017-04-20)

This is the last version using a callback instead of returning a promise.

## Basic usage

```js
var requestImageSize = require('request-image-size');

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

