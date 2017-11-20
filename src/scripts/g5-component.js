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
import utils from './utils/master';

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
     * @param {object} opts shared options Object
     * @param {object} di containing customizations for the g5 component.
     *
     */
    constructor(opts, di = dependencies) {

        super();

        this.opts = assign({
            container: undefined,
            i18n: 'en',
            log: new Log()
        }, opts);

        if (!(this.opts.log instanceof Function)) {
            const typeError = new TypeError('opts.log must be a function.');
            utils.trace(typeError);
            throw typeError;
        }

        /**
         *
         * @type {object}
         * @desc Dependencies references are copied at instantiation.
         *
         */
        const implementations = this.implementations = assign({}, di);

        /**
         *
         * @type {MasterModel}
         * @desc Models are the heart of any component containing the
         * interactive data as well as a large part of the logic surrounding it.
         *
         */
        this.model = new implementations.Model(this.opts);

        /**
         *
         * @type {MasterViewModel}
         * @desc Pure-code representation of the data and operations on a UI.
         *
         */
        this.viewModel = new implementations.ViewModel(this.opts, implementations);

        /**
         *
         * @type {EventTower}
         * @desc Event communication hub, mediates events between core implementations.
         *
         */
        this.eventTower = new implementations.EventTower(this);

        /**
         *
         * @type {function} a function<*(...args)> that can log any number of arguments.
         * @desc by default the output will be stored in memory at [this.log.store].
         *
         * @example this.log('hello', { world: 'world' }, true, 42); // logs to memory store
         * @example this.log.toConsole(); // prints entire memory store
         *
         */
        this.log = this.opts.log;

    }

    /**
     *
     * @access public
     * @method init
     * @desc initiates implemnentations
     * @emits {ready}
     * @returns {object} this
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
     * @returns {object} this
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
     * @returns {object} this
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
     * @returns {boolean}
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
     * @returns {object} this
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
