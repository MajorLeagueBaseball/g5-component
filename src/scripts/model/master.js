/**
 *
 * @module model/master
 * @description master model
 * @author Greg Babula
 *
 */

'use strict';

const _             = require('lodash');
const util          = require('util');
const utils         = require('./../utils/master');
const EventEmitter  = require('events').EventEmitter;

require('isomorphic-fetch');

/**
 *
 * @constructor MasterModel
 * @param {Object} opts
 *
 */
function MasterModel(opts) {

    if (!(this instanceof MasterModel)) {
        return new MasterModel(opts);
    }

    this.opts = _.extend({
        interval: 40000,
        enablePolling: true,
        path: ''
    }, opts);

    this.instance = false;
    this.dataCache = {};
    this.dataFetch = null;

    EventEmitter.call(this);

}

util.inherits(MasterModel, EventEmitter);

/**
 *
 * @method init
 * @description initiates master model, begins initial data fetch
 * @returns {Object} this
 *
 */
MasterModel.prototype.init = function() {

    if (!this.instance) {

        this.instance = true;
        this.fetch();

    }

    return this;

};

/**
 *
 * @method fetch
 * @description makes a GET request to specified path, emits data event, expecting JSON by default
 * @returns {Object} this
 *
 */
MasterModel.prototype.fetch = function() {

    let _this = this;
    let _opts = this.opts;

    utils.log('fetch master model data');

    /**
     *
     * @function handleData
     * @param {Object} response
     * @returns {Object} response JSON
     * @description handles response and returns JSON if successful
     *
     */
    function handleData(response) {

        if (response.status >= 400) {
            _this.emit('data-error', response.status);
        }

        return response.json();

    }

    /**
     *
     * @function handleSuccess
     * @param {Object} data parsed JSON
     *
     */
    function handleSuccess(data) {

        if (!_.isEqual(data, _this.dataCache)) {

            _this.emit('data', data);
            _this.dataCache = data;

        }

        _this.dataFetch = _opts.enablePolling && setTimeout(_this.fetch.bind(_this), _opts.interval);

    }

    fetch(_opts.path).then(handleData).then(handleSuccess);

    return this;

};

/**
 *
 * @method start
 * @returns {Object} this
 * @description initiates data polling
 *
 */
MasterModel.prototype.start = function() {

    this.dataFetch = !this.dataFetch && setTimeout(this.fetch, this.opts.interval);

    return this;

};

/**
 *
 * @method stop
 * @returns {Object} this
 * @description halts data polling
 *
 */
MasterModel.prototype.stop = function() {

    if (this.dataFetch) {
        clearTimeout(this.dataFetch);
    }

    return this;

};

/**
 *
 * @method destroy
 * @returns {Object} this
 * @description kills instance
 *
 */
MasterModel.prototype.destroy = function() {

    this.stop();

    this.instance = false;
    this.dataCache = {};
    this.dataFetch = null;

    return this;

};

exports.MasterModel = MasterModel;
