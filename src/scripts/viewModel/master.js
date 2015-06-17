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

    this.component = opts && require('component');
    this.less = opts && require('component-less');
    this.template = opts && require('component-template');

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

    util.log('g5-component : refreshing data on viewModel');

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

exports.MasterViewModel = MasterViewModel;
