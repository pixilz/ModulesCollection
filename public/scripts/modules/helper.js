/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 the UMD contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * returnExports.js
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.helper = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * @module modules/helper
   *
   * @description Various helper functions that can be used throughout an entire project.
   */

  return {
    /**
     * @param {Array|Object} iterable
     * @param {function(string|number, *)} callback
     *  Called for each item in the iterable.
     *  The callback will be passed (key, value) for each item
     *  NOTE: Returning false from the callback will break out of the 'each'
     */
    each: function (iterable, callback) {
      let idx = 0, key,
        continueIteration = true;

      if (Array.isArray(iterable)) {
        let length = iterable.length;

        for (; idx < length; idx++) {
          continueIteration = callback.call(iterable[idx], idx, iterable[idx]);

          if (continueIteration === false) {
            break;
          }
        }
      } else {
        for (key in iterable) {
          if (iterable.hasOwnProperty(key)) {
            continueIteration = callback.call(iterable[key], key, iterable[key]);

            if (continueIteration === false) {
              break;
            }
          }
        }
      }
    }
  };
}));
