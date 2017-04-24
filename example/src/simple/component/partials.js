/**
 *
 * @module component/partials
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc handlebars partials reference
 *
 */

import gameMedia from '../../../../src/template/partials/game-media.html';

/**
 *
 * @name partials
 * @desc handlebars partials to be registered
 * @note paths must be hardcoded because Browserify can only do static string analysis
 *
 */
const partials = {
    'game-media': gameMedia
};

export default partials;
