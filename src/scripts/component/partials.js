/**
 *
 * @module component/partials
 * @author Greg Babula [greg.babula@mlb.com]
 * @description handlebars partials reference
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
    'game-media': require('../../template/partials/game-media.html')
};

module.exports = partials;
