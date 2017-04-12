# Dependency Injection

###### DRAFT Apr 12 2017

On [wikipedia](https://en.wikipedia.org/wiki/Dependency_injection).

DI for the g5-component is not different from the standard concept.

To aid [composability](./composition.md), the `G5Component` constructor has an optional second argument that acts as a dependency
injection container.

```js

class G5Component extends EventEmitter {

    /**
     *
     * @param {Object} opts shared options Object
     * @param {Object} dependencies containing customizations for the g5 component.
     *
     */
    constructor(opts, di = dependencies) {  // <-- this guy.
...
```

When a g5Component is instantiated, it makes a (shallow) copy of this container, and uses the implementations
provided therein to construct its well... _component_ parts (Model, ViewModel, EventTower, `component`, event & data extenders etc.)

Its basic structure is as follows, in which *each member is required*:

```js
export default {

    /**
     * Used by ViewModel (which itself can also be provided)
     */
    component: () => {
        return {
            /** @method init */
            /** @method addEvents */
            /** @method render */
            destroy: () => {}
        }
    },
    template: {},
    helpers: {},
    partials: {},
    extender: {},

    /**
     * Used by G5Component
     */
    Model: class {},
    ViewModel: class {},
    EventTower: class {},

    /**
     * Used by EventTower
     */
    eventGroup: () => {
        return {};
    },
    eventGroupExtender: () => {
        return {};
    }

};
```

### There are 4 types of usage for each member of the DI container.

##### (1) Stub

As shown above, only a minimal stub object or empty class is provided. That functionality will then be
largely absent from the resulting component. You can for example elect to use the stub implementations if your component
is a composition sub-component that has little inherent functionality.

For example, a minor view sub-component can only implement the template member.

##### (2) Base

The `g5-component` module contains base implementations of all the required members. The module also provides a
default implementation injector which adds all base implementations.

```js
import g5Component from 'g5-component';
import { inject } from 'g5-component/dependencies/defaultInjector';

const container = {};

inject(container); // container receives base implementations of all required elements.

export default function createG5ComponentBaseImplementation() {
    return new g5Component(opts, container);
}
```

##### (3) Extension

You can also extend any of the base implementations.

```js
import g5Component from 'g5-component';
import { inject } from 'g5-component/dependencies/defaultInjector';

const container = {};

inject(container);

container.Model = class YourCustomModel extends container.Model {
    /* ... */
}

export default function createG5ComponentExtensionImplementation() {
    return new g5Component(opts, container);
}
```

4. *Custom*. To take full control, you will need to fully implement the interface of the base types by
reviewing the g5 source code. In this case, to prevent bundle bloat, you can individually import the base
implementations that you are not overriding in order to have all members present in the dependency container.

```js
import g5Component from 'g5-component';

// use base implementations for those you are not customizing.
import ViewModel from 'g5-component/src/scripts/viewModel/master';
import EventTower from 'g5-component/src/scripts/events/master';
// etc.

const container = {
    ...
    Model: class {
        /* ... custom implementation that matches the base interface */
    },
    ViewModel,
    EventTower
    ...
};

export default function createG5ComponentCustomImplementation() {
    return new g5Component(opts, container);
}
```
