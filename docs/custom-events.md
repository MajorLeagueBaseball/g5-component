#Custom Events

Extending the core events with additional custom events

#### package.json

In `package.json` on the component level, set browser.eventGroupExtender to false, and add your custom eventGroupExtender reference to aliasify. For simplicity, try to maintain the same directory structure as the scaffold.

```json
"browser": {
  "eventGroupExtender": false
},
"aliasify": {
  "aliases": {
    "eventGroupExtener": "./src/scripts/events/group/extener.js"
  }
}
```

#### eventGroupExtender

```js
/**
 *
 * @module events/group/extender
 * @description extended/custom events
 *
 */

'use strict';

/**
 *
 * @function eventGroup
 * @param {Object} master
 * @param {Object} model
 * @param {Object} viewModel
 *
 */
function eventGroup(master={}, model={}, viewModel={}) {

    //
    // custom events
    //

}

module.exports = eventGroup;
```
