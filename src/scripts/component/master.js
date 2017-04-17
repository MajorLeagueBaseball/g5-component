/**
 *
 * @module component/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @see ./example/simple/component/master
 *
 */

/**
 *
 * @class Component
 * @desc entry point for all component specific functionality
 * @note init, render, addEvents, and destroy methods are required for consistency.
 * The parent viewModel is passed in as a reference, for external communication events can
 * be emitted via the parent
 *
 */
class Component {

    /**
     *
     * @param {G5Component|Object} parent
     *
     */
    constructor(parent) {

        const { opts, element, container, dataCache } = parent;

        this.dataCache = dataCache;
        this.element = element || container;
        this.parent = parent;
        this.opts = opts;

    }

    /**
     *
     * @access public
     * @method init
     * @param {Object} data
     * @desc instantiates component with a reference to the parent viewModel, properties on
     * the parent reference should never be modified in any way.
     * @returns {Object} this
     *
     */
    init(data={}) {

        this.dataCache = data;

        return this;

    }

    /**
     *
     * @access public
     * @method destroy
     * @desc detaches component functionality, events must be cleaned up
     * @returns {Object} this
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
 * @param {Object} parent
 * @returns {Component}
 *
 */
export default function componentFactory(parent={}) {

    return new Component(parent);

}
