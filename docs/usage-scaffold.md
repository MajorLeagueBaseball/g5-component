# Usage // Scaffold

A [linescore component](https://github.com/MajorLeagueBaseball/g5-component/tree/master/example) example is included in this repo for demonstraton purposes

## Full Build

#### CommonJS

> Assuming an index.js file in src/scripts which would be bundled by Browserify and output g5-component-cjs.js (not implemented by default)

```js
/**
 *
 * @module index
 *
 */

'use strict';

const g5Component = require('./g5-component');

window.onload = () => {

    let linescoreComponent = g5Component({
        component: 'g5-component--linescore',
        container: document.querySelector('.g5-component--linescore'),
        css: 'g5-component--linescore-initiated',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

};
```

```html
<section class="g5-component g5-component--linescore"></section>

<!-- bundled JS -->
<script src="/src/static/g5-component-cjs.js"></script>
```

#### [AMD](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-amd.html)

```html
<section class="g5-component g5-component--linescore"></section>

<script>

    require(['src/static/g5-component'], function(g5Component) {

        var linescoreComponent = g5Component({
            component: 'g5-component--linescore',
            container: document.querySelector('.g5-component--linescore'),
            css: 'g5-component--linescore-initiated',
            interval: 15000,
            path: '/src/data/linescore.json'
        });

        linescoreComponent.init();

    });

</script>
```

#### [Global](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-global.html)

```html
<section class="g5-component g5-component--linescore"></section>

<!-- bundled JS -->
<script src="/src/static/g5-component.js"></script>

<script>

    var linescoreComponent = g5Component({
        component: 'g5-component--linescore',
        container: document.querySelector('.g5-component--linescore'),
        css: 'g5-component--linescore-initiated',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```

## Split Build

#### CommonJS

> Assuming an index.js file in src/scripts which would be bundled by Browserify and output g5-component-cjs-bundle.js (not implemented by default)

```js
/**
 *
 * @module index
 *
 */

'use strict';

const g5Component = require('./g5-component');

window.onload = () => {

    let linescoreComponent = g5Component({
        component: 'g5-component--linescore',
        container: document.querySelector('.g5-component--linescore'),
        css: 'g5-component--linescore-initiated',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

};
```

```html
<section class="g5-component g5-component--linescore"></section>

<!-- bundled JS -->
<script src="/src/static/g5-component-vendor.js"></script>
<script src="/src/static/g5-component-cjs-bundle.js"></script>
```

#### [AMD](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-amd-split-builds.html)

```html
<section class="g5-component g5-component--linescore"></section>

<script>

    requirejs.config({
        paths: {
            'g5-component-vendor': '../src/static/g5-component-vendor',
            'g5-component-bundle': '../src/static/g5-component-bundle'
        }
    });

    require(['g5-component-vendor', 'g5-component-bundle'], function(vendor, g5Component) {

        var linescoreComponent = g5Component({
            component: 'g5-component--linescore',
            container: document.querySelector('.g5-component--linescore'),
            css: 'g5-component--linescore-initiated',
            interval: 15000,
            path: '/src/data/linescore.json'
        });

        linescoreComponent.init();

    });

</script>
```

#### [Global](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-global-split-builds.html)

```html
<section class="g5-component g5-component--linescore"></section>

<!-- bundled JS -->
<script src="/src/static/g5-component-vendor.js"></script>
<script src="/src/static/g5-component-bundle.js"></script>

<script>

    var linescoreComponent = g5Component({
        component: 'g5-component--linescore',
        container: document.querySelector('.g5-component--linescore'),
        css: 'g5-component--linescore-initiated',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```
