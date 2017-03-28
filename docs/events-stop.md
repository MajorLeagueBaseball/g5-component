# Stop

Stop polling at any time using the `stop` event.

---

#### Event / Listen

> Events must be attached before the component is instantiated

```js
exampleComponent.on('stop', () => {
    // console.log('component stop fetch');
});
```

#### Trigger Event

> Events can be triggered after the component has been instantaited

```js
//
// stops data polling on component
// event is ignored if data polling is already stopped
//
exampleComponent.emit('stop');
```
