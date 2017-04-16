# [g5-component.js](https://youtu.be/sr9_GfeoCjk?t=35s)

_Browserify Component Scaffold._

[![NPM version](http://img.shields.io/npm/v/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component)
[![NPM license](http://img.shields.io/npm/l/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component)
[![GitHub issues](https://img.shields.io/github/issues/MajorLeagueBaseball/g5-component.svg)](https://github.com/MajorLeagueBaseball/g5-component/issues)

---

* [Introduction](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/usage-intro.md)
* [Documentation](https://github.com/MajorLeagueBaseball/g5-component/tree/master/docs#documentation)
* [Change Log](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/core-change-log.md)

---

### Setup

> Install the package and [use it as a module](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/usage-module.md)

```
npm i g5-component --save
```

> Or clone the repo and use it as a [scaffold/boilerplate](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/usage-scaffold.md) for your component

```
git clone https://github.com/MajorLeagueBaseball/g5-component.git && cd g5-component
```

### Install

> Install dependencies, run the initial build, and start the development server

```
npm i && npm run build && npm run start-dev
```

---

### Usage Example

> Based on the provided linescore example

```html
<section class="g5-component g5-component--linescore"></section>
```

```js
let linescoreComponent = g5Component({
    component: 'g5-component--linescore',
    container: document.querySelector('.g5-component--linescore'),
    css: 'g5-component--linescore-initiated',
    interval: 15000,
    path: '/src/data/linescore.json'
});

linescoreComponent.init();
```

---

### Options

> A single shared options `Object`

| Option            | Type       | Description                                                 | Default        |
|:------------------|:-----------|:------------------------------------------------------------|:---------------|
| `component`       | `String`   | component name/class                                        | `''`           |
| `container`       | `Element`  | primary container                                           | `''`           |
| `css`             | `String`   | classes to add after instantiation                          | `g5-component` |
| `i18n`            | `String`   | localization                                                | `en`           |
| `interval`        | `Number`   | polling interval                                            | `40000`        |
| `path`            | `String`   | data path to fetch (remote or local)                        | `''`           |
| `enableFetch`     | `Boolean`  | flag to enable/disable initial data fetch                   | `true`         |
| `enablePolling`   | `Boolean`  | flag to enable/disable data polling                         | `true`         |
| `extendListeners` | `Function` | callback executed after all event listeners have been added | `undefined`    |

### Methods

> Simple set of core methods

```js
linescoreComponent.init(); // initiates component
```

```js
linescoreComponent.hasInstance(); // checks if container has an instance of g5-component
```

```js
linescoreComponent.detachEvents(); // detaches all events
```

```js
linescoreComponent.attachEvents(); // attaches all events
```

```js
linescoreComponent.destroy(); // kills component instance, cleans everything out to prevent memory leaks
```

### Events / Listen

> Events must be attached before the component is instantiated

```js
linescoreComponent.on('ready', (obj) => {
    // console.log('component model and viewModel have been initiated', obj);
});

linescoreComponent.on('data', (data) => {
    // console.log('component data from model', data);
});

linescoreComponent.on('data-error', (err) => {
    // console.log('component model data error', err);
});

linescoreComponent.on('destroy', (obj) => {
    // console.log('component instance killed', obj);
});

linescoreComponent.on('start', () => {
    // console.log('component start fetch');
});

linescoreComponent.on('stop', () => {
    // console.log('component stop fetch');
});
```

### Events / Trigger

> Events must be triggered after the component is instantiated

```js
//
// Used with the `enableFetch` option (which toggles the initial data fetch), this
// event allows direct passing of a data Object via an event
//
linescoreComponent.emit('synthetic-data', data);

//
// stops data polling on component
// event is ignored if data polling is already stopped
//
linescoreComponent.emit('stop');

//
// resumes data polling on component
// event is ignored if already polling data
//
linescoreComponent.emit('start');
```

---

### Server / Development

> Server running on [http://localhost:9966](http://localhost:9966) with automatic split builds (vendor dependencies are built separately for faster build times) [Ctrl+C] to kill server

```
npm run start-dev
```

### Server

> Server running on [http://localhost:9966](http://localhost:9966) with full build [Ctrl+C] to kill server

```
npm run start
```

---

### Commands

#### build

> Builds JS, CSS, and compresses images

```
npm run build
```

#### test

> runs test directory through the babel-tape-runner

```
npm test
```

#### lint

> lint via JSHint, options set in [.jshintrc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jshintrc)

```
npm run lint
```

#### compress-images

> compresses all images in src/images/ and outputs to src/images/build

```
npm run compress-images
```

---

### Browser Support

| ![Chrome](https://imgur.com/0G4BkQl.png) | ![Firefox](https://imgur.com/6CouqBy.png) | ![IE](https://imgur.com/24kW1zX.png) | ![Opera](https://i.imgur.com/FixcIOT.png) | ![Safari](https://i.imgur.com/MPkK0Si.png) |
|:-----------------------------------------|:------------------------------------------|:-------------------------------------|:------------------------------------------|:-------------------------------------------|
| ✔                                        | ✔                                         | 10+ ✔                                | ✔                                         | 6.1+ ✔                                     |

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
