/**
 *
 * @module component/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @description entry point for all component specific functionality
 * jQuery and Bootstrap provided for example, however neither are required
 *
 */

import utils from './../utils/master';

/**
 *
 * @class Component
 * @description init, render, addEvents, and destroy methods are required for consistency.
 * The parent viewModel is passed in as a reference, for external communication events can
 * be emitted via the parent
 *
 */
class Component {

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
     * @description attaches component functionality
     *
     */
    render() {

        utils.log('render component');

        return this;

    }

    /**
     *
     * @method addEvents
     * @param {Function} cb
     * @returns {Object} this
     * @description adds component events, event listeners should be delegated from primary element
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
        this.$element.on('click', 'dt', (e) => {

            utils.log('list title click', e);

        });

        if (cb instanceof Function) {
            cb(this.$element[0]);
        }

        return this;

    }

    /**
     *
     * @method destroy
     * @returns {Object} this
     * @description detaches component functionality, events must be cleaned up
     *
     */
    destroy() {

        this.$element.find('[data-toggle="tooltip"]').tooltip('destroy');
        this.$element.off();

        return this;

    }

}

/**
 *
 * @function componentFactory
 * @param {Object} parent
 * @returns {Object}
 *
 */
function componentFactory(parent={}) {

    const { opts, element, container, dataCache } = parent;

    const component = new Component();

    component.dataCache = dataCache;
    component.element = element || container;
    component.parent = parent;
    component.opts = opts;

    return component;

}

export default componentFactory;
