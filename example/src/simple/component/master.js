/**
 *
 * @module component/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc entry point for all component specific functionality
 *
 * Instead of importing dependencies such as moment or jQuery here explicitly, consider
 * making them runtime requirements, such as via parent.opts or parent.dependencies (arbitrary examples).
 *
 * You can then provide them from the component initialization site and make an Error-throwing check for them in this constructor.
 *
 */

import utils from './../../../../src/scripts/utils/master';

/**
 *
 * @class Component
 * @desc init, render, addEvents, and destroy methods are required for consistency.
 * The parent viewModel is passed in as a reference, for external communication events can
 * be emitted via the parent
 *
 */
class Component {

    /**
     *
     * @param {ViewModel|Object} parent
     *
     */
    constructor(parent) {

        const { opts, element, container, dataCache } = parent;

        this.dataCache = dataCache;
        this.element = element || container;
        this.parent = parent;
        this.opts = opts;

        /**
         *
         * example of a required options/dependency
         *
         */
        // if (!this.opts.moment) {
        //     throw new Error('Missing dependency in initialization: moment');
        // }

        this.onClick = Component.onClick.bind(this);

    }

    /**
     *
     * @method init
     * @param {Object} data
     * @desc instantiates component with a reference to the parent viewModel, properties on
     * the parent reference should never be modified in any way
     * @returns {Object} this
     *
     */
    init(data={}) {

        const { opts } = this;
        const { extendListeners } = opts;

        this.dataCache = data;
        this.render().addEvents(extendListeners);

        return this;

    }

    /**
     *
     * @method render
     * @returns {Object} this
     * @desc attaches component functionality
     *
     */
    render() {

        this.opts.log('render component');

        return this;

    }

    /**
     *
     * @param {Event} e
     * @desc an example click event. Event handler functions should be L-values to allow unbinding.
     *
     */
    static onClick(e) {

        this.opts.log('list click', e);

    }

    /**
     *
     * @method addEvents
     * @param {Function} cb
     * @desc adds component events, event listeners should be delegated from primary element
     * @returns {Object} this
     *
     */
    addEvents(cb) {

        /**
         *
         * @event click
         * @param {Object} e event
         * @desc simple event example
         *
         */
        this.element.addEventListener('click', this.onClick);

        if (cb instanceof Function) {
            cb(this.element);
        }

        return this;

    }

    /**
     *
     * @method destroy
     * @returns {Object} this
     * @desc detaches component functionality, events must be cleaned up
     *
     */
    destroy() {

        this.element.removeEventListener('click', this.onClick);

        return this;

    }

}

/**
 *
 * @function componentFactory
 * @param {Object} parent
 * @returns {Component}
 *
 */
export default function componentFactory(parent={}) {

    return new Component(parent);

}
