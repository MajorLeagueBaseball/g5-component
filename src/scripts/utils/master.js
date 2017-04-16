/**
 *
 * @module utils/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc simple utility functions
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
     * @param {...*} args
     * @desc simple log function with a timestamp.
     *
     */
    log(...args) {

        const timestamp = utils.timestamp;
        args.unshift(`${timestamp()} - g5-component :`);

        for (let i = 0; i < args.length; ++i) {
            if (args[i] instanceof Error) {
                return this.trace(...args);
            }
        }

        console.log(...args);

    },

    /**
     *
     * @method trace
     * @param {...*} args
     * @desc still simple log function with a timestamp and stack trace.
     *
     */
    trace(...args) {

        const timestamp = utils.timestamp;

        args.unshift(`${timestamp()} - g5-component :`);

        let trace = (new Error().stack || '').split('\n');
        trace.shift();

        trace[0] = '';
        trace = trace.join('\n');

        args.push(trace);

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
