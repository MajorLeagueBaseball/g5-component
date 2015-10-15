/**
 *
 * @module component/helpers
 * @author Greg Babula
 * @description module for adding handlebars helpers
 *
 */

'use strict';

/**
 *
 * @name helpers
 * @description handlebars helpers to be registered
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
