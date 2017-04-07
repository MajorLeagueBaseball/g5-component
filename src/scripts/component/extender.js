/**
 *
 * @module component/extender
 * @author Greg Babula [greg.babula@mlb.com]
 * @description component data extender
 *
 */

import pkg from './../../../package.json';

/**
 *
 * @function getGameClasses
 * @description creates game classes based on input
 * @param {Object} opts
 * @returns {String}
 *
 */
function getGameClasses(opts={}) {

    const { component } = opts;

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

    const { game, subject, copyright } = data;
    const { component } = opts;
    const { version } = pkg;

    const css = getGameClasses(opts);

    return {
        css,
        component,
        version,
        game,
        copyright
    };

}

export default extender;
