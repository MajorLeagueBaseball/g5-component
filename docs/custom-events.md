# Custom Events

Extending the core events with additional custom events

See also [dependency injection](./dependency-injection.md).

#### eventGroupExtender

```js
import g5Component from 'g5-component';
import { inject } from 'g5-component/dependencies/defaultInjector';

const container = {};

inject(container); // add base implementations.

/**
 *
 * @function eventGroup
 * @param {Object} master
 * @param {Object} model
 * @param {Object} viewModel
 *
 */
container.eventGroup = function eventGroup(master={}, model={}, viewModel={}) {

    //
    // custom events
    //

}

export default function createG5Component() {
    return new g5Component(opts, container);
}
```