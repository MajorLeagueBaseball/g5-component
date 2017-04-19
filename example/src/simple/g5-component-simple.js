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

class SimpleComponent extends G5Component {

    constructor(opts) {

        /**
         *
         * @type {Object}
         * @desc Default injector provides baseline.
         *
         */
        const implementation = inject({});

        /**
         *
         * @desc Override component group and Model specifically.
         *
         */
        implementation.extender = extender;
        implementation.helpers = helpers;
        implementation.component = component;
        implementation.partials = partials;
        implementation.Model = Model;

        super(opts, implementation);

    }

}

/**
 *
 * @desc use named export at the top level
 *
 */
module.exports = function factory(opts) {
    return new SimpleComponent(opts);
};
