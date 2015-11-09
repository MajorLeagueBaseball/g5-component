/**
 *
 * @module component/master
 * @author Greg Babula
 * @description entry point for all component specific functionality, jQuery and Bootstrap provided
 * for example, however neither are required and only live within this file
 *
 */

'use strict';

const $     = global.jQuery = require('jquery');
const utils = require('./../utils/master');

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
     * @param {Object} parent viewModel
     * @returns {Object} this
     * @description instantiates component with a reference to the parent viewModel, properties on
     * the parent reference should never be modified in any way
     *
     */
    init(parent) {

        let { opts, container } = parent;

        this.opts = opts;
        this.parent = parent;
        this.$element = $(container);

        this.render().addEvents();

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
     * @returns {Object} this
     * @description attaches component events, event listeners should be delegated from primary element
     *
     */
    addEvents() {

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

module.exports = component;
