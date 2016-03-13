/**
 *
 * @module g5-component
 * @author Greg Babula [greg.babula@mlb.com]
 * @description Browserify Component Scaffold
 *
 */

'use strict';

const util = require('util');
const assign = require('lodash/object/assign');
const utils = require('./utils/master');
const EventEmitter = require('events').EventEmitter;

/**
 *
 * @constructor G5Component
 * @param {Object} opts shared options Object
 *
 */
function G5Component(opts) {

    if (!(this instanceof G5Component)) {
        return new G5Component(opts);
    }

    this.opts = assign({
        css: 'g5-component',
        container: undefined,
        i18n: 'en',
        interval: 40000,
        enableFetch: true,
        enablePolling: true,
        path: ''
    }, opts);

    try {

        this.model = require('model')(this.opts);
        this.viewModel = require('viewModel')(this.opts);
        this.eventTower = require('eventTower')(this);

    } catch (e) {

        this.model = require('./model/master')(this.opts);
        this.viewModel = require('./viewModel/master')(this.opts);
        this.eventTower = require('./events/master')(this);

    }

    EventEmitter.call(this);

}

util.inherits(G5Component, EventEmitter);

/**
 *
 * @method init
 * @description initiates model and viewModel
 * @returns {Object} this
 *
 */
G5Component.prototype.init = function() {

    utils.log('init');

    if (!this.hasInstance()) {

        this.viewModel.init();
        this.model.init();

        this.emit('ready', this);

    }

    return this;

};

/**
 *
 * @method detachEvents
 * @description detaches all events
 * @returns {Object} this
 *
 */
G5Component.prototype.detachEvents = function() {

    this.eventTower.detachEvents();

    return this;

};

/**
 *
 * @method attachEvents
 * @description attaches all events
 * @returns {Object} this
 *
 */
G5Component.prototype.attachEvents = function() {

    this.eventTower.attachEvents();

    return this;

};

/**
 *
 * @method hasInstance
 * @description checks if active instance exists on container
 * @returns {Boolean}
 *
 */
G5Component.prototype.hasInstance = function() {

    return this.viewModel.hasInstance();

};

/**
 *
 * @method destroy
 * @description kills component instance
 * @returns {Object} this
 *
 */
G5Component.prototype.destroy = function() {

    this.emit('destroy', this);

    this.detachEvents();
    this.model.destroy();
    this.viewModel.destroy();

    return this;

};

module.exports = G5Component;
