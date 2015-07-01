#g5-component.js

MVVM + Event Layer - Browserify Component Scaffold

[![NPM version](http://img.shields.io/npm/v/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component) [![NPM license](http://img.shields.io/npm/l/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component)

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

> Install the package and use it as a scaffold for your component

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
* `Number` __interval__ - polling interval
* `String` __path__ - data path
* `Boolean` __enablePolling__ - flag to enable/disable data polling

###Usage

####[AMD](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-amd.html)

```html
<section class="g5-component" id="component--linescore"></section>

<script>

    require(['src/static/g5-component'], function(g5Component) {

        var linescoreComponent = g5Component({
            container: document.getElementById('component--linescore'),
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
<section class="g5-component" id="component--linescore"></section>

<script src="/src/static/g5-component.js"></script>

<script>

    var linescoreComponent = g5Component({
        container: document.getElementById('component--linescore'),
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```

###Methods

```js

linescoreComponent.init(); // initiates component
```

```js

linescoreComponent.detachEvents(); // detaches all events
```

```js

linescoreComponent.attachEvents(); // attaches all events
```

```js

linescoreComponent.destroy(); // kills component instance
```

###Events

```js

linescoreComponent.on('ready', function(obj) {

    // console.log('component model and viewModel have been initiated', obj);

});

linescoreComponent.on('data', function(data) {

    // console.log('component data from model', data);

});

linescoreComponent.on('data-error', function(err) {

    // console.log('component model data error', err);

});

linescoreComponent.on('destroy', function(obj) {

    // console.log('component instance killed', obj);

});
```

###Style Guide / Rules

* Style Guide - [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)
* Protect against `new` - constructors can be called with or without `new`
* Maintain chainability, methods return `this`

###TODO

- [ ] Add ability to swap out model
- [ ] Add examples of module/scaffold usage
- [ ] Iron out build process
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

Copyright (c) Greg Babula <greg.babula@mlb.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
