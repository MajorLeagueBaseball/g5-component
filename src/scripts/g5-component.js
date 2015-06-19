/**
 *
 * @module g5-component
 * @author Greg Babula
 * @description MVVM + Event Layer - Browserify Component Scaffold
 *
 */

'use strict';

const _               = require('lodash');
const util            = require('util');
const MasterModel     = require('./model/master').MasterModel;
const MasterViewModel = require('./viewModel/master').MasterViewModel;
const EventEmitter    = require('events').EventEmitter;
const EventTower      = require('./events/master').EventTower;

/**
 *
 * @constructor G5Component
 * @param {Object} opts
 *
 */
function G5Component(opts) {

    if (!(this instanceof G5Component)) {
        return new G5Component(opts);
    }

    this.opts = _.extend({
        container: undefined,
        i18n: 'en'
    }, opts);

    this.model = MasterModel(this.opts);
    this.viewModel = MasterViewModel(this.opts);
    this.eventTower = EventTower(this);

    EventEmitter.call(this);

}

util.inherits(G5Component, EventEmitter);

/**
 *
 * @method init
 * @returns {Object} this
 *
 */
G5Component.prototype.init = function() {

    util.log('g5-component : init');

    this.model.init();
    this.viewModel.init();

    this.emit('ready', this);

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

exports.construct = G5Component;
