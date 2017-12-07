/**
 *
 * @module component/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @see ./example/simple/component/master
 *
 */

import utils from './../utils/master';

/**
 *
 * @class Component
 * @desc entry point for all component specific functionality
 * @note init, render, addEvents, and destroy methods are required for consistency.
 * The parent viewModel is passed in as a reference, for external communication events can
 * be emitted via the parent
 *
 */
export class Component {

    /**
     *
     * @param {ViewModel|object} parent
     *
     */
    constructor(parent) {

        const { opts, element, container, dataCache } = parent;

        /**
         *
         * @type {object}
         *
         */
        this.dataCache = dataCache;

        /**
         *
         * @type {HTMLElement}
         *
         */
        this.element = element || container;

        /**
         *
         * @type {ViewModel}
         *
         */
        this.parent = parent;

        /**
         *
         * @type {object}
         *
         */
        this.opts = opts;

        /**
         *
         * @type {function} a logging function<*(...args)>.
         * @see G5Component()
         *
         */
        this.log = this.opts.log || utils.log;

    }

    /**
     *
     * @access public
     * @method init
     * @param {object} [data]
     * @desc instantiates component with a reference to the parent viewModel, properties on
     * the parent reference should never be modified in any way.
     * @returns {object} this
     *
     */
    init(data = {}) {

        this.dataCache = data;

        return this;

    }

    /**
     *
     * @access public
     * @method destroy
     * @desc detaches component functionality, events must be cleaned up
     * @returns {object} this
     *
     */
    destroy() {

        return this;

    }

}

/**
 *
 * @access public
 * @function componentFactory
 * @param {ViewModel|object} [parent]
 * @returns {Component}
 *
 */
export default function componentFactory(parent = {}) {

    return new Component(parent);

}
