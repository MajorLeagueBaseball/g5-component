/**
 *
 * @module component/helpers
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc handlebars helpers
 *
 */

/**
 *
 * @name helpers
 * @desc handlebars helpers to be registered
 *
 */
const helpers = {
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

    },
    /**
     *
     * @function withItem
     * @desc access object value with a variable key
     * @param {Object} obj
     * @param {Object} options
     * @returns {Function}
     *
     */
    'withItem': function(obj, options) {

        return options.fn(obj[options.hash.key]);

    }
};

export default helpers;
