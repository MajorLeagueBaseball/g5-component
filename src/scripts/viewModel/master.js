/**
 *
 * @module viewModel/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @description master viewModel, setup Handlebars and baseline view
 *
 */

import { isEqual, assign } from './../dependencies/nodash';
import utils from './../utils/master';
import { EventEmitter } from 'events';
import Handlebars from 'hbsfy/runtime';
import dependencies from './../dependencies/container';

/**
 *
 * @class MasterViewModel
 * @extends EventEmitter
 *
 */
class MasterViewModel extends EventEmitter {

    /**
     *
     * @param {Object} opts shared options Object
     * @param {Object} dependencyInjection containing an implementation of component,
     * template, helpers, partials, and extender.
     *
     */
    constructor(opts) {

        super();

        this.opts = assign({
            css: 'g5-component'
        }, opts);

        this.container = this.opts.container;
        this.dataCache = {};

        this.instance = false;
        this.active = false;
        this.bound = false;

        this.component = dependencies.component(this);
        this.template = dependencies.template;
        this.helpers = dependencies.helpers;
        this.partials = dependencies.partials;
        this.extender = dependencies.extender;

    }

    /**
     *
     * @method init
     * @description initiates viewModel
     * @returns {Object} this
     *
     */
    init() {

        if (!this.container) {

            throw Error('G5Component needs to be instantiated with a container');

        } else if (!this.container.nodeType) {

            throw Error('Container must be a valid DOM Node');

        }

        if (!this.instance) {

            this.instance = true;
            this.active = true;

            this.addClass();
            this.addG5Attributes();
            this.registerHelpers();
            this.registerPartials();

        }

        return this;

    }

    /**
     *
     * @method addClass
     * @description adds classes based on options and component state
     * @returns {Object} this
     *
     */
    addClass() {

        const { css, i18n } = this.opts;

        this.container.className += ` ${css}`;
        this.container.className += ` g5-component--is-${i18n}` || 'en';

        if (this.active) {
            this.container.className += ' g5-component--is-visible';
        }

        return this;

    }

    /**
     *
     * @method addG5Attributes
     * @description adds base component attributes
     * @returns {Object} this
     *
     */
    addG5Attributes() {

        this.container.setAttribute('data-g5-component-instance', this.instance);
        this.container.setAttribute('data-g5-component-bound', this.bound);

        return this;

    }

    /**
     *
     * @method registerHelpers
     * @param {Object} helpers
     * @returns {Object} this
     * @description method for registering handlebar helpers
     *
     */
    registerHelpers(helpers = this.helpers) {

        const keys = Object.keys(helpers);

        for (let i = 0; i < keys.length; ++i) {

            const key = keys[i];
            const item = helpers[key];

            Handlebars.registerHelper(key, item);

        }

        return this;

    }

    /**
     *
     * @method registerPartials
     * @param {Object} partials
     * @returns {Object} this
     * @description method for registering handlebar partials
     *
     */
    registerPartials(partials = this.partials) {

        const keys = Object.keys(partials);

        for (let i = 0; i < keys.length; ++i) {

            const key = keys[i];
            const item = partials[key];

            Handlebars.registerPartial(key, item);

        }

        return this;

    }

    /**
     *
     * @method bindComponent
     * @param {Object} data
     * @returns {Object} this
     * @description attaches component specific functionality
     *
     */
    bindComponent(data={}) {

        data = this.extender(data, this.opts);

        if (!isEqual(data, this.dataCache)) {

            this.dataCache = data;
            this.container.innerHTML = this.template(data);

        }

        if (!this.bound) {

            this.bound = true;
            this.addG5Attributes();
            this.component.init(this.dataCache);

        }

        return this;

    }

    /**
     *
     * @method onDataError
     * @param {Number|Object} err
     * @description method triggered on error
     * @returns {Object} this
     *
     */
    onDataError(err) {

        const elementClasses = this.container.classList;
        const errorClass = 'g5-component--is-error';

        utils.log(`error: ${err}`);

        if (!elementClasses.contains(errorClass)) {
            this.container.classList.add(errorClass);
        }

        return this;

    }

    /**
     *
     * @method hasInstance
     * @description checks if container has an active instance
     * @returns {Boolean}
     *
     */
    hasInstance() {

        if (this.container) {

            return !!this.container.getAttribute('data-g5-component-instance');

        } else {

            return false;

        }

    }

    /**
     *
     * @method destroy
     * @returns {Object} this
     * @description kills viewModel instance
     *
     */
    destroy() {

        this.component.destroy();

        this.instance = false;
        this.active = false;
        this.bound = false;

        this.dataCache = {};

        this.component = null;
        this.template = null;
        this.helpers = null;
        this.partials = null;
        this.extender = null;

        this.container.outerHTML = '';
        this.container = null;

        return this;

    }

}

export default MasterViewModel;
