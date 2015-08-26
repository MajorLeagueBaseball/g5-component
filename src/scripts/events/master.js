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
    if (hasEventEmitter(this.master) && hasEventEmitter(this.model) && hasEventEmitter(this.viewModel)) {

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

    let _master = this.master;
    let _model = this.model;
    let _viewModel = this.viewModel;

    utils.log('attach events');

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    _model.on('data', function(data) {

        _master.emit('data', data);
        _viewModel.emit('data', data);

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    _model.on('data-error', function(err) {

        utils.log('error fetching model data :', err);

        _master.emit('data-error', err);
        _viewModel.emit('data-error', err);

    });

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    _viewModel.on('data', function(data) {

        _viewModel.refresh(data).bindComponent();

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    _viewModel.on('data-error', function(err) {

        _viewModel.showError(err);

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

    let _master = this.master;
    let _model = this.model;
    let _viewModel = this.viewModel;
    let _eventGroup = [_master, _model, _viewModel];

    utils.log('detach events');

    each(_eventGroup, function(obj) {
        detachEvents(obj);
    });

    return this;

};

module.exports = EventTower;
