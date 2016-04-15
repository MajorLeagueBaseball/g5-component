#Start

Restart or resume polling at any time using the `start` event.

---

#### Trigger Event

> Events can be triggered after the component has been instantaited

```js
//
// resumes data polling on component
// event is ignored if already polling data
//
linescoreComponent.emit('start');
```
