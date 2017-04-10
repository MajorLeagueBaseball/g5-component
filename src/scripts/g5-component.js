/**
 *
 * @module g5-component
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc Browserify Component Scaffold
 *
 */

import { assign } from './dependencies/nodash';
import utils from './utils/master';
import { EventEmitter } from 'events';
import dependencies from './dependencies/container';

/**
 *
 * @class G5Component
 * @extends EventEmitter
 *
 */
class G5Component extends EventEmitter {

    /**
     *
     * @param {Object} opts shared options Object
     *
     */
    constructor(opts) {

        super();

        this.opts = assign({
            container: undefined,
            i18n: 'en'
        }, opts);

        this.model = new dependencies.Model(this.opts);
        this.viewModel = new dependencies.ViewModel(this.opts);
        this.eventTower = new dependencies.EventTower(this);

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

/**
 *
 * @param {object} opts
 * @returns {G5Component}
 * @desc allows g5Component initialization without 'operator new'.
 *
 */
const g5ComponentFactory = function (opts) {
    return new G5Component(opts);
};

g5ComponentFactory.prototype = {
    constructor: G5Component,
    name: 'G5Component'
};

export default g5ComponentFactory;
