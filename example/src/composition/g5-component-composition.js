/**
 *
 * @module g5-component-composition
 *
 * @desc This is an example of component composition, the organization of more than one g5Component instance to form
 * a larger component, like with Voltron, the Power Rangers, etc.
 *
 * Here we will create a List component which contains Row components.
 *
 */

import G5Component from './../../../src/scripts/g5-component';
import { inject } from './../../../src/scripts/dependencies/lightInjector';
import { inject as stub } from './../../../src/scripts/dependencies/stubInjector';

/**
 *
 * Suppose you have the need for a structure like the following:
 * <ul>
 *     <li></li>
 *     <li></li>
 *     ...
 * </ul>
 *
 * As in
 *
 * <scoreboard>
 *     <game></game>
 *     <game></game>
 *     ...
 * </scoreboard>
 *
 * This can be a single component, of course, but it could also be a composition if you would like the individual
 * parts <li> to have independent behaviors such as managing their own event listeners, data, or polling.
 *
 * Those can be accomplished in a monolithic component as well, but there is an additional benefit of re-usability
 * which a monolith does not provide.
 *
 */

class Row extends G5Component {

    constructor(opts) {

        /**
         * Only stub functionality as baseline.
         * @type {Object}
         */
        const implementation = stub({});

        /**
         *
         * For example's expedience, our Row component will accept data through its constructor: opts.
         * @param {object} data
         * @param {object} opts
         * @returns {object}
         *
         */
        implementation.extender = function (data, opts) {
            return opts.row;
        };

        /**
         *
         * Also for expedience, our template will directly return an HTML element instead of
         * using a Handlebars template as would normally be the case.
         *
         * @param {Object} data
         * @returns {HTMLElement} (implementations of [template] can also return a string)
         *
         */
        implementation.template = function (data) {

            const li = document.createElement('li');
            li.innerHTML = data;
            li.addEventListener('click', () => {
                console.log(data);
            });

            return li;

        };

        super(opts, implementation);

    }

    /**
     *
     * @returns {HTMLElement|String}
     * @desc Offer a top level function for the parent component to extract the template.
     *
     */
    template() {
        return this.implementations.template(
            this.implementations.extender(null, this.opts)
        );
    }

}

class List extends G5Component {

    constructor(opts) {

        /**
         * For the List, its implementation uses the G5Component light injector instead of the stubs like with Row.
         * @type {Object}
         */
        const implementation = inject({});

        /**
         *
         * Nothing to do for our simple data extender.
         * @param {object} data
         * @param {object} opts
         * @returns {object}
         *
         */
        implementation.extender = function (data, opts) {
            return data;
        };

        /**
         *
         * Again demonstrating a direct template function in lieu of a hbsfy-compiled function.
         *
         * @param {Object} data
         * @returns {HTMLElement} (implementations of [template] can also return a string)
         *
         */
        implementation.template = function (data) {

            const list = document.createElement('ul');

            for (const row of data) { // note: Symbol not for production

                list.appendChild(new Row({ row }).template());

            }

            return list;

        };

        super(opts, implementation);

    }

}

/**
 *
 * @param {object} opts
 * @returns {List}
 *
 * Exporting the traditional component factory at the top level.
 * @see ./../composition.html in examples folder.
 *
 */
module.exports = function g5ComponentComposition(opts) {

    return new List(opts);

};
