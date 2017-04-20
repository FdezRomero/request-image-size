/**
 * request-image-size: Detect image dimensions via request.
 *
 * Licensed under the MIT license.
 *
 * https://github.com/FdezRomero/request-image-size
 * © 2017 Rodrigo Fernández Romero
 *
 * Based on the work of Johannes J. Schmidt
 * https://github.com/jo/http-image-size
 */

'use strict';

var request = require('request');
var imageSize = require('image-size');
var util = require('util');

module.exports = function requestImageSize(options, callback) {

  var callbackCalled = false;
  var opts;

  function done(err, size, downloaded) {
    if (!callbackCalled) {
      callbackCalled = true;
      return callback(err, size, downloaded);
    }
  }

  if (options && typeof options === 'object') {
    opts = util._extend({}, options);
    opts.encoding = null;
  } else if (options && typeof options === 'string') {
    opts = { uri: options };
  } else {
    return done(new Error('You should provide an URI or a "request" options object.'));
  }

  var req = request(opts);

  req.on('response', function(res) {

    var buffer = new Buffer([]);
    var size;
    var imageSizeError;

    res.on('data', function(chunk) {

      buffer = Buffer.concat([ buffer, chunk ]);

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

    res.on('error', function(err) {
      return done(err);
    });

    res.on('end', function() {

      if (!size) {
        return done(imageSizeError);
      }

      return done(null, size, buffer.length);

    });

  });

  req.on('error', function(err) {
    return done(err);
  });

};
