/**
 *
 * @module viewModel/master
 * @author Greg Babula
 * @description master viewModel, view layer related functionality
 *
 */

'use strict';

const util         = require('util');
const assign       = require('lodash/object/assign');
const size         = require('lodash/collection/size');
const forOwn       = require('lodash/object/forOwn');
const utils        = require('./../utils/master');
const EventEmitter = require('events').EventEmitter;
const Handlebars   = require('hbsfy/runtime');

/**
 *
 * @constructor MasterViewModel
 * @param {Object} opts shared options Object
 *
 */
function MasterViewModel(opts) {

    if (!(this instanceof MasterViewModel)) {
        return new MasterViewModel(opts);
    }

    this.opts = assign({
        css: 'g5-component'
    }, opts);

    this.container = this.opts.container;

    this.instance = false;
    this.active = false;
    this.bound = false;

    try {

        this.component = require('component');
        this.template = require('component-template');
        this.helpers = require('component-helpers');
        this.partials = require('component-partials');

    } catch (e) {

        this.component = {};
        this.template = {};
        this.helpers = {};
        this.partials = {};

    }

    EventEmitter.call(this);

}

util.inherits(MasterViewModel, EventEmitter);

/**
 *
 * @method init
 * @description initiates viewModel
 * @returns {Object} this
 *
 */
MasterViewModel.prototype.init = function() {

    if (!this.container) {

        throw Error('G5Component needs to be instantiated with a container');

    } else if (!this.container.nodeType) {

        throw Error('Container must be a valid DOM Node');

    }

    if (!this.instance) {

        this.instance = true;
        this.active = true;

        this.addClass().addG5Attributes();
        this.registerHelpers().registerPartials();

    }

    return this;

};

/**
 *
 * @method addClass
 * @description adds classes based on options and component state
 * @returns {Object} this
 *
 */
MasterViewModel.prototype.addClass = function() {

    this.container.className += ' ' + this.opts.css;

    if (this.active) {
        this.container.className += ' g5-component--is-visible';
    }

    return this;

};

/**
 *
 * @method addG5Attributes
 * @description adds base component attributes
 * @returns {Object} this
 *
 */
MasterViewModel.prototype.addG5Attributes = function() {

    this.container.setAttribute('data-g5-component-instance', this.instance);
    this.container.setAttribute('data-g5-component-bound', this.bound);

    return this;

};

/**
 *
 * @method registerHelpers
 * @param {Object} helpers
 * @returns {Object} this
 * @description method for registering handlebar helpers
 *
 */
MasterViewModel.prototype.registerHelpers = function(helpers = this.helpers) {

    if (size(helpers)) {

        forOwn(helpers, function(item, key) {

            Handlebars.registerHelper(key, item);

        });

    }

    return this;

};

/**
 *
 * @method registerPartials
 * @param {Object} partials
 * @returns {Object} this
 * @description method for registering handlebar partials
 *
 */
MasterViewModel.prototype.registerPartials = function(partials = this.partials) {

    if (size(partials)) {

        forOwn(partials, function(item, key) {

            Handlebars.registerPartial(key, item);

        });

    }

    return this;

};

/**
 *
 * @method reresh
 * @param {Object} data
 * @returns {Object} this
 * @description refreshes data on viewModel
 *
 */
MasterViewModel.prototype.refresh = function(data={}) {

    utils.log('refreshing data on viewModel');

    this.container.innerHTML = this.template(data);

    return this;

};

/**
 *
 * @method bindComponent
 * @returns {Object} this
 * @description attaches component specific functionality
 *
 */
MasterViewModel.prototype.bindComponent = function() {

    if (!this.bound) {

        this.bound = true;
        this.addG5Attributes();
        this.component.init(this.container);

    }

    return this;

};

/**
 *
 * @method onDataError
 * @param {Number|Object} err
 * @description method triggered on error
 * @returns {Object} this
 *
 */
MasterViewModel.prototype.onDataError = function(err) {

    utils.log('error: ' + err);

    this.container.className += ' g5-component--is-error';

    return this;

};

/**
 *
 * @method hasInstance
 * @description checks if container has an active instance
 * @returns {Boolean}
 *
 */
MasterViewModel.prototype.hasInstance = function() {

    if (this.container) {

        return !!this.container.getAttribute('data-g5-component-instance');

    } else {

        return false;

    }

};

/**
 *
 * @method destroy
 * @returns {Object} this
 * @description kills viewModel instance
 *
 */
MasterViewModel.prototype.destroy = function() {

    this.component.destroy();

    this.instance = false;
    this.active = false;
    this.bound = false;

    this.component = null;
    this.template = null;
    this.helpers = null;

    this.container.outerHTML = '';
    this.container = null;

    return this;

};

module.exports = MasterViewModel;
