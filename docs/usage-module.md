#Usage // Module

__Instructions for usage as a module, the easiest thing to do is to clone the [info component example](https://github.com/gbabula/babu.la) and use it as a baseline for your new component__

Simplifies component development, the model, viewModel, and event layer is abstracted for you via the g5-component module. This setup allows you to worry about the component level alone, while providing a flexible and consistent structure for development.

To see how simple it really is, look at the info component implementation in [angular](https://github.com/gbabula/gregbabula.info) vs [g5-component](https://github.com/gbabula/babu.la)

#### Expected Directory Structure

> Set up exactly as the g5-component module, except all you need are component specific files

```
├── .editorconfig
├── .gitignore
├── .jscsrc
├── .jshintrc
├── src/
│   ├── data/
│   │   │   data.json
│   ├── static/
│   │   │   README.md
│   ├── scripts/
│   │   ├── component/
│   │   │   │   extender.js
│   │   │   │   master.js
│   │   ├── index.js
│   ├── styles/
│   │   │   base.less
│   │   │   component.less
│   ├── template/
│   │   │   component.html
├── test/
│   │   component.js
├── package.json
├── index.html
```

#### File Overview

* __[src/data/](https://github.com/gbabula/babu.la/tree/master/src/data)__ - data directory, required only if you plan on using a local data source
* __[src/static/](https://github.com/gbabula/babu.la/tree/master/src/static)__ - directory for builds
* __[src/scripts/component/extender.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/extender.js)__ - module for extending/transforming data (post fetch via model), most likely use case is adding a property that does not exist in data, or adding a new property that is a combination of properties that you get back from the data
* __[src/scripts/component/master.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/master.js)__ - module containing all component specific functionality (listeners, etc...)
* __[src/scripts/index.js](https://github.com/gbabula/babu.la/blob/master/src/scripts/index.js)__ - component entry point, require g5-component and init your module in this file, then point browserify to this file to create the bundle
* __[src/styles/base.less](https://github.com/gbabula/babu.la/blob/master/src/styles/base.less)__ - component specific styling
* __[src/styles/component.less](https://github.com/gbabula/babu.la/blob/master/src/styles/component.less)__ - LESS entry point, all file references (bootstrap assets, etc...)
* __[src/template/component.html](https://github.com/gbabula/babu.la/blob/master/src/template/component.html)__ - primary template for component
* __[test/component.js](https://github.com/gbabula/babu.la/blob/master/test/component.js)__ - primary test for component
* __[package.json](https://github.com/gbabula/babu.la/blob/master/package.json)__ - all dependencies, npm scripts for browserify builds, and alias references
* __[index.html](https://github.com/gbabula/babu.la/blob/master/index.html)__ - contains reference to your container element and the bundle js, if you plan on consuming your component in a different way, disregard this file completely or use it for testing

#### Component File Reference

Aliasify is used to make sure we are pointing to your component-specific files. The internal g5-component browser references are set to false to make sure Browserify doesn't try to load those instead. If need be, the core model and/or viewModel can also be changed if necessary, however it should inherit it's prototype from the g5-component model to maintain expected methods.

```json
  "browser": {
    "component": false,
    "component-less": false,
    "component-template": false,
    "component-extender": false
  },
  "aliasify": {
    "aliases": {
      "component": "./src/scripts/component/master.js",
      "component-less": "./src/styles/component.less",
      "component-template": "./src/template/component.html",
      "component-extender": "./src/scripts/component/extender.js"
    }
  }
```

#### Component Extender

When the model successfully returns data, that data can then be manipulated and/or extended with new properties in the component extender. For example, if you need a game date property, and that property does not exist in your data set - instead of making your markup more verbose, you can add that property to the extender and it will then be available in your template.

The component extender is a required file (provided by default) and should always return an Object.

```js
const merge = require('lodash/object/merge');

/**
 *
 * @function extender
 * @param {Object} data
 * @returns {Object} extended data
 *
 */
function extender(data={}) {

    return merge(data, {
        game_date: data.game_id && data.game_id.slice(0, 10)
    });

}

module.exports = extender;
```

#### Component Master

Main file for all component specific JS. For consistency, primary methods should remain the same between components. The example below is using jQuery and bootstrap, however keep in mind jQuery and bootstrap are not used anywhere else in the project - so if you dont need either, simply dont import the modules.

```js
const $ = global.jQuery = require('jquery');

require('bootstrap/js/tooltip');
require('bootstrap/js/popover');

/**
 *
 * @name component
 * @description init, render, addEvents, and destroy methods are required for consistency
 *
 */
let component = {
    $element: undefined,
    /**
     *
     * @method init
     * @param {Element} el
     * @returns {Object} this
     * @description instantiates component
     *
     */
    init(el) {

        el = el || document.querySelector('.g5-component');

        this.$element = $(el);
        this.render().addEvents();

        return this;

    },
    /**
     *
     * @method render
     * @returns {Object} this
     * @description attaches component functionality
     *
     */
    render() {

        console.log('render component');

        this.$element.find('[data-toggle="tooltip"]').tooltip();
        this.$element.find('[data-toggle="popover"]').popover();

        return this;

    },
    /**
     *
     * @method addEvents
     * @returns {Object} this
     * @description attaches component events, events should be delegated from primary element
     *
     */
    addEvents() {

        /**
         *
         * @event click
         * @param {Object} e event
         *
         */
        this.$element.on('click', 'dt', function(e) {

            console.log('list title click', e);

        });

        return this;

    },
    /**
     *
     * @method destroy
     * @returns {Object} this
     * @description detaches component functionality, events must be cleaned up to prevent memory leaks
     *
     */
    destroy() {

        this.$element.find('[data-toggle="tooltip"]').tooltip('destroy');
        this.$element.find('[data-toggle="popover"]').popover('destroy');
        this.$element.off();

        return this;

    }
};

module.exports = component;
```
