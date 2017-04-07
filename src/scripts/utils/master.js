/**
 *
 * @module utils/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @description simple utility functions
 *
 */

/**
 *
 * @name utils
 *
 */
const utils = {
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

        const timestamp = utils.timestamp;
        const args = Array.prototype.slice.call(arguments);

        args.unshift(`${timestamp()} - g5-component :`);

        console.log(...args);

    },
    /**
     *
     * @method pad
     * @param {Number} n
     * @returns {String} padded number
     *
     */
    pad(n) {

        return n < 10 ? `0${n.toString(10)}` : n.toString(10);

    },
    /**
     *
     * @method timestamp
     * @returns {String} timestamp (i.e. 26 Feb 16:19:34)
     *
     */
    timestamp() {

        const { pad, months } = utils;
        const d = new Date();

        const time = [
            pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())
        ].join(':');

        return [d.getDate(), months[d.getMonth()], time].join(' ');

    }
};

export default utils;
