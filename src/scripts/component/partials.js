/**
 *
 * @module component/partials
 * @author Greg Babula
 * @description module for adding handlebars partials
 *
 */

'use strict';

/**
 *
 * @name partials
 * @description handlebars partials to be registered
 * @note paths must be hardcoded because Browserify can only do static string analysis
 *
 */
let partials = {
    'button': require('../../template/partials/button.html')
};

module.exports = partials;
