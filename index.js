/**
 * request-image-size: Detect image dimensions via request.
 *
 * Licensed under the MIT license.
 *
 * https://github.com/FdezRomero/request-image-size
 * © 2014 Rodrigo Fernández Romero
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
  
  var buffer = new Buffer([]);
  var dimensions;

  var req = request(opts)
    .on('data', function(chunk) {
      buffer = Buffer.concat([buffer, chunk]);
      try {
        dimensions = sizeOf(buffer);
        req.abort();
      } catch(e) {}
    })
    .on('error', function(err) {
      done(err);
    })
    .on('end', function() {
      done(null, dimensions, buffer.length);
    });
  
};
