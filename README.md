#g5-component.js

Browserify Component Scaffold

[![NPM version](http://img.shields.io/npm/v/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component) 
[![NPM license](http://img.shields.io/npm/l/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component)

---

* completely self-contained, event based, scalable architecture
* simple workflow - instantiate component, edit template and add any component specific JS
* can be used as a scaffold and a module
* clean, documented, consistent code and methodologies
* environment agnostic code
* ES6 support via babel
* Tape unit tests
* Style guide validation and test on commit
* Handlebars, LoDash, LESS, Bootstrap, jQuery
* UMD support

---

###Setup

> Install the package and use it as a module

```
npm i g5-component
```

> Or clone the package and use it as a scaffold

```
git clone https://github.com/MajorLeagueBaseball/g5-component.git && cd g5-component
```

```
npm i less catw jscs http-server -g
```

```
npm i
```

###Server

> Server running on [http://localhost:9966](http://localhost:9966) [Ctrl+C] to kill server

```
npm run start
```

###Build

```
npm run build
```

###Test

```
npm test
```

###Options

A single options Object shared between all Constructors

* `Element` __container__ - primary container
* `String` __css__ - classes
* `String` __i18n__ - localization
* `Number` __interval__ - polling interval (ms)
* `String` __path__ - data path (remote/local)
* `Boolean` __enablePolling__ - flag to enable/disable data polling

###Methods

```js

exampleComponent.init(); // initiates component
```

```js

exampleComponent.detachEvents(); // detaches all events
```

```js

exampleComponent.attachEvents(); // attaches all events
```

```js

exampleComponent.destroy(); // kills component instance
```

###Events

> Events must be attached before the component is initiated

```js

exampleComponent.on('ready', function(obj) {

    // console.log('component model and viewModel have been initiated', obj);

});

exampleComponent.on('data', function(data) {

    // console.log('component data from model', data);

});

exampleComponent.on('data-error', function(err) {

    // console.log('component model data error', err);

});

exampleComponent.on('destroy', function(obj) {

    // console.log('component instance killed', obj);

});
```

###Usage // Module

__Instructions for usage as a module, the easiest thing to do is to clone the [info component example](https://github.com/gbabula/babu.la) and use it as your baseline__

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

* __src/data/__ - data directory, required only if you plan on using a local data source
* __src/static/__ - directory for builds
* __src/scripts/component/extender.js__ - module for extending/transforming data (post fetch via model), most likely use case is adding a property that does not exist in data, or adding a new property that is a combination of properties that you get back from the data
* __src/scripts/component/master.js__ - module containing all component specific functionality (listeners, etc...)
* __src/scripts/index.js__ - component entry point, require g5-component and init your module in this file, then point browserify to this file to create the bundle
* __src/styles/base.less__ - component specific styling
* __src/styles/component.less__ - LESS entry point, all file references (bootstrap assets, etc...)
* __src/template/component.html__ - primary template for component
* __src/test/component.js__ - primary test for component
* __package.json__ - all dependencies, npm scripts for browserify builds, and alias references
* __index.html__ - contains reference to your container element and the bundle js, if you plan on consuming your component in a different way, disregard this file completely or use it for testing

#### Component File Reference

Aliasify is used to make sure we are pointing to your component-specific files. The internal g5-component browser references are set to false to make sure Browserify doesn't try to load those instead.

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

#### Component Entry Point

If you plan on using CommonJS/Browserify, you're index.js should look something like this.

```js
const g5Component = require('g5-component');

window.onload = () => {

    let infoComponent = g5Component({
        container: document.querySelector('.g5-component--info'),
        css: 'g5-component-info',
        path: '/src/data/babula.json',
        enablePolling: false
    });

    // init component
    infoComponent.init();

};
```

For UMD support, set module.exports to point to g5Component, and init your component elsewhere.

```js
const g5Component = require('g5-component');

module.exports = g5Component;
```

#### Component Build

For CommonJS/Browserify

```json
"scripts": {
  "build-js": "browserify src/scripts/index.js | uglifyjs -mc > src/static/bundle.js",
  "build": "npm run build-js"
}
```

For UMD support, add the --standalone flag to browserify.

```json
"scripts": {
  "build-js": "browserify src/scripts/index.js --standalone 'g5-component' | uglifyjs -mc > src/static/bundle.js",
  "build": "npm run build-js"
}
```

If you plan on having various components on one page, each component should be exported with a unique name. In that case you would add a unique name to each component build i.e. 'info-component'. Afterwards, you can initiate your component by using the unique name that you export.

```js
var info = infoComponent(options);
```

###Usage // Scaffold

####CommonJS

```html
<section class="g5-component"></section>

<script>

    var g5Component = require('./g5-component');

    var linescoreComponent = g5Component({
        container: document.querySelector('.g5-component'),
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```

####[AMD](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-amd.html)

```html
<section class="g5-component"></section>

<script>

    require(['src/static/g5-component'], function(g5Component) {

        var linescoreComponent = g5Component({
            container: document.querySelector('.g5-component'),
            css: 'g5-component-linescore linescore linescore--game',
            interval: 15000,
            path: '/src/data/linescore.json'
        });

        linescoreComponent.init();

    });

</script>
```

####[Global](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-global.html)

```html
<section class="g5-component"></section>

<script src="/src/static/g5-component.js"></script>

<script>

    var linescoreComponent = g5Component({
        container: document.querySelector('.g5-component'),
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```

###Style Guide / Rules

* Style Guide - [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)
* Protect against `new` - constructors can be called with or without `new`
* Maintain chainability, methods return `this`

###TODO

- [ ] Add hello-world component example
- [ ] Add ability to swap out model
- [ ] Iron out build process
- [x] Add full instructions for usage as a module
- [x] Fix build-css and watch-css commands
- [x] Add Git hooks
- [x] UMD support
- [x] Bootstrap addition
- [x] Refactor/Cleanup
- [ ] etc...

###Reference

* [Fetch](https://fetch.spec.whatwg.org/)
* [Browserify and UMD](http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html)
* [Browserify Handbook](https://github.com/substack/browserify-handbook)
* [Task Automation with npm run](http://substack.net/task_automation_with_npm_run)
* [About Watchify](https://github.com/substack/watchify)
* [Tape Tests](https://github.com/substack/tape)
* [JSDoc](http://usejsdoc.org/)

###License

Copyright (c) 2015 Greg Babula <greg.babula@mlb.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
