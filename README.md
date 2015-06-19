#g5-component.js

MVVM + Event Layer - Browserify Component Scaffold

---

###Setup

> Install the package and use it as a scaffold for your component

```
git clone https://github.com/MajorLeagueBaseball/g5-component.git
```

```
npm install jscs -g
```

```
npm install
```

###Server

> Server running on [http://localhost:9966](http://localhost:9966)

```
npm run start
```

###Dev Server

> Server running on [http://localhost:9966](http://localhost:9966) with auto builds, [Ctrl+C] to kill server

```
npm run start-dev
```

###Build

```
npm run build
```

###Test

```
npm test
```

###Usage

####[AMD](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-amd.html)

```html
<script>

    require(['src/static/bundle'], function(g5Component) {

        g5Component = g5Component && g5Component.construct;

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
<script src="src/static/bundle.js"></script>

<script>

    var g5Component = g5Component && g5Component.construct;

    var linescoreComponent = g5Component({
        container: document.getElementById('component--linescore'),
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```

####[Browserify](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/index.js)

```html
<script>

    const g5Component = require('./g5-component').construct;

    let linescoreComponent = g5Component({
        container: document.getElementById('component--linescore'),
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
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
```

###Methods

```js

linescoreComponent.init(); // initiates component
```

###Style Guide / Rules

* Style Guide - [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)
* Protect against `new` - constructors can be called with or without `new`
* Maintain chainability, methods return `this`

###TODO

- [ ] Iron out build process
- [ ] Add Grunt process
- [ ] Fix build-css and watch-css commands
- [ ] Refactor/Cleanup
- [x] Add Git hooks
- [x] UMD support
- [x] Bootstrap addition
- [ ] etc...

###Reference

* [Browserify and UMD](http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html)
* [Browserify Handbook](https://github.com/substack/browserify-handbook)
* [Task Automation with npm run](http://substack.net/task_automation_with_npm_run)
* [About Watchify](https://github.com/substack/watchify)
* [Tape Tests](https://github.com/substack/tape)
* [Simple HTTP Server](https://docs.python.org/2/library/simplehttpserver.html)
* [JSDoc](http://usejsdoc.org/)

###License

Copyright (c) 2015, Greg Babula <gbabula@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
