#Custom viewModel

Using a custom viewModel on the component level.

#### package.json

In package.json on the component level, set browser.viewModel to false, add a reference to the scaffold's viewModel, and add your custom viewModel reference to aliasify.

```json
"browser": {
  "viewModel": false,
  "g5-component/viewModel": "./node_modules/g5-component/src/scripts/viewModel/master.js"
},
"aliasify": {
  "aliases": {
    "viewModel": "./src/scripts/viewModel/master.js"
  }
}
```

What's going on here? You're telling Browserify that you don't want to load the scaffolds viewModel by setting it to false. You then add the viewModel property to aliasify with the path to your custom viewModel. The browser reference to g5-component/viewModel is set so that we can easily reference it in our custom viewModel.

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

}

util.inherits(MasterViewModel, g5ViewModel);


module.exports = MasterViewModel;
