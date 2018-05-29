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
    define(['modules/promiseWrapper', 'modules/helper', 'interfaces/implementSubscription'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('modules/promiseWrapper'), require('modules/helper'), require('interfaces/implementSubscription'));
  } else {
    // Browser globals (root is window)
    root.pixilz = factory(root.promiseWrapper, root.helper, root.implementSubscription);
  }
}(typeof self !== 'undefined' ? self : this,
  /**
   * @param {function | module:modules/promiseWrapper} promiseWrapper
   * @param {object | module:modules/helper} helper
   * @param {function | module:modules/implementSubscription} implementSubscription
   */
  function (promiseWrapper, helper, implementSubscription) {
    'use strict';

    /**
     * @exports pixilz
     * @mixes publisher
     *
     * @description This is the main entry-point for all modules.
     */
    let pixilz = {
      helper: helper
    };

    implementSubscription(pixilz);

    return pixilz;
  }));