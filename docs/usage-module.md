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
* __[dist/](https://github.com/MajorLeagueBaseball/g5-component/tree/master/dist)__ - directory for builds
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
     "build-js": "browserify src/scripts/g5-component.js --s 'g5-component' | uglifyjs --mangle --compress drop_console,drop_debugger,dead_code,unused > dist/g5-component.min.js",
     "build-js-dev": "browserify src/scripts/g5-component.js --s 'g5-component' > dist/g5-component.js",
     "build-js-all": "npm run build-js-dev && npm run build-js",
     "build-css": "lessc --include-path=node_modules/bootstrap/less:src/styles src/styles/component.less > dist/g5-component.css",
     "postbuild-css": "npm run minify-css && npm run gzip-css",
     "build": "npm run build-js-all && npm run build-css && npm run compress-images",
     "prebuild": "echo 'Running all builds...'",
     "postbuild": "npm run disk-usage; echo 'Builds are ready!'",
     "watch-js": "nodemon --debug -e js,html --watch src/scripts/ --watch src/template/ --exec 'npm run build-js-dev'",
     "watch-css": "nodemon -e less -x 'npm run build-css'",
     "minify-css": "cleancss --source-map -d -o dist/g5-component-min.css dist/g5-component.css",
     "gzip-css": "gzip -c -f -9 dist/g5-component-min.css > dist/g5-component-min.css.gz",
     "watch": "npm run watch-js & npm run watch-css",
     "test": "babel-tape-runner test/*.js | tap-spec",
     "pretest": "echo 'Checking code via babel-tape-runner'",
     "lint": "jshint src/scripts/ || true",
     "disk-usage": "du -sh ./dist/*",
     "prelint": "echo 'Checking code via JSHint...'"
    },
   "dependencies": {
     "babel-core": "^6.24.0",
     "babel-preset-es2015": "^6.24.0",
     "babelify": "^7.3.0",
     "browserify": "^14.1.0",
     "handlebars": "^4.0.6",
     "hbsfy": "^2.7.0",
     "babel-tape-runner": "^2.0.1",
     "bootstrap": "^3.3.7",
     "clean-css": "^4.0.9",
     "clean-css-cli": "^4.0.12",
     "ghooks": "^2.0.0",
     "http-server": "^0.9.0",
     "imagemin": "^5.2.2",
     "imagemin-cli": "^3.0.0",
     "jscs": "^3.0.7",
     "jshint": "^2.9.4",
     "less": "^2.7.2",
     "nodemon": "^1.11.0",
     "tap-spec": "^4.1.1",
     "tape": "^4.6.3",
     "uglify-js": "^2.8.14",
     "xmlhttprequest": "^1.8.0"
   },
   "devDependencies": {
   }
}
```

#### Component Extender

> When the model successfully returns data, that data can then be manipulated and/or extended with new properties in the component extender. For example, if you need a game date property, and that property does not exist in your data set - instead of making your markup more verbose, you can add that property to the extender and it will then be available in your template.

> The component extender is a required file (provided by default) and should always return an Object.

```js
import merge from 'lodash.merge';

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

export default extender;
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
const helpers = {
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

export default helpers;
```

#### Component Partials

> Module for easily adding handlebars partials

The handlebars plugin/transform for Browserify allows import of html files, which are converted
 to functions that accept data objects and return strings `Function<String(Object)>`.

```js

import example from '../../template/partials/example-partial.html';

/**
 *
 * @name partials
 * @description handlebars partials to be registered
 * @note paths must be hardcoded because Browserify can only do static string analysis
 *
 * Also callable in JS:
 * @example partials['example-partial']({}); // HTML string.
 *
 */
const partials = {
    'example-partial': example
};

```

#### Component Master

> Main file for all component specific JS. For consistency, primary methods should remain the same between components.

```js

/**
 *
 * @class Component
 * @desc entry point for all component specific functionality
 * @note init, render, addEvents, and destroy methods are required for consistency.
 * The parent viewModel is passed in as a reference, for external communication events can
 * be emitted via the parent
 *
 */
export class Component {

    /**
     *
     * @param {ViewModel|Object} parent
     *
     */
    constructor(parent) {

        const { opts, element, container, dataCache } = parent;

        /**
         *
         * @type {Object}
         *
         */
        this.dataCache = dataCache;

        /**
         *
         * @type {HTMLElement}
         *
         */
        this.element = element || container;

        /**
         *
         * @type {ViewModel}
         *
         */
        this.parent = parent;

        /**
         *
         * @type {Object}
         *
         */
        this.opts = opts;

        /**
         *
         * @type {Function<*(...args)>} a logging function.
         * @see G5Component()
         *
         */
        this.log = this.opts.log || utils.log;

    }

    /**
     *
     * @access public
     * @method init
     * @param {Object} data
     * @desc instantiates component with a reference to the parent viewModel, properties on
     * the parent reference should never be modified in any way.
     * @returns {Object} this
     *
     */
    init(data = {}) {

        this.dataCache = data;

        return this;

    }

    /**
     *
     * @access public
     * @method destroy
     * @desc detaches component functionality, events must be cleaned up
     * @returns {Object} this
     *
     */
    destroy() {

        return this;

    }

}

/**
 *
 * @access public
 * @function componentFactory
 * @param {ViewModel|Object} parent
 * @returns {Component}
 *
 */
export default function componentFactory(parent = {}) {

    return new Component(parent);

}

```
