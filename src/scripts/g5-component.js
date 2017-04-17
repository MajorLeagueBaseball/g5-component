/**
 *
 * @module g5-component
 * @author Greg Babula [greg.babula@mlb.com]
 *
 */

import { assign } from './utils/nodash';
import { EventEmitter } from 'events';
import dependencies from './dependencies/container';
import { Log } from './utils/master';

/**
 *
 * @class G5Component
 * @extends EventEmitter
 * @desc Event based Browserify component scaffold.
 *
 */
export default class G5Component extends EventEmitter {

    /**
     *
     * @param {Object} opts shared options Object
     * @param {Object} di containing customizations for the g5 component.
     *
     */
    constructor(opts, di = dependencies) {

        super();

        this.opts = assign({
            container: undefined,
            i18n: 'en'
        }, opts);

        /**
         *
         * @type {Object}
         * @desc Dependencies references are copied at instantiation.
         *
         */
        const implementations = this.implementations = assign({}, di);

        /**
         *
         * @type {Function<void(...args)>}
         * @desc default: log storage in memory to avoid excess console output.
         *
         */
        this.log = implementations.log || new Log();

        /**
         *
         * @type {MasterModel}
         * @desc Models are the heart of any component containing the
         * interactive data as well as a large part of the logic surrounding it.
         *
         */
        this.model = new implementations.Model(this.opts, this);

        /**
         *
         * @type {MasterViewModel}
         * @desc Pure-code representation of the data and operations on a UI.
         *
         */
        this.viewModel = new implementations.ViewModel(this.opts, this);

        /**
         *
         * @type {EventTower}
         * @desc Event communication hub, mediates events between core implementations.
         *
         */
        this.eventTower = new implementations.EventTower(this);

    }

    /**
     *
     * @access public
     * @method init
     * @desc initiates implemnentations
     * @emits {ready}
     * @returns {Object} this
     *
     */
    init() {

        this.log('Initiate G5Component instance.');

        if (!this.hasInstance()) {

            this.viewModel.init();
            this.model.init();

            this.emit('ready', this);

        }

        return this;

    }

    /**
     *
     * @access public
     * @method detachEvents
     * @desc detaches all EventTower events
     * @returns {Object} this
     *
     */
    detachEvents() {

        this.log('Detaching events...');

        this.eventTower.detachEvents();

        return this;

    }

    /**
     *
     * @access public
     * @method attachEvents
     * @desc attaches all EventTower events
     * @returns {Object} this
     *
     */
    attachEvents() {

        this.log('Attaching events...');

        this.eventTower.attachEvents();

        return this;

    }

    /**
     *
     * @access public
     * @method hasInstance
     * @desc checks if active instance exists on the primary container
     * @returns {Boolean}
     *
     */
    hasInstance() {

        return this.viewModel.hasInstance();

    }

    /**
     *
     * @access public
     * @method destroy
     * @desc destroys core instance and all implementations
     * @emits {destroy}
     * @returns {Object} this
     *
     */
    destroy() {

        this.log('Destroying G5Component instance.');

        this.emit('destroy', this);

        this.detachEvents();
        this.model.destroy();
        this.viewModel.destroy();

        return this;

    }

}
