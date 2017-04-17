/**
 *
 * @module model/master
 * @author Greg Babula [greg.babula@mlb.com]
 *
 */

import { isEqual, assign } from './../utils/nodash';
import utils from './../utils/master';
import { EventEmitter } from 'events';

/**
 *
 * @class MasterModel
 * @extends EventEmitter
 * @desc The heart of any component containing the interactive data as
 * well as a large part of the logic surrounding it.
 *
 */
class MasterModel extends EventEmitter {

    /**
     *
     * @param {Object} opts shared options Object
     * @param {G5Component} parent reference to access the logger.
     *
     */
    constructor(opts, parent) {

        super();

        this.parent = parent;

        /**
         *
         * @type {Object}
         *
         */
        this.opts = assign({
            interval: 40000,
            enableFetch: true,
            enablePolling: true,
            path: ''
        }, opts);

        /**
         *
         * @type {Boolean}
         *
         */
        this.instance = false;

        /**
         *
         * @type {Object}
         * @desc data cache stored in memory
         * @note also used for comparison to determine if a fetch is needed
         *
         */
        this.dataCache = {};

        /**
         *
         * @type {Number} timeout ID or null
         *
         */
        this.dataFetch = null;

    }

    /**
     *
     * @method init
     * @desc initiates model and triggers initial data fetch.
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

        const { opts, parent } = this;
        const { path, enablePolling, interval } = opts;

        if (parent && parent.log instanceof Function) {
            parent.log(`Fetching data from path: ${path}`);
        }

        /**
         *
         * @type {Function} <object(string)>
         * @param {string} response
         * @desc example pass-through function
         * @returns {Object}
         *
         */
        const handleData = (response) => JSON.parse(response);

        /**
         *
         * @type {Function} <void(object)>
         * @param {Object} data parsed JSON
         * @emits {data}
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
         * @emits {data-error}
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
     *
     * @param {string} url data location.
     * @param {Function} handleError <*(Error)> an error handler, for when disaster strikes.
     * @param {...Function} handleSuccess any number of success handlers, piped in order.
     *
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
     * @desc begins data polling
     * @returns {Object} this
     *
     */
    start() {

        const { opts } = this;
        const { interval } = opts;

        this.dataFetch = setTimeout(this.fetch.bind(this), interval);

        return this;

    }

    /**
     *
     * @method stop
     * @desc stops data polling
     * @returns {Object} this
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
     * @desc stops data polling and destroys instance
     * @returns {Object} this
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
