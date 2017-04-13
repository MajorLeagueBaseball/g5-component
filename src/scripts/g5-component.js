/**
 *
 * @module g5-component
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc Browserify Component Scaffold
 *
 */

import { assign } from './utils/nodash';
import utils from './utils/master';
import { EventEmitter } from 'events';
import dependencies from './dependencies/container';

/**
 *
 * @class G5Component
 * @extends EventEmitter
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
         * Dependencies references are copied at instantiation.
         * @type {Object}
         *
         */
        const implementations = this.implementations = assign({}, di);

        this.model = new implementations.Model(this.opts);
        this.viewModel = new implementations.ViewModel(this.opts, implementations);
        this.eventTower = new implementations.EventTower(this);

    }

    /**
     *
     * @method init
     * @desc initiates model and viewModel
     * @returns {Object} this
     *
     */
    init() {

        utils.log('init');

        if (!this.hasInstance()) {

            this.viewModel.init();
            this.model.init();

            this.emit('ready', this);

        }

        return this;

    }

    /**
     *
     * @method detachEvents
     * @desc detaches all events
     * @returns {Object} this
     *
     */
    detachEvents() {

        this.eventTower.detachEvents();

        return this;

    }

    /**
     *
     * @method attachEvents
     * @desc attaches all events
     * @returns {Object} this
     *
     */
    attachEvents() {

        this.eventTower.attachEvents();

        return this;

    }

    /**
     *
     * @method hasInstance
     * @desc checks if active instance exists on container
     * @returns {Boolean}
     *
     */
    hasInstance() {

        return this.viewModel.hasInstance();

    }

    /**
     *
     * @method destroy
     * @desc kills component instance
     * @returns {Object} this
     *
     */
    destroy() {

        this.emit('destroy', this);

        this.detachEvents();
        this.model.destroy();
        this.viewModel.destroy();

        return this;

    }

}
