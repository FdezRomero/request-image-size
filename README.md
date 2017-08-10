# request-image-size

[![NPM](https://nodei.co/npm/request-image-size.png)](https://nodei.co/npm/request-image-size/)

Detects image dimensions via [request](https://github.com/request/request) instead of Node.js native `http`/`https`, allowing for options and following redirects by default. It reduces network traffic by aborting requests as soon as [image-size](https://github.com/image-size/image-size) is able to obtain the image size.

Since version 2.0.0 it returns an ES6 native `Promise` that resolves with the `size` object or rejects with an `Error`. Requires Node.js v4+.

If you prefer using a callback, please use version 1.3.0 instead ([docs](CHANGELOG.md))

Supports all the image formats supported by [image-size](https://github.com/image-size/image-size):
- BMP
- CUR
- GIF
- ICO
- JPEG
- PNG
- PSD
- TIFF
- WebP
- SVG
- DDS

### Dependencies
- [request](https://github.com/request/request)
- [image-size](https://github.com/image-size/image-size)

## Basic usage

```js
const requestImageSize = require('request-image-size');

requestImageSize('http://nodejs.org/images/logo.png')
.then(size => console.log(size))
.catch(err => console.error(err));
```

Result:
```js
{ width: 245, height: 66, type: 'png', downloaded: 856 }
```


## Advanced usage

Specifying a request `options` object ([docs](https://github.com/request/request/#requestoptions-callback)):

```js
const requestImageSize = require('request-image-size');

const options = {
  url: 'http://nodejs.org/images/logo.png',
  headers: {
    'User-Agent': 'request-image-size'
  }
};

requestImageSize(options)
.then(size => console.log(size))
.catch(err => console.error(err));
```

## License

Copyright (c) 2017 Rodrigo Fernández Romero

Licensed under the MIT license.

Based on [http-image-size](https://github.com/jo/http-image-size) from Johannes J. Schmidt.
