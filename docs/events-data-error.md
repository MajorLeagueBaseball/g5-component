# Data-Error

Event emitted on error

---

#### Event / Listen

> Events must be attached before the component is instantiated

```js
exampleComponent.on('data-error', (err) => {
    // console.log('component model data error', err);
});
```

#### Notes

* Event is thrown if data cannot be reached (i.e. status code `>= 400`) or if returned `json` has a syntax error.
