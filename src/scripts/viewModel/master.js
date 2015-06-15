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
 * @param {String} opts.css classes added to main container
 * @param {Element} opts.container
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

    // if no opts passed, assuming this is being called by a test
    this.template = (opts && require('./../../template/component.html')) || '';

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
        this.addG5Attributes();

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

    let container = this.container;

    container.className = container.className + ' ' + this.opts.css;
    container.setAttribute('data-g5-component-instance', this.instance);
    container.setAttribute('data-g5-component-visible', this.active);

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

exports.MasterViewModel = MasterViewModel;
