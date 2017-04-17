/**
 *
 * @module stubInjector
 * @desc This injector assigns the minimal stub dependencies.
 * This is the lowest functionality level that can be provided to a component.
 *
 */

import { stub } from './container';

/**
 *
 * @function inject
 * @param {object} container
 * @returns {object}
 *
 */
export function inject(container) {

    const copy = stub();

    for (const key in copy) {
        if (copy.hasOwnProperty(key)) {
            container[key] = copy[key];
        }
    }

    return container;

}
