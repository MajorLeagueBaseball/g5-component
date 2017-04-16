# Custom Model

_Providing a Model implementation in a custom g5Component._

See also [dependency injection](./dependency-injection.md) for how to emplace/inject your custom model.

#### model/master.js

Create `/src/scripts/model/master.js` and inherit the prototype from the scaffold's model (to maintain expected core methods and instance of `EventEmitter`). You can then easily add new methods or override existing ones.

```js
/**
 *
 * @module model/master
 * @description master model for the matchup component
 * inherits methods and properties from the g5-component model
 *
 */

import G5BaseModel from 'g5-component/src/scripts/model/master';

/**
 *
 * @module MasterModel
 * @extends G5BaseModel
 *
 */
export default class MasterModel extends G5BaseModel {

    /**
     *
     * @param {Object} opts shared options Object
     *
     */
    constructor(opts) {

        super(opts);

        this.opts = assign({
            interval: 40000,
            enableFetch: true,
            enablePolling: true,
            path: ''
        }, opts);

    }

}
```

If you need a further customized model, you'll probably want to override the `fetch`
method and handle that by yourself. For example, if you need multiple data points, mash that
data up here and simply emit a `data` event with the mashed up data set.


```js
export default class MasterModel extends G5BaseModel {

    /**
     *
     * @param {Object} opts shared options Object
     *
     */
    constructor(opts) {

        if (!(this instanceof MasterModel)) {
            return new MasterModel(opts);
        }

        g5Model.call(this);

        this.opts = assign({
            interval: 40000,
            enableFetch: true,
            enablePolling: true,
            path: ''
        }, opts);

    }

    /**
     *
     * @method fetch
     * @description makes a GET request to specified path, emits data event, expecting JSON by default
     * @returns {Object} this
     *
     */
    fetch() {

        let { opts } = this;
        let { path, enablePolling, interval } = opts;

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

}
```
