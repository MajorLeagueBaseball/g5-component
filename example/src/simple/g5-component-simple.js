/**
 *
 * @module g5-component-simple
 *
 * This is an example component implementation.
 *
 * In this example, the default implementations from G5/model, G5/viewModel, and G5/events
 * are used, but a customized "component master", as well as an extension to the base G5/model are also provided.
 *
 * These, collectively, are then injected by the factory to produce the example component.
 *
 */

import G5Component from './../../../src/scripts/g5-component';
import { inject } from './../../../src/scripts/dependencies/defaultInjector';

import extender from './component/extender';
import helpers from './component/helpers';
import component from './component/master';
import partials from './component/partials';

import Model from './model/master';

/**
 * Default injector provides baseline.
 * @type {Object}
 */
const implementation = inject({});

/**
 *
 * Override component group and Model specifically.
 *
 */

implementation.extender = extender;
implementation.helpers = helpers;
implementation.component = component;
implementation.partials = partials;
implementation.Model = Model;

/**
 *
 * use named export at the top level
 *
 */
module.exports = function g5Component(opts) {
    return new G5Component(opts, implementation);
};
