/**
 *
 * @module stubInjector
 * @desc This injector assigns the minimal stub dependencies. This is the lowest functionality level that can
 * be provided to a component.
 *
 */

import stub from './container';

/**
 *
 * @param {object} container
 * @returns {object}
 *
 */
export function inject(container) {

    for (const key in stub) {

        if (stub.hasOwnProperty(key)) {

            container[key] = stub[key];

        }

    }

    return container;

}
