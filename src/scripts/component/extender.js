/**
 *
 * @module utils/extender
 * @description module for extending data after its been retrieved by the model
 *
 */

'use strict';

const merge = require('lodash/object/merge');

/**
 *
 * @function extender
 * @param {Object} data
 * @param {Object} opts shared options
 * @returns {Object} extended data
 *
 */
function extender(data={}, opts={}) {

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
