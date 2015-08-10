/**
 *
 * @module model/master
 * @description master model
 * @author Greg Babula
 *
 */

'use strict';

const assign        = require('lodash/object/assign');
const isEqual       = require('lodash/lang/isEqual');
const util          = require('util');
const utils         = require('./../utils/master');
const EventEmitter  = require('events').EventEmitter;

require('isomorphic-fetch');

/**
 *
 * @constructor MasterModel
 * @param {Object} opts shared options Object
 *
 */
function MasterModel(opts) {

    if (!(this instanceof MasterModel)) {
        return new MasterModel(opts);
    }

    this.opts = assign({
        interval: 40000,
        enablePolling: true,
        path: ''
    }, opts);

    this.instance = false;
    this.dataCache = {};
    this.dataFetch = null;

    try {

        this.extender = require('component-extender');

    } catch (e) {

        this.extender = require('./../component/extender');

    }

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

        try {

            return response.json();

        } catch (e) {

            return false;

        }

    }

    /**
     *
     * @function handleSuccess
     * @param {Object} data parsed JSON
     *
     */
    function handleSuccess(data={}) {

        data = _this.extender(data);

        if (!isEqual(data, _this.dataCache)) {

            _this.dataCache = data;
            _this.emit('data', data);

        }

        _this.dataFetch = _opts.enablePolling && setTimeout(_this.fetch.bind(_this), _opts.interval);

    }

    /**
     *
     * @function handleError
     * @param {Object} err
     *
     */
    function handleError(err) {

        _this.emit('data-error', err);

    }

    fetch(_opts.path)
        .then(handleData)
        .then(handleSuccess)
        .catch(handleError);

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
 * @description stops polling and kills instance
 *
 */
MasterModel.prototype.destroy = function() {

    this.stop();

    this.instance = false;
    this.dataCache = {};
    this.dataFetch = null;

    return this;

};

module.exports = MasterModel;
