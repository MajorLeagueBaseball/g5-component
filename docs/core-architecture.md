# Core Architecture

The `component`, `model`, and `viewModel` all receive an instance of the [`EventEmitter`](https://nodejs.org/api/events.html).

The layers __never communicate directly__ with each other, instead, an  `EventTower` mediates events between layers.

---

![Flow Diagram](http://i.imgur.com/H2nELRM.png)

---

__[G5Component](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/g5-component.js)__ - Overall container holding the `model`, `viewModel`, and event layers.

__[Model](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/model/master.js)__ - Fetches data and passes it along to the component extender.

__[Component Extender](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/extender.js)__ - Module used for transforming data after it's received from the model.

__[ViewModel](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/viewModel/master.js)__ - Bootstraps view and component, contains logic only related to the view.

__[Component](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/component/master.js)__ - Entry point for all custom functionality.

__[EventTower](https://github.com/MajorLeagueBaseball/g5-component/blob/master/src/scripts/events/master.js)__ - mediates events between layers.
