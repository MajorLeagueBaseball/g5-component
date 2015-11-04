#Synthetic Data

Passing in data via a `synthetic-data` event.

#### Instantiation

> Set the enableFetch option to false to prevent the component from doing the initial data fetch

```js
let exampleComponent = g5Component({
    container: document.querySelector('.g5-component--linescore'),
    css: 'g5-component--linescore-initiated',
    enableFetch: false
});

exampleComponent.init();
```

### Trigger Event

> Events can be triggered after the component has been instantaited

```js
//
// data must be an Object and will be passed to the viewModel 
// where it will be extended via the component extender
//
exampleComponent.emit('synthetic-data', data);
```
