/**
 *
 * @module events/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @description event communication hub, mediates events between master, model, and viewModel
 *
 */

'use strict';

const size = require('lodash.size');
const each = require('lodash.foreach');
const every = require('lodash.every');
const utils = require('./../utils/master');
const EventEmitter = require('events').EventEmitter;

/**
 *
 * @function hasEventEmitter
 * @param {Object} obj
 * @returns {Boolean}
 * @description returns true if given obj has an instance of EventEmitter
 *
 */
function hasEventEmitter(obj) {

    return obj && obj instanceof EventEmitter;

}

/**
 *
 * @function detachEvents
 * @param {Object} target
 * @description checks if a given target has events, proceeds to remove if true
 *
 */
function detachEvents(target) {

    let hasEvents = target && hasEventEmitter(target) && size(target._events);

    if (hasEvents) {
        target.removeAllListeners();
    }

}

/**
 *
 * @constructor EventTower
 * @param {Object} master
 * @description mediates events between master, model and viewModel
 *
 */
function EventTower(master) {

    if (!(this instanceof EventTower)) {
        return new EventTower(master);
    }

    this.master = master;
    this.model = master && master.model || {};
    this.viewModel = master && master.viewModel || {};

    //
    // ensure all targets have an instance of
    // EventEmitter before proceeding to attach events
    //
    if (every([this.master, this.model, this.viewModel], hasEventEmitter)) {

        //
        // attach events to a single instnace
        //
        if (!this.master.hasInstance()) {
            this.attachEvents();
        }

    } else {

        if (this.master) {
            throw Error('EventEmitter is required on all main Constructors');
        }

    }

}

/**
 *
 * @method attachEvents
 * @description core attachEvents method, attaches core and extender events
 * @returns {Object} this
 *
 */
EventTower.prototype.attachEvents = function() {

    let { master, model, viewModel } = this;

    utils.log('attach events');

    try {

        require('eventGroup')(master, model, viewModel);
        require('eventGroupExtender')(master, model, viewModel);

    } catch (e) {

        require('./group/group')(master, model, viewModel);
        require('./group/extender')(master, model, viewModel);

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
EventTower.prototype.detachEvents = function() {

    let _eventGroup = [this.master, this.model, this.viewModel];

    utils.log('detach events');

    each(_eventGroup, (obj) => {
        detachEvents(obj);
    });

    return this;

};

module.exports = EventTower;
