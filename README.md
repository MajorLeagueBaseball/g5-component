#g5-component.js

Browserify Component Scaffold ([documentation](https://github.com/MajorLeagueBaseball/g5-component/tree/master/docs#documentation))

[![NPM version](http://img.shields.io/npm/v/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component) 
[![NPM license](http://img.shields.io/npm/l/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component)

---

* ES6/ES2015 support via [babel](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L34)
* [NPM scripts](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L63) in favor of Gulp/Grunt
* [event based](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/events/master.js)
* [well documented](https://github.com/MajorLeagueBaseball/g5-component/tree/master/docs#documentation)
* scalable, well tested architecture
* Tape unit tests via [babel-tape-runner](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L80)
* minimal, consistent code with [JSDoc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/g5-component.js#L16) throughout
* completely self-contained, can be used as a scaffold or module
* UMD support
* Style guide ([Airbnb](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jscsrc)) validation, JS lint, and test [on commit](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L60)
* [Image compression](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L67)
* [BEM syntax](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/styles/base.less)
* [Handlebars templating](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/template/component.html) with [helpers](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/helpers.js) and [partials](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/partials.js)
* [LoDash](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/g5-component.js#L12)
* [LESS](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/styles/base.less)
* [Bootstrap](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/styles/component.less) (_optional_)
* [jQuery](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L100) (_optional_)

---

###Setup

> Install the package and use it as a module, create new components quickly and efficiently ([documentation](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/usage-module.md))

```
npm i g5-component
```

> Or clone the package and use it as a scaffold/baseline for your project ([documentation](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/usage-scaffold.md))

```
git clone https://github.com/MajorLeagueBaseball/g5-component.git && cd g5-component
```

> Install the dependencies and run the initial build, once done you can simply run the server and start development.

```
npm i && npm run build
```

---

###Server / Development

> Server running on [http://localhost:9966](http://localhost:9966) with auto - split builds (vendor dependencies are built separately for faster build times) [Ctrl+C] to kill server

```
npm run start-dev
```

###Server

> Server running on [http://localhost:9966](http://localhost:9966) with full build [Ctrl+C] to kill server

```
npm run start
```

---

###Options

> A single shared options `Object`

| Option          | Type      | Description                               | Default           |
|:----------------|:----------|:------------------------------------------|:------------------|
| `component`     | `String`  | component name/class                      | `g5-component--*` |
| `container`     | `Element` | primary container                         | `undefined`       |
| `css`           | `String`  | classes to add after instantiation        | `g5-component`    |
| `i18n`          | `String`  | localization                              | `en`              |
| `interval`      | `Number`  | polling interval                          | `40000`           |
| `path`          | `String`  | data path to fetch                        | `''`              |
| `enableFetch`   | `Boolean` | flag to enable/disable initial data fetch | `true`            |
| `enablePolling` | `Boolean` | flag to enable/disable data polling       | `true`            |

###Methods

> Simple set of core methods

```js
exampleComponent.init(); // initiates component
```

```js
exampleComponent.hasInstance(); // checks if container has an instance of g5-component
```

```js
exampleComponent.detachEvents(); // detaches all events
```

```js
exampleComponent.attachEvents(); // attaches all events
```

```js
exampleComponent.destroy(); // kills component instance, cleans everything out to prevent memory leaks
```

###Events / Listen

> Events must be attached before the component is initiated

```js
exampleComponent.on('ready', (obj) => {

    // console.log('component model and viewModel have been initiated', obj);

});

exampleComponent.on('data', (data) => {

    // console.log('component data from model', data);

});

exampleComponent.on('data-error', (err) => {

    // console.log('component model data error', err);

});

exampleComponent.on('destroy', (obj) => {

    // console.log('component instance killed', obj);

});
```

###Events / Trigger

> Events must be triggered after the component is initiated

```js
// 
// Used with the `enableFetch` option (which toggles the initial data fetch), this 
// event allows direct passing of a data Object via an event
//
exampleComponent.emit('synthetic-data', data);
```

###Usage

```js
let exampleComponent = g5Component({
    component: 'g5-component--linescore',
    container: document.querySelector('.g5-component--linescore'),
    css: 'g5-component--linescore-initiated',
    interval: 15000,
    path: '/src/data/linescore.json'
});

exampleComponent.init();
```

---

###Commands

####[build-js](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L69)

> Bundle build, without vendor dependencies

```
npm run build-js
```

####[build-js-vendor](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L70)

> Vendor build (Bootstrap, jQuery, LoDash, etc...)

```
npm run build-js-vendor
```

####[build-js-full](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L71)

> Full build, including vendor and bundle

```
npm run build-js-full
```

####[build](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L75)

> Full build, including vendor, bundle and CSS

```
npm run build
```

####[test](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L82)

> babel-tape-runner test

```
npm test
```

####[compress-images](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L67)

> compresses all images in src/images/ and outputs to src/images/build

```
npm run compress-images
```

####[lint](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L84)

> JSHint, options set in [.jshintrc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jshintrc)

```
npm run lint
```

####[minify-css](https://github.com/MajorLeagueBaseball/g5-component/blob/master/package.json#L80)

> minifies CSS via cleancss

```
npm run minify-css
```

---

```
                                                                                                         
                                                                                                         
                                                                                                         
                                                                                                         
                                                                                                         
            ______
            _\ _~-\___
    =  = ==(____G5____D
                \_____\___________________,-~~~~~~~`-.._
                /     o O o o o o O O o o o o o o O o  |\_
                `~-.__        ___..----..                  )
                      `---~~\___________/------------`````
                      =  ===(_________D
                                                                                                         
                                                                                                         
                                                                                                         
                                                                                                         
                                                                                                         
```
