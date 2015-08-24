#Usage // Scaffold

> A [linescore component](https://github.com/MajorLeagueBaseball/g5-component/tree/master/example) example is included in this repo for demonstraton purposes

####CommonJS

```html
<section class="g5-component g5-component-linescore"></section>

<script>

    var g5Component = require('./g5-component');

    var linescoreComponent = g5Component({
        container: document.querySelector('.g5-component-linescore'),
        css: 'linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```

####[AMD](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-amd.html)

```html
<section class="g5-component g5-component-linescore"></section>

<script>

    require(['src/static/g5-component'], function(g5Component) {

        var linescoreComponent = g5Component({
            container: document.querySelector('.g5-component-linescore'),
            css: 'linescore linescore--game',
            interval: 15000,
            path: '/src/data/linescore.json'
        });

        linescoreComponent.init();

    });

</script>
```

####[Global](https://github.com/MajorLeagueBaseball/g5-component/blob/master/example/index-global.html)

```html
<section class="g5-component g5-component-linescore"></section>

<script src="/src/static/g5-component.js"></script>

<script>

    var linescoreComponent = g5Component({
        container: document.querySelector('.g5-component-linescore'),
        css: 'linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    linescoreComponent.init();

</script>
```
