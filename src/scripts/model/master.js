/**
 *
 * @module model/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc master model
 *
 */

import { isEqual, assign } from './../dependencies/nodash';
import utils from './../utils/master';
import { EventEmitter } from 'events';

/**
 *
 * @class MasterModel
 * @extends EventEmitter
 *
 */
class MasterModel extends EventEmitter {

    /**
     *
     * @param {Object} opts shared options Object
     *
     */
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
     * @desc initiates master model, begins initial data fetch
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
     * @desc makes a GET request to specified path, emits data event, expecting JSON by default
     * @returns {Object} this
     *
     */
    fetch() {

        const { opts } = this;
        const { path, enablePolling, interval } = opts;

        utils.log('fetch master model data');

        /**
         *
         * @type {Function} <object(string)>
         * @param {string} response
         * @returns {Object}
         * @desc example pass-through function
         *
         */
        const handleData = (response) => JSON.parse(response);

        /**
         *
         * @type {Function} <void(object)>
         * @param {Object} data parsed JSON
         *
         */
        const handleSuccess = (data={}) => {

            if (!isEqual(data, this.dataCache)) {

                this.dataCache = data;
                this.emit('data', data);

            }

        };

        /**
         *
         * @type {Function} <void(Error)>
         * @param {Number|Object} err
         *
         */
        const handleError = (err) => {

            this.emit('data-error', err);

        };

        this.xhr(path, handleError, handleData, handleSuccess);

        this.dataFetch = enablePolling && setTimeout(this.fetch.bind(this), interval);

        return this;

    }

    /**
     * @param {string} url data location.
     * @param {Function} handleError <*(Error)> an error handler, for when disaster strikes.
     * @param {...Function} handleSuccess any number of success handlers, piped in order.
     */
    xhr(url, handleError, ...handleSuccess) {

        const request = new XMLHttpRequest();

        request.onreadystatechange = () => {

            if (request.readyState === XMLHttpRequest.DONE) {

                try {

                    [request.responseText, ...handleSuccess].reduce((a, b) => b(a));

                } catch (error) {

                    handleError(error);

                }

            }

        };

        request.open('GET', url, true);
        request.send();

    }

    /**
     *
     * @method start
     * @returns {Object} this
     * @desc initiates data polling
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
     * @desc halts data polling
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
     * @desc stops polling and kills instance
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
