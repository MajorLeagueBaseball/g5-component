/**
 *
 * @module utils/master
 * @author Greg Babula [greg.babula@mlb.com]
 *
 */

/**
 *
 * @function Log
 * @returns {Log|Function<void(...args)>} logging function that has a bound instance of utils.Log.
 *
 */
export function Log() {

    this.store = [];

    const fn = function (...args) {
        utils.log(this, ...args);
    }.bind(this);

    fn.store = this.store;
    Object.setPrototypeOf(fn, Log.prototype);

    return fn;

}

Log.prototype = Object.create(Function.prototype);

/**
 *
 * @desc write the entire store to console.
 *
 */
Log.prototype.toConsole = function () {
    for (let i = 0; i < this.store.length; ++i) {
        console.log(...this.store[i]);
    }
};


/**
 *
 * @name utils
 * @desc simple utility functions
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

        for (let i = 0; i < args.length; ++i) {
            if (args[i] instanceof Error) {
                return utils.trace(...args);
            }
        }

        utils.sink(args);

    },
    /**
     *
     * @method trace
     * @param {...*} args
     * @desc still simple log function with a timestamp and stack trace.
     *
     */
    trace(...args) {

        const trace = (new Error().stack || '').split('\n');

        trace.shift();
        trace[0] = '';

        args.push(trace.join('\n'));

        utils.sink(args);

    },
    /**
     *
     * @access private
     * @param {*[]} args
     * @desc directly log or store the input array.
     *
     */
    sink(args) {

        const timestamp = `${utils.timestamp()} - g5-component :`;

        if (args[0] instanceof Log) {

            const output = [timestamp].concat(args.slice(1));

            args[0].store.push(output);

        } else {

            console.log(timestamp, ...args);

        }

    },
    /**
     *
     * @method pad
     * @param {Number} n
     * @param {Number} digits
     * @returns {String} padded number
     *
     */
    pad(n, digits = 2) {

        let number = n.toString(10);

        while (number.length < digits) {
            number = '0' + number;
        }

        return number;

    },
    /**
     *
     * @method timestamp
     * @returns {String} timestamp (i.e. 26 Feb 16:19:34.123)
     *
     */
    timestamp() {

        const { pad, months } = utils;
        const d = new Date();

        const time = [
            pad(d.getHours()),
            pad(d.getMinutes()),
            pad(d.getSeconds())
        ].join(':') + '.' + pad(d.getMilliseconds(), 3);

        return [d.getDate(), months[d.getMonth()], time].join(' ');

    }

};

export default utils;
