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
     * @param {String} s
     * @returns {String} lowercase String
     *
     */
    'upcase': function(s) {

        return s && s.toUpperCase();

    },
    /**
     *
     * @function ifOr
     * @param {Boolean} a
     * @param {Boolean} b
     * @param {Object} options
     * @returns {Function}
     *
     */
    'ifOr': function(a, b, options) {

        if (a || b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    },
    /**
     *
     * @function ifAnd
     * @param {Boolean} a
     * @param {Boolean} b
     * @param {Object} options
     * @returns {Function}
     *
     */
    'ifAnd': function(a, b, options) {

        if (a && b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }

    }
};

module.exports = helpers;
