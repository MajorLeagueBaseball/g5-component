/**
 *
 * @module utils/extender
 * @description module for extending data
 *
 */

'use strict';

const merge = require('lodash/object/merge');

/**
 *
 * @function extender
 * @param {Object} data
 * @returns {Object} extended data
 *
 */
function extender(data={}) {

    let game = data.data && data.data.game;

    return merge(data, {
        data: {
            game: {
                description: game.away_team_name + ' @ ' + game.home_team_name
            }
        }
    });

}

module.exports = extender;
