/**
 *
 * @module utils/master
 * @description utility functions
 *
 */

'use strict';

let months = [
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
];

/**
 *
 * @function pad
 * @param {Number} n
 * @returns {String} padded number
 *
 */
function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

/**
 *
 * @function timestamp
 * @returns {String} timestamp (i.e. 26 Feb 16:19:34)
 *
 */
function timestamp() {

    let d = new Date();
    let time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
    ].join(':');

    return [d.getDate(), months[d.getMonth()], time].join(' ');

}

/**
 *
 * @name utils
 *
 */
let utils = {
    /**
     *
     * @method log
     * @description simple log function with a timestamp
     *
     */
    log() {

        let args = Array.prototype.slice.call(arguments);

        args.unshift(timestamp() + ' - g5-component :');

        console.log.apply(console, args);

    }
};

module.exports = utils;
