# Architecture

---

:warning: Documentation in need of review

---

The component, model, and viewModel all receive an instance of the [EventEmitter](https://nodejs.org/api/events.html).

The layers never communicate directly with each other, instead, an event tower mediates events between layers.

---

![Flow Diagram](http://i.imgur.com/H2nELRM.png)

---

__[Component](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/g5-component.js)__ - contains an internal reference of the model, viewModel, and event layer

__[Model](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/model/master.js)__ - fetches data and passes it along to the component extender

__[Component Extender](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/extender.js)__ - module used for transforming data after it's received from the model

__[viewModel](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/viewModel/master.js)__ - bootstraps view and component, contains logic only related to the view

__[Component Master](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/master.js)__ - entry point for all component specific functionality

__[eventTower](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/events/master.js)__ - mediates events between layers
