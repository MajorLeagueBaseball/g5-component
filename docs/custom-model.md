#Custom Model

Using a custom model on the component level.

#### package.json

In package.json on the component level, set `browser.model` to false, add a reference to the scaffold's model, and add your custom model reference to aliasify.

```json
"browser": {
  "model": false,
  "g5-component/model": "./node_modules/g5-component/src/scripts/model/master.js"
},
"aliasify": {
  "aliases": {
    "model": "./src/scripts/model/master.js"
  }
}
```

What's going on here? You're telling Browserify that you don't want to load the scaffolds model by setting it to false. You then add the model property to aliasify with the path to your custom model. The browser reference to g5-component/model is set so that we can easily reference it in our custom model.

#### model/master.js

Create /src/scripts/model/master.js and inherit the prototype from the scaffold's model (to maintain expected core methods and instance of EventEmitter). You can then easily add new methods or override existing ones.

```js
/**
 *
 * @module model/master
 * @description master model for the matchup component
 * inherits methods and properties from the g5-component model
 *
 */

'use strict';

const util    = require('util');
const assign  = require('lodash/object/assign');
const g5Model = require('g5-component/model');

/**
 *
 * @constructor MasterModel
 * @param {Object} opts shared options Object
 *
 */
function MasterModel(opts) {

    if (!(this instanceof MasterModel)) {
        return new MasterModel(opts);
    }

    g5Model.call(this);

    this.opts = assign({
        interval: 40000,
        enablePolling: true,
        path: ''
    }, opts);

}

util.inherits(MasterModel, g5Model);

module.exports = MasterModel;
```

If you need a custom model, you'll probably want to override the `fetch` method and handle that by yourself. For example, if you need multiple data points, mash that data up here and simply emit a `data` event with the mashed up data set.


```js
/**
 *
 * @module model/master
 * @description master model for the matchup component
 * inherits methods and properties from the g5-component model
 *
 */

'use strict';

const util    = require('util');
const assign  = require('lodash/object/assign');
const isEqual = require('lodash/lang/isEqual');
const g5Model = require('g5-component/model');

/**
 *
 * @constructor MasterModel
 * @param {Object} opts shared options Object
 *
 */
function MasterModel(opts) {

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

util.inherits(MasterModel, g5Model);

/**
 *
 * @method fetch
 * @description makes a GET request to specified path, emits data event, expecting JSON by default
 * @returns {Object} this
 *
 */
MasterModel.prototype.fetch = function() {

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

        this.dataFetch = enablePolling && setTimeout(this.fetch.bind(this), interval);

    };

    /**
     *
     * @function handleError
     * @param {Number|Object} err
     *
     */
    function handleError(err) {

        this.emit('data-error', err);

    };

    fetch(path)
        .then(handleData.bind(this))
        .then(handleSuccess.bind(this))
        .catch(handleError.bind(this));

    return this;

};

module.exports = MasterModel;
```
