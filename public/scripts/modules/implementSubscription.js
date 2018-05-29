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
    define(['modules/helper'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('modules/helper'));
  } else {
    // Browser globals (root is window)
    root.implementSubscription = factory(root.helper);
  }
}(typeof self !== 'undefined' ? self : this,
  /**
   * @param {module:modules/helper} helper
   */
  function (helper) {
    'use strict';

    /**
     * @module modules/implementSubscription
     *
     * @description Mutates the passed object to implement a Publish/Subscribe pattern ('Similar' to DOM events)
     *
     * NOTE: Three properties are overwritten/added to the publisher.
     *  - publisher.publish - Calls all of the subscriptions for a specific topic
     *  - publisher.subscribe - Subscribes to a specific topic
     *  - publisher.unsubscribe - Removes a currently existing subscription
     *
     * @param {Object|Function} publisher - The item to use as the subject.
     *
     * @returns {object|function} - Returns the publisher after it has been mutated.
     */
    return function (publisher) {

      // Topics can be subscribed and published to
      // A list of topics with arrays of subscriptions for each.
      let topics = {},
        // Topic incrementer to give each subscription a unique identifier
        subscriptionInc = 0,
        // Contains all of the currently active subscriber tokens. (values are the topic)
        tokenIndex = {};

      /**
       * @memberOf publisher
       *
       * @param {string} topic - The topic/event name that you want to call all of the subscribers for
       * @param {array} args - The arguments that will be passed to each subscriber function
       *
       * @returns {object} - The publisher that is publishing (allows for chainable calls)
       */
      publisher.publish = function (topic, args) {

        // If nothing has subscribed to this topic, then do nothing with the publish.
        if (!topics[topic]) {
          return this;
        }

        let subscribers = topics[topic];

        helper.each(subscribers, function (idx, subscriber) {

          subscriber.func.apply(subscriber, args);

          if (subscriber.once) {
            publisher.unsubscribe(subscriber.token);
          }
        });

        return this;
      };

      /**
       * @memberOf publisher
       *
       * @param {string} topic - The topic (event) you want to subscribe to
       * @param {function} func - The function to run whenever the topic is published. ('this' will be bound to the subscriber object)
       * @param {object} [options] - Config options
       * @param {boolean} [options.once=false] - Deletes the subscriber after its function is called
       *
       * @returns {string} - The unique token that this subscription is bound to. (Needed to unsubscribe later)
       */
      publisher.subscribe = function (topic, func, options) {

        if (!topics[topic]) {
          topics[topic] = [];
        }

        let token = (++subscriptionInc).toString();

        topics[topic].push({
          token: token,
          func: func,
          once: options ? options.once === true : false
        });

        tokenIndex[token] = topic;

        return token;
      };

      /**
       * @memberOf publisher
       *
       * @param {number} token - The token for the subscription you want to remove.
       *
       * @returns {*} - The token is returned on success, on failure the publisher is returned.
       */
      publisher.unsubscribe = function (token) {

        let success = false;

        if (tokenIndex[token] && topics[tokenIndex[token]]) {
          let topic = tokenIndex[token];

          helper.each(topics[topic], function (idx, subscriber) {

            if (subscriber.token === token) {
              topics[topic].splice(idx, 1);
              delete tokenIndex[token];

              if (!topics[topic].length) {
                delete topics[topic];
              }

              success = true;
              return false;
            }
          });
        }

        if (success) {
          return token;
        }

        return this;
      };

      /**
       * @mixin publisher
       */
      return publisher;
    };
  }));
