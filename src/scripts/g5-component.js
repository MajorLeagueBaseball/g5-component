/**
 *
 * @module g5-component
 * @author Greg Babula
 * @description MVVM + Event Layer - Component base with handlebars
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
 *
 */
G5Component.prototype.init = function() {

    util.log('g5-component : init');

    this.model.init();
    this.viewModel.init();

    this.emit('ready', this);

};

exports.construct = G5Component;
