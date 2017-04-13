/**
 *
 * @module model/master
 * @desc an example implementation extending the base G5 model.
 *
 */

import G5Model from './../../../../src/scripts/model/master';
import util from './../../../../src/scripts/utils/master';

export default class extends G5Model {

    /**
     *
     * @param {Object} opts shared options Object
     *
     */
    constructor(opts) {

        opts.enableFetch = true;
        opts.enablePolling = true;
        opts.interval = 60000;

        util.log('Using custom model with hard-coded interval.');

        super(opts);

    }


}
