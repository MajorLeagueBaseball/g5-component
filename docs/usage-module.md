# Usage // Module

> Simplifies component development. The model, viewModel, and event layer is abstracted for you via the g5-component module. This setup allows you to worry about the component level alone, while providing a flexible, consistent, and scalable structure for development.

---

:warning: Documentation in need of review

:construction: Component Generator - Coming Soon

---

#### Expected Directory Structure

> Set up exactly as the g5-component module, except all you need are component specific files

```
├── .babelrc
├── .editorconfig
├── .gitignore
├── .jscsrc
├── .jshintrc
├── src/
│   ├── data/
│   │   │   data.json
│   ├── images/
│   │   README.md
│   │   ├── build/
│   │   │   README.md
│   ├── static/
│   │   │   README.md
│   ├── scripts/
│   │   ├── component/
│   │   │   │   extender.js
│   │   │   │   helpers.js
│   │   │   │   master.js
│   │   │   │   partials.js
│   │   ├── index.js
│   ├── styles/
│   │   │   base.less
│   │   │   component.less
│   ├── template/
│   │   ├── partials/
│   │   │   │   example-partial.html
│   │   │   component.html
├── test/
│   │   component.js
├── package.json
├── index.html
```

#### File Overview

* __[.babelrc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.babelrc)__ - babel configuration options
* __[.editorconfig](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.editorconfig)__ - editor configuration options
* __[.gitignore](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.gitignore)__ - files for Git to ignore
* __[.jscsrc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jscsrc)__ - JSCS configuration
* __[.jshintrc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jshintrc)__ - JSHint settings
* __[src/data/](https://github.com/MajorLeagueBaseball/g5-component/tree/master/src/data)__ - data directory, required only if you plan on using a local data source
* __[src/static/](https://github.com/MajorLeagueBaseball/g5-component/tree/master/src/static)__ - directory for builds
* __[src/scripts/component/extender.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/extender.js)__ - module for extending/transforming data (post fetch via model), most likely use case is adding a property that does not exist in data, or adding a new property that is a combination of properties that you get back from the data
* __[src/scripts/component/helpers.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/helpers.js)__ - module for adding handlebars helpers
* __[src/scripts/component/partials.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/partials.js)__ - module for adding handlebars partials
* __[src/scripts/component/master.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/master.js)__ - module containing all component specific functionality (listeners, etc...)
* __[src/scripts/index.js](https://github.com/gbabula/babu.la/blob/master/src/scripts/index.js)__ - component entry point, require g5-component and init your module in this file, then point browserify to this file to create the bundle
* __[src/styles/base.less](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/styles/base.less)__ - component specific styling
* __[src/styles/component.less](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/styles/component.less)__ - LESS entry point, all file references (bootstrap assets, etc...)
* __[src/template/component.html](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/template/component.html)__ - primary template for component
* __[test/component.js](https://github.com/gbabula/babu.la/blob/master/test/component.js)__ - primary test for component
* __package.json__ - all dependencies, npm scripts for browserify builds, and alias references (see below)
* __[index.html](https://github.com/gbabula/babu.la/blob/master/index.html)__ - contains reference to your container element and the bundle js, if you plan on consuming your component in a different way, disregard this file completely or use it for testing

#### Package.json

> The heart of every component.

```json
{
  "name": "fed-component-example",
  "version": "0.0.1",
  "description": "Example component",
  "author": "Derek Jeter",
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "https://github.com/*/fed-component-example"
  },
  "bugs": {
    "url": "https://github.com/*/fed-component-example/issues"
  },
  "main": "src/scripts/index.js",
  "browserify": {
    "transform": [
      "babelify",
      "aliasify",
      [
        "hbsfy",
        {
          "extensions": [
            "html"
          ]
        }
      ]
    ]
  },
  "browser": {
    "jquery": "./node_modules/jquery/dist/jquery.js",
    "component": false,
    "component-template": false,
    "component-extender": false,
    "component-helpers": false,
    "component-partials": false
  },
  "aliasify": {
    "aliases": {
      "component": "./src/scripts/component/master.js",
      "component-template": "./src/template/component.html",
      "component-extender": "./src/scripts/component/extender.js",
      "component-helpers": "./src/scripts/component/helpers.js",
      "component-partials": "./src/scripts/component/partials.js"
    }
  },
  "browserify-shim": {
    "jquery": {
      "exports": "$"
    }
  },
  "config": {
    "ghooks": {
      "pre-commit": "cat src/scripts/**/*.js | jscs --esnext --preset=airbnb && npm run lint && npm test"
    }
  },
  "scripts": {
    "serve": "http-server -c-1 -p 9966",
    "start": "npm run build && npm run serve",
    "start-dev": "npm run watch & npm run serve",
    "compress-images": "imagemin --progressive src/images/* src/images/build",
    "postcompress-images": "echo 'imagemin complete'",
    "build-js": "browserify -u bootstrap -u jquery -u lodash -u isomorphic-fetch src/scripts/index.js --s 'fed-component-example' | uglifyjs --mangle --compress drop_console,drop_debugger,dead_code,unused > src/static/fed-component-example-bundle.js",
    "build-js-dev": "browserify -u bootstrap -u jquery -u lodash -u isomorphic-fetch src/scripts/index.js --s 'fed-component-example' > src/static/fed-component-example-bundle.js",    
    "build-js-vendor": "browserify -r bootstrap -r jquery -r lodash -r es6-promise -r isomorphic-fetch | uglifyjs --enclose --mangle --compress drop_console,drop_debugger,dead_code,unused > src/static/fed-component-example-vendor.js",
    "build-js-full": "browserify src/scripts/index.js --s 'fed-component-example' | uglifyjs --mangle --compress drop_console,drop_debugger,dead_code,unused > src/static/fed-component-example.js",
    "build-js-all": "npm run build-js-vendor && npm run build-js && npm run build-js-full",
    "build-css": "lessc --include-path=node_modules/bootstrap/less:src/styles src/styles/component.less > src/static/fed-component-example.css",
    "postbuild-css": "npm run minify-css",
    "build": "npm run build-js-all && npm run build-css && npm run compress-images",
    "prebuild": "echo 'Running all builds...'",
    "postbuild": "echo 'Builds are ready!'",
    "watch-js": "nodemon --debug --watch src/scripts/ --exec 'npm run build-js-dev'",
    "watch-css": "nodemon -e less -x \"npm run build-css\"",
    "minify-css": "cleancss -o src/static/fed-component-example-min.css src/static/fed-component-example.css",
    "watch": "npm run watch-js & npm run watch-css",
    "test": "babel-tape-runner test/*.js | tap-spec",
    "pretest": "echo 'Checking code via babel-tape-runner'",
    "lint": "jshint src/scripts/ || true",
    "prelint": "echo 'Checking code via JSHint...'",
    "postinstall": "bower i && npm run build"
  },
  "dependencies": {
    "aliasify": "^1.7.2",
    "babel": "^5.5.6",
    "babelify": "^6.1.2",
    "bootstrap": "^3.3.5",
    "browserify": "^8.1.1",
    "duplexer2": "0.0.2",
    "falafel": "^0.3.1",
    "g5-component": "~2.2.0",
    "handlebars": "^3.0.3",
    "hbsfy": "^2.2.1",
    "inherits": "^2.0.1",
    "isomorphic-fetch": "^2.1.0",
    "jquery": "^2.1.4",
    "lodash": "^3.10.0",
    "readable-stream": "^1.0.33"
  },
  "devDependencies": {
    "babel-tape-runner": "^1.1.0",
    "clean-css": "^3.4.2",
    "ghooks": "^0.3.2",
    "http-server": "^0.8.0",
    "imagemin": "^3.2.0",
    "jscs": "^2.1.1",
    "jshint": "^2.8.0",
    "less": "^2.5.3",
    "nodemon": "^1.5.0",
    "tap-spec": "^4.0.2",
    "tape": "^4.0.0",
    "uglify-js": "^2.4.16"
  }
}
```

#### Component File Reference

> Aliasify is used to make sure we are pointing to your component-specific files. The internal g5-component browser references are set to false to make sure Browserify doesn't try to load those instead. If need be, the core model and/or viewModel can also be changed if necessary, however it should inherit it's prototype from the g5-component model to maintain expected methods.

```json
  "browser": {
    "component": false,
    "component-template": false,
    "component-extender": false,
    "component-helpers": false,
    "component-partials": false
  },
  "aliasify": {
    "aliases": {
      "component": "./src/scripts/component/master.js",
      "component-template": "./src/template/component.html",
      "component-extender": "./src/scripts/component/extender.js",
      "component-helpers": "./src/scripts/component/helpers.js",
      "component-partials": "./src/scripts/component/partials.js"
    }
  }
```

#### Component Extender

> When the model successfully returns data, that data can then be manipulated and/or extended with new properties in the component extender. For example, if you need a game date property, and that property does not exist in your data set - instead of making your markup more verbose, you can add that property to the extender and it will then be available in your template.

> The component extender is a required file (provided by default) and should always return an Object.

```js
const merge = require('lodash.merge');

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

#### Component Helpers

> Module for easily adding handlebars helpers

```js
/**
 *
 * @name helpers
 * @description handlebars helpers to be registered
 *
 */
let helpers = {
    /**
     *
     * @method upcase
     * @description example helper, transforms text to uppercase
     *
     */
    'upcase': function(s) {
        return s.toUpperCase();
    }
};

module.exports = helpers;
```

#### Component Partials

> Module for easily adding handlebars partials

```js
/**
 *
 * @name partials
 * @description handlebars partials to be registered
 * @note paths must be hardcoded because Browserify can only do static string analysis
 *
 */
let partials = {
    'example-partial': require('../../template/partials/example-partial.html')
};
```

#### Component Master

> Main file for all component specific JS. For consistency, primary methods should remain the same between components. The example below is using jQuery and bootstrap, however keep in mind jQuery and bootstrap are not used anywhere else in the project - so if you dont need either, simply dont import the modules.

```js
const $ = global.jQuery = require('jquery');
const assign = require('lodash.assign');
const create = require('lodash.create');
const isFunction = require('lodash.isFunction');

require('bootstrap/js/tooltip');

/**
 *
 * @name component
 * @description init, render, addEvents, and destroy methods are required for consistency.
 * The parent viewModel is passed in as a reference, for external communication events can
 * be emitted via the parent
 *
 */
let component = {
    /**
     *
     * @method init
     * @param {Object} data
     * @returns {Object} this
     * @description instantiates component with a reference to the parent viewModel, properties on
     * the parent reference should never be modified in any way
     *
     */
    init(data={}) {

        let { opts } = this;
        let { extendListeners } = opts;

        this.dataCache = data;
        this.render().addEvents(extendListeners);

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

        return this;

    },
    /**
     *
     * @method addEvents
     * @param {Function} cb
     * @returns {Object} this
     * @description attaches component events, event listeners should be delegated from primary element
     *
     */
    addEvents(cb) {

        /**
         *
         * @event click
         * @param {Object} e event
         * @description simple event example
         *
         */
        this.$element.on('click', 'dt', function(e) {

            console.log('list title click', e);

        });

        if (isFunction(cb)) {
            cb(this.$element[0]);
        }

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
        this.$element.off();

        return this;

    }
};

/**
 *
 * @function componentFactory
 * @param {Object} parent
 * @returns {Object}
 *
 */
function componentFactory(parent={}) {

    let { opts, container, dataCache } = parent;

    return assign(create(component), {
        $element: $(container),
        parent,
        dataCache,
        opts
    });

}

module.exports = componentFactory;
```
