# Custom viewModel

_Using a custom viewModel on the component level._

See also [dependency injection](./dependency-injection.md) on how to inject your custom implementation.

#### viewModel/master.js

Create /src/scripts/viewModel/master.js and inherit the prototype from the scaffold's viewModel (to maintain expected core methods and instance of EventEmitter). You can then easily add new methods or override existing ones.

```js
import assign from 'lodash.assign';
import G5ViewModel from 'g5-component/src/scripts/viewModel/master';

export default MasterViewModel extends G5ViewModel {

    /**
     *
     * @param {Object} opts shared options Object
     *
     */
    constructor(opts) {

        g5ViewModel.call(this);

        this.opts = assign({
            css: 'g5-component'
        }, opts);

    }

}

```
