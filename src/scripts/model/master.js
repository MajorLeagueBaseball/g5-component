/**
 *
 * @module model/master
 * @author Greg Babula [greg.babula@mlb.com]
 *
 */

import { isEqual, assign } from './../utils/nodash';
import { EventEmitter } from 'events';
import utils from './../utils/master';

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
     * @param {object} opts shared options Object
     *
     */
    constructor(opts) {

        super();

        /**
         *
         * @type {object}
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
         * @type {object}
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

        /**
         *
         * @type {Function<*(...args)>} a logging function.
         * @see G5Component()
         *
         */
        this.log = this.opts.log || utils.log;

    }

    /**
     *
     * @method init
     * @desc initiates model and triggers initial data fetch.
     * @returns {object} this
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
     * @returns {object} this
     *
     */
    fetch() {

        const { opts, parent } = this;
        const { path, enablePolling, interval } = opts;

        this.log(`Fetching data from path: ${path}`);

        /**
         *
         * @type {Function} <object(string)>
         * @param {string} response
         * @desc example pass-through function
         * @returns {object}
         *
         */
        const handleData = (response) => JSON.parse(response);

        /**
         *
         * @type {Function} <void(object)>
         * @param {object} data parsed JSON
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
         * @param {Number|object} err
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
     * @returns {object} this
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
     * @returns {object} this
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
     * @returns {object} this
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
