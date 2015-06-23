/**
 *
 * @module viewModel/master
 * @description master viewModel
 * @author Greg Babula
 *
 */

'use strict';

const _            = require('lodash');
const util         = require('util');
const utils        = require('./../utils/master');
const EventEmitter = require('events').EventEmitter;

/**
 *
 * @constructor MasterViewModel
 * @param {Object} opts
 *
 */
function MasterViewModel(opts) {

    if (!(this instanceof MasterViewModel)) {
        return new MasterViewModel(opts);
    }

    this.opts = _.extend({
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

        return;

    }

    EventEmitter.call(this);

}

util.inherits(MasterViewModel, EventEmitter);

/**
 *
 * @method init
 * @returns {Object} this
 *
 */
MasterViewModel.prototype.init = function() {

    if (!this.container) {
        throw Error('G5Component needs to be instantiated with a container');
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

exports.MasterViewModel = MasterViewModel;
