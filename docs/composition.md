# Composition

###### DRAFT Apr 12 2017

Living in the browser `document` requires following the tree structure of HTML.

To allow this, components should have a quality known as [composability](https://en.wikipedia.org/wiki/Composability).

Briefly speaking, for our HTML front end context this means that components should be able to hold any number of other components,
and have at most one parent component (basic tree structure).

Furthermore, we aim to provide composability without the need to create multiple repositories or node modules.

#### Example

First `npm run build` and then `npm run build-examples` and `npm run serve`.

The example is visible at `localhost:9966/example/composition.html`.

Source code at [example/src/composision](./../example/src/composition).
