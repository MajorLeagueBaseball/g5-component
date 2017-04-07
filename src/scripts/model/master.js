/**
 *
 * @module model/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @description master model
 *
 */

import assign from 'lodash.assign';
import isEqual from 'lodash.isequal';
import utils from './../utils/master';
import { EventEmitter } from 'events';

import es6Promise from 'es6-promise';
es6Promise.polyfill();

import 'isomorphic-fetch';

/**
 *
 * @constructor MasterModel
 * @param {Object} opts shared options Object
 *
 */
class MasterModel extends EventEmitter {

    constructor(opts) {

        super();

        this.opts = assign({
            interval: 40000,
            enableFetch: true,
            enablePolling: true,
            path: ''
        }, opts);

        this.instance = false;
        this.dataCache = {};
        this.dataFetch = null;

    }

    /**
     *
     * @method init
     * @description initiates master model, begins initial data fetch
     * @returns {Object} this
     *
     */
    init() {

        const { instance } = this;
        const { enableFetch } = this.opts;

        if (enableFetch && !instance) {

            this.instance = true;
            this.fetch();

        }

        return this;

    }

    /**
     *
     * @method fetch
     * @description makes a GET request to specified path, emits data event, expecting JSON by default
     * @returns {Object} this
     *
     */
    fetch() {

        const { opts } = this;
        const { path, enablePolling, interval } = opts;

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

        this.dataFetch = enablePolling && setTimeout(this.fetch.bind(this), interval);

        return this;

    }

    /**
     *
     * @method start
     * @returns {Object} this
     * @description initiates data polling
     *
     */
    start() {

        const { interval } = this.opts;

        this.dataFetch = setTimeout(this.fetch.bind(this), interval);

        return this;

    }

    /**
     *
     * @method stop
     * @returns {Object} this
     * @description halts data polling
     *
     */
    stop() {

        if (this.dataFetch) {
            clearTimeout(this.dataFetch);
        }

        return this;

    }

    /**
     *
     * @method destroy
     * @returns {Object} this
     * @description stops polling and kills instance
     *
     */
    destroy() {

        this.stop();

        this.instance = false;
        this.dataCache = {};
        this.dataFetch = null;

        return this;

    }
}

export default MasterModel;
