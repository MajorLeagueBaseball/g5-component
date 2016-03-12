/**
 *
 * @module component/extender
 * @author Greg Babula [greg.babula@mlb.com]
 * @description component data extender
 *
 */

'use strict';

const pkg = require('./../../../package');

/**
 *
 * @function getGameClasses
 * @description creates game classes based on input
 * @param {Object} opts
 * @returns {String}
 *
 */
function getGameClasses(opts={}) {

    let { component } = opts;

    return `${component}__container ${component}__container--example`;

}

/**
 *
 * @function extender
 * @param {Object} data
 * @param {Object} opts shared options
 * @returns {Object} extended data
 *
 */
function extender(data={}, opts={}) {

    let { game, subject, copyright } = data;
    let { component } = opts;
    let { version } = pkg;

    let css = getGameClasses(opts);

    return {
        css,
        component,
        version,
        game,
        copyright
    };

}

module.exports = extender;
