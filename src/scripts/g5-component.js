/**
 *
 * @module g5-component
 * @author Greg Babula [greg.babula@mlb.com]
 * @description Browserify Component Scaffold
 *
 */

import { assign } from './dependencies/nodash';
import utils from './utils/master';
import { EventEmitter } from 'events';
import dependencies from './dependencies/container';

/**
 *
 * @constructor G5Component
 * @param {Object} opts shared options Object
 *
 */
class G5Component extends EventEmitter {

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
     * @description initiates model and viewModel
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
     * @description detaches all events
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
     * @description attaches all events
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
     * @description checks if active instance exists on container
     * @returns {Boolean}
     *
     */
    hasInstance() {

        return this.viewModel.hasInstance();

    }

    /**
     *
     * @method destroy
     * @description kills component instance
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

const g5ComponentFactory = function (opts) {
    return new G5Component(opts);
};
g5ComponentFactory.prototype = {
    constructor: G5Component,
    name: 'G5Component'
};

export default g5ComponentFactory;
