#Usage // Module

Simplifies component development. The model, viewModel, and event layer is abstracted for you via the g5-component module. This setup allows you to worry about the component level alone, while providing a flexible, consistent, and scalable structure for development.

---

:construction: Component Generator - Coming Soon.

---

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
│   │   ├── index.js
│   ├── styles/
│   │   │   base.scss
│   │   │   component.scss
│   ├── template/
│   │   │   component.html
├── test/
│   │   component.js
├── package.json
├── index.html
```

#### File Overview

* __[.editorconfig](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.editorconfig)__ - editor configuration options
* __[.gitignore](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.gitignore)__ - files for Git to ignore
* __[.jscsrc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jscsrc)__ - JSCS configuration
* __[.jshintrc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jshintrc)__ - JSHint settings
* __[src/data/](https://github.com/MajorLeagueBaseball/g5-component/tree/master/src/data)__ - data directory, required only if you plan on using a local data source
* __[src/static/](https://github.com/MajorLeagueBaseball/g5-component/tree/master/src/static)__ - directory for builds
* __[src/scripts/component/extender.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/extender.js)__ - module for extending/transforming data (post fetch via model), most likely use case is adding a property that does not exist in data, or adding a new property that is a combination of properties that you get back from the data
* __[src/scripts/component/helpers.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/helpers.js)__ - module for adding handlebars helpers
* __[src/scripts/component/master.js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/master.js)__ - module containing all component specific functionality (listeners, etc...)
* __[src/scripts/index.js](https://github.com/gbabula/babu.la/blob/master/src/scripts/index.js)__ - component entry point, require g5-component and init your module in this file, then point browserify to this file to create the bundle
* __[src/styles/base.scss](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/styles/base.scss)__ - component specific styling
* __[src/styles/component.scss](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/styles/component.scss)__ - SASS entry point, all file references (bootstrap assets, etc...)
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
    "component-helpers": false
  },
  "aliasify": {
    "aliases": {
      "component": "./src/scripts/component/master.js",
      "component-template": "./src/template/component.html",
      "component-extender": "./src/scripts/component/extender.js",
      "component-helpers": "./src/scripts/component/helpers.js"
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
    "serve": "http-server -p 9966",
    "start": "npm run build && npm run serve",
    "start-dev": "npm run watch & npm run serve",
    "compress-images": "imagemin --progressive src/images/* src/images/build",
    "postcompress-images": "echo 'imagemin complete'",
    "build-js": "browserify -u bootstrap-sass -u jquery -u lodash -u isomorphic-fetch src/scripts/index.js --s 'fed-component-example' | uglifyjs -mc drop_console > src/static/fed-component-example-bundle.js",
    "build-js-vendor": "browserify -r bootstrap-sass -r jquery -r lodash -r isomorphic-fetch | uglifyjs -mc > src/static/fed-component-example-vendor.js",
    "build-js-full": "browserify src/scripts/index.js --s 'fed-component-example' | uglifyjs -mc drop_console > src/static/fed-component-example.js",
    "build-js-all": "npm run build-js-vendor && npm run build-js && npm run build-js-full",
    "build-css": "node-sass --include-path src/styles --include-path node_modules/bootstrap-sass/assets/stylesheets --include-path node_modules/g5-component/src/styles src/styles/component.scss src/static/fed-component-example.css",
    "postbuild-css": "cleancss -o src/static/fed-component-example-min.css src/static/fed-component-example.css",
    "build": "npm run build-js-all && npm run build-css && npm run compress-images",
    "prebuild": "echo 'Running all builds...'",
    "postbuild": "echo 'Builds are ready!'",
    "watch-js": "watchify -u bootstrap-sass -u jquery -u lodash -u isomorphic-fetch src/scripts/index.js --s 'fed-component-example' -o src/static/fed-component-exampe-bundle.js -dv",
    "watch-css": "nodemon -e scss -x \"npm run build-css\"",
    "watch": "npm run watch-js & npm run watch-css",
    "test": "babel-tape-runner test/*.js | tap-spec",
    "pretest": "echo 'Checking code via babel-tape-runner'",
    "posttest": "echo 'tests successfully passed!'",
    "lint": "jshint src/scripts/ || true",
    "prelint": "echo 'Checking code via JSHint...'",
    "postlint": "echo 'Code is lint free, great success!'"
  },
  "dependencies": {
    "aliasify": "^1.7.2",
    "babel": "^5.5.6",
    "babel-tape-runner": "^1.1.0",
    "babelify": "^6.1.2",
    "bootstrap-sass": "^3.3.5",
    "browserify": "^8.1.1",
    "duplexer2": "0.0.2",
    "falafel": "^0.3.1",
    "g5-component": "*",
    "ghooks": "^0.3.2",
    "handlebars": "^3.0.3",
    "hbsfy": "^2.2.1",
    "inherits": "^2.0.1",
    "isomorphic-fetch": "^2.1.0",
    "jquery": "^2.1.4",
    "lodash": "^3.10.0",
    "readable-stream": "^1.0.33"
  },
  "devDependencies": {
    "clean-css": "^3.4.2",
    "http-server": "^0.8.0",
    "imagemin": "^3.2.0",
    "jscs": "^2.1.1",
    "jshint": "^2.8.0",
    "node-sass": "^3.3.2",
    "nodemon": "^1.5.0",
    "tap-spec": "^4.0.2",
    "tape": "^4.0.0",
    "uglify-js": "^2.4.16",
    "watchify": "^2.2.1"
  }
}
```

#### Component File Reference

Aliasify is used to make sure we are pointing to your component-specific files. The internal g5-component browser references are set to false to make sure Browserify doesn't try to load those instead. If need be, the core model and/or viewModel can also be changed if necessary, however it should inherit it's prototype from the g5-component model to maintain expected methods.

```json
  "browser": {
    "component": false,
    "component-template": false,
    "component-extender": false,
    "component-helpers": false
  },
  "aliasify": {
    "aliases": {
      "component": "./src/scripts/component/master.js",
      "component-template": "./src/template/component.html",
      "component-extender": "./src/scripts/component/extender.js",
      "component-helpers": "./src/scripts/component/helpers.js"
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

#### Component Helpers

Module for easily adding handlebars helpers

```js
/**
 *
 * @name helpers
 * @description handlebar helpers to be registered
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

#### Component Master

Main file for all component specific JS. For consistency, primary methods should remain the same between components. The example below is using jQuery and bootstrap, however keep in mind jQuery and bootstrap are not used anywhere else in the project - so if you dont need either, simply dont import the modules.

```js
const $ = global.jQuery = require('jquery');

require('bootstrap-sass/assets/javascripts/bootstrap/tooltip');
require('bootstrap-sass/assets/javascripts/bootstrap/popover');

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
