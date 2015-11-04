/**
 *
 * @module model/master
 * @author Greg Babula
 * @description master model, data layer
 *
 */

'use strict';

const assign        = require('lodash/object/assign');
const isEqual       = require('lodash/lang/isEqual');
const util          = require('util');
const utils         = require('./../utils/master');
const EventEmitter  = require('events').EventEmitter;

require('es6-promise').polyfill();
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
        enableFetch: true,
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

    let { instance } = this;
    let { enableFetch } = this.opts;

    if (enableFetch && !instance) {

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

    let { opts } = this;
    let { path, enablePolling, interval } = opts;

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
            throw response.status;
        }

        try {

            return response.json();

        } catch (e) {

            throw e;

        }

    }

    /**
     *
     * @function handleSuccess
     * @param {Object} data parsed JSON
     *
     */
    function handleSuccess(data={}) {

        if (!isEqual(data, this.dataCache)) {

            this.dataCache = data;
            this.emit('data', data);

        }

        this.dataFetch = enablePolling && setTimeout(this.fetch.bind(this), interval);

    }

    /**
     *
     * @function handleError
     * @param {Number|Object} err
     *
     */
    function handleError(err) {

        this.emit('data-error', err);

    }

    fetch(path)
        .then(handleData.bind(this))
        .then(handleSuccess.bind(this))
        .catch(handleError.bind(this));

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

    let { interval } = this.opts;

    this.dataFetch = !this.dataFetch && setTimeout(this.fetch, interval);

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
