#Start

Restart or resume polling at any time using the `start` event.

---

#### Event / Listen

> Events must be attached before the component is instantiated

```js
exampleComponent.on('start', () => {
    // console.log('component start fetch');
});
```

#### Trigger Event

> Events can be triggered after the component has been instantaited

```js
//
// resumes data polling on component
// event is ignored if already polling data
//
exampleComponent.emit('start');
```
