/**
 *
 * @module g5-component-browser
 * @todo allow export default to generate name of bundle
 *
 */

import g5ComponentFactory from './g5-component';
import defaultInjector from './dependencies/defaultInjector';
import container from './dependencies/container';

/**
 *
 * use named export at the top level
 *
 */
defaultInjector(container);

module.exports = g5ComponentFactory;
