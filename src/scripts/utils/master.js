/**
 *
 * @module utils/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @description simple utility functions
 *
 */

'use strict';

/**
 *
 * @name utils
 *
 */
let utils = {
    months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    /**
     *
     * @method log
     * @description simple log function with a timestamp
     *
     */
    log() {

        let timestamp = utils.timestamp;
        let args = Array.prototype.slice.call(arguments);

        args.unshift(timestamp() + ' - g5-component :');

        console.log.apply(console, args);

    },
    /**
     *
     * @method pad
     * @param {Number} n
     * @returns {String} padded number
     *
     */
    pad(n) {

        return n < 10 ? '0' + n.toString(10) : n.toString(10);

    },
    /**
     *
     * @method timestamp
     * @returns {String} timestamp (i.e. 26 Feb 16:19:34)
     *
     */
    timestamp() {

        let { pad, months } = utils;
        let d = new Date();

        let time = [
            pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())
        ].join(':');

        return [d.getDate(), months[d.getMonth()], time].join(' ');

    }
};

module.exports = utils;
