/**
 *
 * @module g5-component-composition
 *
 * @desc This is an example of component composition, the organization of more than one g5Component instance to form
 * a larger component, like with Voltron, the Power Rangers, etc.
 *
 * Here we will create a List component which contains Row components.
 *
 * @todo annotate with comments?
 *
 */

import G5Component from './../../src/scripts/g5-component';
import { inject } from './../../src/scripts/dependencies/defaultInjector';

class Row extends G5Component {

    constructor(opts) {

        const implementation = G5Component.dependencies;

        implementation.extender = function (data, opts) {
            return opts.row;
        };

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

    template() {
        return this.implementations.template(
            this.implementations.extender(null, this.opts)
        );
    }

}

class List extends G5Component {

    constructor(opts) {

        const implementation = inject({});

        implementation.extender = function (data, opts) {
            return opts.rows;
        };

        implementation.template = function (data) {

            const list = document.createElement('ul');

            for (const row of data) { // note; Symbol not for production

                list.appendChild(new Row({ row }).template());

            }

            return list;

        };

        super(opts, implementation);

    }

}

module.exports = function (opts) {

    return new List(opts);

};
