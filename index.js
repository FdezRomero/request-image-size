/**
 * request-image-size: Detect image dimensions via request.
 *
 * Licensed under the MIT license.
 *
 * https://github.com/FdezRomero/request-image-size
 * © 2015 Rodrigo Fernández Romero
 *
 * Based on the work of Johannes J. Schmidt
 * https://github.com/jo/http-image-size
 */

'use strict';

var request = require('request');
var sizeOf = require('image-size');
var util = require('util');

module.exports = function(options, done) {

  var opts;

  if (options && typeof options === 'object') {
    opts = util._extend({}, options);
    opts.encoding = null;
  } else if (options && typeof options === 'string') {
    opts = { uri: options };
  } else {
    throw new Error('You should provide an URI or a "request" options object.');
  }

  var req = request(opts);

  req.on('response', function(response) {

    var buffer = new Buffer([]);
    var dimensions;
    var imageTypeDetectionError;

    response
    .on('data', function(chunk) {
      buffer = Buffer.concat([buffer, chunk]);
      try {
        dimensions = sizeOf(buffer);
      } catch (e) {
        imageTypeDetectionError = e;
        return;
      }
      req.abort();
    })
    .on('error', function(err) {
      return done(err);
    })
    .on('end', function() {
      if (!dimensions) {
        return done(imageTypeDetectionError);
      }
      return done(null, dimensions, buffer.length);
    });

  });

  // Prevent maxRedirects exceptions from being thrown
  // Callback was already called in 'return done(imageTypeDetectionError)'
  req.on('error', function(err) {});

};
