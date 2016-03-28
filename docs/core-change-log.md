#Change Log

###2.3.2 (_upcoming release_)

* simplified examples

###2.3.1 (_current release_)

* Patch release
* Revert options change

###2.3.0

* Simplified included example
* Added `start` and `stop` events
* Added additional examples of events and methods
* Updated documentation

###2.2.1

* Adjusted `component/master`, using LoDash versions of `Object.create` and `Object.assign`.
* Adjusted `component/helpers`, removed `upcase` helper and replaced with a more useful `withItem` helper
* Updated `watch-js` NPM script to reload on template updates
* Updated `.jscsrc` defaults
* Updated examples
* Updated documentation
* Cleanup

###2.2.0

> Updated minor version number because of breaking changes in this release. 

> Before updating to this version, please adjust `component/master.js` to return a factory (see provided example)

* Updated `viewModel`
* Updated component architecture, returning factory instead of an Object 
* Adjusted `.babelrc`, not passing `bower_components` (if any) through `babelify`
* Updated documentation

###2.1.7

* Added `extendListeners` option
* Changed `watch-js` task, using `nodemon` instead of `watchify` because of bundle-size issues [issue #14](https://github.com/MajorLeagueBaseball/g5-component/issues/14)
* Updated `viewModel`
* Fixed issue where the error class was being added multiple times
* Test cleanup
* Updated documentation
* Updated NPM scripts

###2.1.6

* `model` refactor and bug fixes
* Updated documentation

###2.1.5

* Adjusted `viewModel`
* Adjusted `component` instance, passing in the viewModel for reference
* Revised example component
* Updated documentation

###2.1.4

* Updated `babel-tape-runner` dependency, staying at 1.2 to avoid issues

###2.1.3

* `EventTower` refactor
* Added `eventGroup` and `eventGroupExtender`
* Added `component` option
* Added simple data cache to the viewModel
* Updated documentation 
* Updated examples

###2.1.2

* `model/viewModel` refactor
* Moved data extender to viewModel layer
* Docuentation for `synthetic-data` event
* Updated tests

###2.1.1

* Added `enableFetch` option
* Added `synthetic-data` event
* Added additional component helpers
* General `model/viewModel/eventTower` refactor
* Updated documentation

###2.1.0

* Reverting back to LESS, for various reasons
* Cleaned up LESS usage, using nodemon for rebuilds, passing paths to lessc

###2.0.10

* Updated examples and documentation
* Adding class based on language (from opts)

###2.0.9

* Adjusted bundle builds

###2.0.8

* Added handlebars partials support

###2.0.7

* Took out the babel polyfill to avoid issues when using multiple components
* Added es6-promise polyfill

###2.0.6

* Added CSS source maps
* Running Babel polyfill by default

###2.0.5

* Disabled caching on server
* Updated BEM syntax in examples
* Updated documentation
* Updated core methods

###2.0.4

* Updated dependencies
* Updated setup instructions
* Adjusted scss-lint to allow deep nesting

###2.0.3

* removing postinstall to avoid issues when used as module

###2.0.2

* Added SASS Lint
* Adjustment SASS
* Documentation updates

###2.0.1

* Bug fixes
* Event layer fixes

###2.0.0

* SASS support
* Upgraded to bootstrap-sass
* BEM syntax addition and examples
* Adjusted CSS build
* Added CSS minification (via cleancss)
* Added image compression (via imagemin)
* Added handlebars helpers
* viewModel updates and adjustments
* Updated core styling and class hooks
* Updated NPM scripts
* Updated watch-css process
* Updated tests
* Updated JSCS rules
* Updated documentation and examples
* Adjusted dependencies
* Updated and simplified setup
* Other improvements and enhancements 
