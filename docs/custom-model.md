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

As of V3, Promise and fetch are no longer polyfilled globally, so if you need to use them you should
import them explicitly in your custom implementation.

Instead, you may call the `void xhr(String url, Function onError, ...Function onSuccess)` method, which takes a url,
 an error handler, and any number of piped success handler functions.


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
    * @desc makes a GET request to specified path, emits data event, expecting JSON by default
    * @returns {Object} this
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

}
```
