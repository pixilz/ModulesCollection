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
    define(['require', '/scripts/build/es6-promise.auto.js'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require, require('/scripts/build/es6-promise.auto'));
  } else {
    // Browser globals (root is window)
    root.promiseWrapper = factory();
  }
}(typeof self !== 'undefined' ? self : this, function (require) {
  'use strict';

  /**
   * @typedef {Object} pixilzPromise
   * @property moduleData
   */

  /**
   * @module modules/promiseWrapper
   * @description This is used to require modules dynamically. (For full support and ease of use a promise is always returned)
   *
   * @param {string} moduleName - The name of the module you would like to require.
   *
   * @return {Promise<pixilzPromise>} - The promise onResolve will be passed the module data.
   */
  return function (moduleName) {
    // Return the promise so that the 'resolve' can be easily run
    return new Promise(function (resolve, reject) {
      if (typeof require === 'function') {
        require([moduleName], function (moduleValue) {
          resolve(moduleValue);
        }, function () {
          // Swallows require errors and just reject promise.
          reject('Unable to load module: ' + moduleName);
        })
      } else if (window[moduleName]) {
        resolve(window[moduleName]);
      } else {
        reject('Unable to load module: ' + moduleName);
      }
    });
  };
}));
