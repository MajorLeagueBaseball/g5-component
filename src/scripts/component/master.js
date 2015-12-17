/**
 *
 * @module component/master
 * @author Greg Babula
 * @description entry point for all component specific functionality, jQuery and Bootstrap provided
 * for example, however neither are required and only live within this file
 *
 */

'use strict';

const $          = global.jQuery = require('jquery');
const utils      = require('./../utils/master');
const isFunction = require('lodash/lang/isFunction');

require('bootstrap/js/tooltip');

/**
 *
 * @name component
 * @description init, render, addEvents, and destroy methods are required for consistency.
 * The parent viewModel is passed in as a reference, for external communication events can
 * be emitted via the parent
 *
 */
let component = {
    /**
     *
     * @method init
     * @param {Object} data
     * @returns {Object} this
     * @description instantiates component with a reference to the parent viewModel, properties on
     * the parent reference should never be modified in any way
     *
     */
    init(data={}) {

        let { opts } = this;
        let { extendListeners } = opts;

        this.dataCache = data;
        this.render().addEvents(extendListeners);

        return this;

    },
    /**
     *
     * @method render
     * @returns {Object} this
     * @description attaches component functionality
     *
     */
    render() {

        utils.log('render component');

        this.$element.find('[data-toggle="tooltip"]').tooltip();

        return this;

    },
    /**
     *
     * @method addEvents
     * @param {Function} cb
     * @returns {Object} this
     * @description attaches component events, event listeners should be delegated from primary element
     *
     */
    addEvents(cb) {

        /**
         *
         * @event click
         * @param {Object} e event
         * @description simple event example
         *
         */
        this.$element.on('click', 'dt', function(e) {

            utils.log('list title click', e);

        });

        if (isFunction(cb)) {
            cb(this.$element[0]);
        }

        return this;

    },
    /**
     *
     * @method destroy
     * @returns {Object} this
     * @description detaches component functionality, events must be cleaned up to prevent memory leaks
     *
     */
    destroy() {

        this.$element.find('[data-toggle="tooltip"]').tooltip('destroy');
        this.$element.off();

        return this;

    }
};

/**
 *
 * @function componentFactory
 * @param {Object} parent
 * @returns {Object}
 *
 */
function componentFactory(parent={}) {

    let { opts, container, dataCache } = parent;

    return Object.assign(Object.create(component), {
        $element: $(container),
        parent,
        dataCache,
        opts
    });

}

module.exports = componentFactory;
