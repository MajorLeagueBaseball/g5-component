/**
 *
 * @module viewModel/master
 * @description master viewModel, view layer related functionality
 * @author Greg Babula
 *
 */

'use strict';

const assign       = require('lodash/object/assign');
const util         = require('util');
const utils        = require('./../utils/master');
const EventEmitter = require('events').EventEmitter;

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
        this.less = require('component-less');
        this.template = require('component-template');

    } catch (e) {

        this.component = {};
        this.less = {};
        this.template = {};

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

    }

    return this;

};

/**
 *
 * @method addClass
 * @description adds classes based on options
 * @returns {Object} this
 *
 */
MasterViewModel.prototype.addClass = function() {

    let container = this.container;

    container.className = container.className + ' ' + this.opts.css;

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

    let container = this.container;

    container.setAttribute('data-g5-component-instance', this.instance);
    container.setAttribute('data-g5-component-visible', this.active);
    container.setAttribute('data-g5-component-bound', this.bound);

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
        this.component.init(this.container);
        this.addG5Attributes();

    }

    return this;

};

/**
 *
 * @method showError
 * @param {Object} err
 * @description shows data error
 * @returns {Object} this
 *
 */
MasterViewModel.prototype.showError = function(err) {

    this.container.innerHTML = `<div class="alert alert-danger" role="alert">Error - ${err}</div>`;

    return this;

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
    this.less = null;
    this.template = null;

    this.container.outerHTML = '';
    this.container = null;

    return this;

};

module.exports = MasterViewModel;
