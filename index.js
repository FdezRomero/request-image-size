/**
 * request-image-size: Detect image dimensions via request.
 * Licensed under the MIT license.
 *
 * https://github.com/FdezRomero/request-image-size
 * © 2017 Rodrigo Fernández Romero
 *
 * Based on the work of Johannes J. Schmidt
 * https://github.com/jo/http-image-size
 */

const request = require('request');
const imageSize = require('image-size');
const HttpError = require('standard-http-error');

module.exports = function requestImageSize(options) {
  let opts = {
    encoding: null
  };

  if (options && typeof options === 'object') {
    opts = Object.assign(options, opts);
  } else if (options && typeof options === 'string') {
    opts = Object.assign({ uri: options }, opts);
  } else {
    return Promise.reject(new Error('You should provide an URI string or a "request" options object.'));
  }

  opts.encoding = null;

  return new Promise((resolve, reject) => {
    const req = request(opts);

    req.on('response', res => {
      if (res.statusCode >= 400) {
        return reject(new HttpError(res.statusCode, res.statusMessage));
      }

      let buffer = new Buffer([]);
      let size;
      let imageSizeError;

      res.on('data', chunk => {
        buffer = Buffer.concat([buffer, chunk]);

        try {
          size = imageSize(buffer);
        } catch (err) {
          imageSizeError = err;
          return;
        }

        if (size) {
          return req.abort();
        }
      });

      res.on('error', err => reject(err));

      res.on('end', () => {
        if (!size) {
          return reject(imageSizeError);
        }

        size.downloaded = buffer.length;
        return resolve(size);
      });
    });

    req.on('error', err => reject(err));
  });
};
