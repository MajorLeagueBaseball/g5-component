/**
 *
 * @module component/helpers
 * @description module for adding handlebar helpers
 * @author Greg Babula
 *
 */

'use strict';

/**
 *
 * @name helpers
 * @description handlebar helpers to be registered
 *
 */
let helpers = {
    /**
     *
     * @method upcase
     * @description example helper, transforms text to uppercase
     *
     */
    'upcase': function(s) {
        return s.toUpperCase();
    }
};

module.exports = helpers;
