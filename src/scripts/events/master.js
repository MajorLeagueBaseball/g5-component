/**
 *
 * @module events/master
 * @author Greg Babula
 * @description event communication hub, mediates events between master, model, and viewModel
 *
 */

'use strict';

const size          = require('lodash/collection/size');
const each          = require('lodash/collection/each');
const every         = require('lodash/collection/every');
const utils         = require('./../utils/master');
const EventEmitter  = require('events').EventEmitter;

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
 * @description core attachEvents method, single location for all events
 * @returns {Object} this
 *
 */
EventTower.prototype.attachEvents = function() {

    let { master, model, viewModel } = this;

    utils.log('attach events');

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    model.on('data', (data) => {

        master.emit('data', data);
        viewModel.emit('data', data);

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    model.on('data-error', (err) => {

        utils.log('error fetching model data :', err);

        master.emit('data-error', err);
        viewModel.emit('data-error', err);

    });

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    viewModel.on('data', (data) => {

        viewModel.refresh(data).bindComponent();

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    viewModel.on('data-error', (err) => {

        viewModel.onDataError(err);

    });

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

    each(_eventGroup, function(obj) {
        detachEvents(obj);
    });

    return this;

};

module.exports = EventTower;
