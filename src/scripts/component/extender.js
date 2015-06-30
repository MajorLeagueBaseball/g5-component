/**
 *
 * @module utils/extender
 * @description module for extending data
 *
 */

'use strict';

const _ = require('lodash');

/**
 *
 * @function extender
 * @param {Object} data
 * @returns {Object} extended data
 *
 */
function extender(data={}) {

    let game = data.data && data.data.game;

    return _.merge(data, {
        data: {
            game: {
                description: game.away_team_name + ' @ ' + game.home_team_name
            }
        }
    });

}

module.exports = extender;
