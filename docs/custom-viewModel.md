# Custom viewModel

Using a custom viewModel on the component level.

See also [dependency injection](./dependency-injection.md).

#### viewModel/master.js

Create /src/scripts/viewModel/master.js and inherit the prototype from the scaffold's viewModel (to maintain expected core methods and instance of EventEmitter). You can then easily add new methods or override existing ones.

```js
/**
 *
 * @module viewModel/master
 * @description master viewModel, view layer related functionality
 * inherits methods and properties from the g5-component viewModel
 *
 */

'use strict';

const util        = require('util');
const assign      = require('lodash.assign');
const g5ViewModel = require('g5-component/viewModel');

/**
 *
 * @constructor MasterViewModel
 * @param {Object} opts shared options Object
 *
 */
function MasterViewModel(opts) {

    if (!(this instanceof MasterViewModel)) {
        return new MasterViewModel(opts);
    }

    g5ViewModel.call(this);

    this.opts = assign({
        css: 'g5-component'
    }, opts);

}

util.inherits(MasterViewModel, g5ViewModel);

module.exports = MasterViewModel;
