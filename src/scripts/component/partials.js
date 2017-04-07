/**
 *
 * @module component/partials
 * @author Greg Babula [greg.babula@mlb.com]
 * @description handlebars partials reference
 *
 */

import gameMedia from '../../template/partials/game-media.html';

/**
 *
 * @name partials
 * @description handlebars partials to be registered
 * @note paths must be hardcoded because Browserify can only do static string analysis
 *
 */
const partials = {
    'game-media': gameMedia
};

export default partials;
