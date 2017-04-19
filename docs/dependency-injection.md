# Dependency Injection

###### DRAFT Apr 12 2017

On [wikipedia](https://en.wikipedia.org/wiki/Dependency_injection).

Dependency injection for a `g5-component` is not different from the standard concept.

To aid [composability](./composition.md), the `G5Component` constructor has an
optional second argument that acts as a dependency injection container.

```js
class G5Component extends EventEmitter {

    /**
     *
     * @param {Object} opts shared options Object
     * @param {Object} dependencies containing customizations for the g5 component.
     *
     */
    constructor(opts, di = dependencies) {
        // ...
    }

}
```

When a g5Component is instantiated, it makes a (shallow) copy of this container, and uses the implementations
provided therein to construct its well... _component_ parts (`Model`, `ViewModel`, `EventTower`, `component`, event & data extenders etc...)

__Its basic structure is as follows, in which *each member is required*:__

```js
export default {

    /**
     *
     * Used by ViewModel (which itself can also be provided)
     *
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
     *
     * Used by G5Component
     *
     */
    Model: class {},
    ViewModel: class {},
    EventTower: class {},

    /**
     *
     * Used by EventTower
     *
     */
    eventGroup: () => {
        return {};
    },
    eventGroupExtender: () => {
        return {};
    }

};
```

### There are 4 types or levels of implementation for each member of the dependency container above.

##### (1) Stub

As shown above, only a minimal stub object or empty class is provided to conform to the expected type of the member.

That functionality will then be
largely absent from the resulting component. You can for example elect to use the stub implementations if your component
is a (composition) sub-component that has little inherent functionality.

For example, a minor view sub-component can only implement the template member.

```js
import G5Component from 'g5-component';
import { inject as stub } from 'g5-component/src/scripts/dependencies/stubInjector';

class StubComponent extends G5Component {

    constructor(opts) {

        const implementation = {};

        super(opts, stub(implementation));

    ]

}

export default function factory() {
    return new StubComponent(opts, container);
}
```

##### (2) Base

The `g5-component` module contains base implementations of all the required members.
The module also provides a default implementation injector which adds all base implementations.

```js
import G5Component from 'g5-component';
import { inject as base } from 'g5-component/src/scripts/dependencies/defaultInjector';

class DefaultComponent extends G5Component {

    constructor(opts) {

        const implementation = {};

        super(opts, base(implementation));

    ]

}

export default function factory() {
    return new DefaultComponent(opts, container);
}
```

##### (2a) Light

There is a variation of the base injector which excludes Handlebars for a lighter bundle.

```js
import G5Component from 'g5-component';
import { inject as light } from 'g5-component/src/scripts/dependencies/lightInjector';

class LightComponent extends G5Component {

    constructor(opts) {

        const implementation = {};

        super(opts, light(implementation));

    ]

}

export default function factory() {
    return new LightComponent(opts, container);
}
```

##### (3) Extension

You can also extend any of the base implementations.

```js
import G5Component from 'g5-component/src/scripts/g5-component';
import { inject } from 'g5-component/src/scripts/dependencies/defaultInjector';
import G5BaseModel from 'g5-component/src/scripts/model/master';

class ExtensionComponent extends G5Component {

    constructor(opts) {

        const implementation = inject({});

        implementation.Model = class extends G5BaseModel {

            // ... usually done in a different file, shown here inline for simplicity.

        };

        super(opts, implementation);

    }

}
```

##### (4) Custom

To take full control, you will need to fully implement the interface of the base types by
reviewing the G5 source code. In this case, to prevent bundle bloat, you can individually import the base
implementations that you are not overriding in order to have all members present in the dependency container.

```js
import G5Component from 'g5-component/src/scripts/g5-component';
import { inject as stub } from 'g5-component/src/scripts/dependencies/stubInjector';
import ViewModel from 'g5-component/src/scripts/viewModel/master';
import EventTower from 'g5-component/src/scripts/events/master';

class FullyCustomizedModelComponent extends G5Component {

    constructor(opts) {

        const implementation = inject({});

        implementation.Model = class { // does not extend base G5Model

            // ... usually done in a different file, shown here inline for simplicity.

        };

        implementation.ViewModel = ViewModel;
        implementation.EventTower = EventTower;

        // ...

        super(opts, implementation);

    }

}
```
