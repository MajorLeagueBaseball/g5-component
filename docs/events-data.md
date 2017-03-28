# Data

Event emitted after a successful data fetch

---

#### Event / Listen

> Events must be attached before the component is instantiated

```js
exampleComponent.on('data', (data) => {
    // console.log('component data from model', data);
});
```

#### Notes

* Event is only emitted if the current data set does not match the previous data set
* `synthetic-data` event will also trigger a `data` event
