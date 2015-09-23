#g5-component.js

Browserify Component Scaffold ([documentation](https://github.com/MajorLeagueBaseball/g5-component/tree/master/docs#documentation))

[![NPM version](http://img.shields.io/npm/v/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component) 
[![NPM license](http://img.shields.io/npm/l/g5-component.svg?style=flat-square)](https://www.npmjs.org/package/g5-component)

---

* event based
* scalable architecture
* completely self-contained
* clean, well documented
* consistent code and methodologies
* simple workflow
* environment agnostic code (UMD)
* can be used as a scaffold and a module
* ES6/ES2015 support via babel
* Tape unit tests
* Style guide (Airbnb) validation and test on commit
* JS and SASS lint
* BEM Syntax
* Handlebars, LoDash, SASS, Bootstrap, jQuery

---

###Setup

> Install the package and use it as a module ([documentation](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/usage-module.md))

```
npm i g5-component
```

> Or clone the package and use it as a scaffold ([documentation](https://github.com/MajorLeagueBaseball/g5-component/blob/master/docs/usage-scaffold.md))

```
git clone https://github.com/MajorLeagueBaseball/g5-component.git && cd g5-component
```

> If you want SASS linting, make sure you have a version of Ruby installed via [RVM](https://rvm.io/) or [Homebrew](http://brew.sh/). If you skip this step, the scss-lint will fail silently. If you have homebrew, installing ruby is extremely simple.

```
brew install ruby
```

> Install the dependencies, this will trigger the initial builds on completion, once done you can simply run the server and start development.

```
npm i && npm run install-scss-lint && npm run build
```

---

###Server / Development

> Server running on [http://localhost:9966](http://localhost:9966) with auto (split) builds [Ctrl+C] to kill server

```
npm run start-dev
```

###Server

> Server running on [http://localhost:9966](http://localhost:9966) with full build [Ctrl+C] to kill server

```
npm run start
```

---

###Commands

####build-js

> Bundle build, without vendor dependencies

```
npm run build-js
```

####build-js-vendor

> Vendor build (Bootstrap, jQuery, LoDash, etc...)

```
npm run build-js-vendor
```

####build-js-full

> Full build, including vendor and bundle

```
npm run build-js-full
```

####build

> Full build, including vendor, bundle and CSS

```
npm run build
```

####test

> babel-tape-runner test

```
npm test
```

####compress-images

> compresses all images in src/images/ and outputs to src/images/build

```
npm run compress-images
```

####lint

> JSHint, options set in .jshintrc

```
npm run lint
```

####lint-sass

> scss-lint, options set in .scss-lint.yml

```
npm run lint-sass
```

####minify-css

> minifies CSS via cleancss

```
npm run minify-css
```

---

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
exampleComponent.hasInstance(); // checks if container has an instance of g5-component
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

