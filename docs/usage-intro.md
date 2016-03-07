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
