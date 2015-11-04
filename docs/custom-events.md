#Custom Events

Using a custom eventTower on the component level.

#### package.json

In package.json on the component level, set browser.eventTower to false, add a reference to the scaffold's eventTower, and add your custom eventTower reference to aliasify.

```json
"browser": {
  "eventTower": false,
  "g5-component/eventTower": "./node_modules/g5-component/src/scripts/events/master.js"
},
"aliasify": {
  "aliases": {
    "eventTower": "./src/scripts/events/master.js"
  }
}
```

What's going on here? You're telling Browserify that you don't want to load the scaffolds eventTower by setting it to false. You then add the eventTower property to aliasify with the path to your custom eventTower. The browser reference to g5-component/eventTower is set so that we can easily reference it in our custom eventTower.

#### events/master.js

Create /src/scripts/events/master.js and inherit the prototype from the scaffold's eventTower (to maintain expected core methods and instance of EventEmitter). You can then easily add new methods or override existing ones.

```js
/**
 *
 * @module events/master
 * @description event communication hub, mediates events between master, model, and viewModel
 * inherits methods and properties from the g5-component eventTower
 *
 */

'use strict';

const util         = require('util');
const g5EventTower = require('g5-component/eventTower');

/**
 *
 * @constructor EventTower
 * @param {Object} master
 * @description mediates events between master, model and viewModel
 *
 */
function EventTower(master) {

    if (!(this instanceof EventTower)) {
        return new EventTower(master);
    }

    g5EventTower.call(this);

}

util.inherits(EventTower, g5EventTower);

/**
 *
 * @method attachEvents
 * @description core attachEvents method, single location for all events
 * @returns {Object} this
 *
 */
EventTower.prototype.attachEvents = function() {

    let { master, model, viewModel } = this;

    /**
     *
     * @event synthetic-data
     * @param {Object} data
     *
     */
    master.on('synthetic-data', (data) => {

        master.emit('data', data);
        viewModel.emit('data', data);

    });

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    model.on('data', (data) => {

        master.emit('data', data);
        viewModel.emit('data', data);

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    model.on('data-error', (err) => {

        utils.log('error fetching model data :', err);

        master.emit('data-error', err);
        viewModel.emit('data-error', err);

    });

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    viewModel.on('data', (data) => {

        viewModel.bindComponent(data);

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    viewModel.on('data-error', (err) => {

        viewModel.onDataError(err);

    });

    return this;

};

module.exports = EventTower;
```
