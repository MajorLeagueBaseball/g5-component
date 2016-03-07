#Usage // Intro

Easy components with [g5-component.js](https://github.com/MajorLeagueBaseball/g5-component/) :package: (_Browserify Component Scaffold_) 

---

### Introduction

* Quick and easy to get started (_no reinventing the wheel, we know what a standard component needs_)
* Consistent component architecture and design patterns
* Self contained, environment agnostic
* Easily scalable (_components can be as big as needed_)
* Well tested architecture (_millions of users between MLB and NHL_)
* Focus on component logic instead of the surrounding architecture, allowing you to work faster and smarter

### Features

* ES2015 support via [babel](https://babeljs.io/)
* NPM scripts in favor of Gulp/Grunt
* event based architecture (_communication between layers happens via an event mediator_)
* [well documented](https://github.com/MajorLeagueBaseball/g5-component/tree/master/docs#documentation)
* Tape unit tests via [babel-tape-runner](https://www.npmjs.com/package/babel-tape-runner)
* minimal, consistent code with [JSDoc](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/g5-component.js#L16) throughout
* Style guide ([Airbnb](https://github.com/MajorLeagueBaseball/g5-component/blob/master/.jscsrc)) validation via [JSCS](http://jscs.info/), JS lint, and test on commit
* [Image compression](https://www.npmjs.com/package/imagemin)

### Tools

* [Browserify](http://browserify.org/)
* [Handlebars templating](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/template/component.html) with baseline [helpers](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/helpers.js) and [partials](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/partials.js)
* [LoDash](https://lodash.com/)
* [LESS](http://lesscss.org/) with BEM syntax
* Bootstrap (_optional_)
* jQuery (_optional_)

### Consistency

* Consistent directory structure
* Consistent LESS and JS organization
* Baseline `events`, `options`, and `attributes` between components
* GIT hooks and style guide validation ensure that consistency is maintained

---

### Concept

#### Layers

The `g5-component.js` architecture is composed of the following layers:

* `model` - _(standard model)_
* `viewModel` - _(sets up the view and Handlebars)_
* `eventTower` - _(event mediator)_
* `component-extender` - _(allows you to mutate data before its passed to the template)_
* `component-master` - _(primary location for component logic)_
* `component-template` - _(Handlebars template)_

#### General

Layers are not aware of each other and do not communicate directly.
Instead, all communication is mediated via an event tower. This allows for a clear separation and simpler logic.

By default, components do not receive a `model`, `viewModel`, or `eventTower`. Since that logic is largely similar between components, it's abstracted away by the scaffold (core module) - allowing the developer to focus only on the component layer.

For example, instead of creating a new model every time you create a component, you can just pass in a `path` option to your component and have it fetch that path and pass `JSON` back to your `component-extender` where you can manipulate the data before it reaches the template. The same concept applies to the `eventTower`, where several standard methods are provided and documented for all components. 

The main idea is simplicity, at the end of the day you only worry about component specific layers: 

* `component-extender`
* `component-master`
* `component-template`

If your component is growing in complexity - you can easily expose any of the other layers and customize as needed. This architecture is designed to be easily scalable.

