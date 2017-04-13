/**
 *
 * @module container
 * @desc dependency (injection) container.
 *
 * When the base G5Component initializes, it will use the implementations/dependencies
 * assigned to this container unless explicitly provided a different dependency container.
 *
 * By default this container contains only stubs.
 *
 * An extending or custom G5Component will implement most if not all of these elements in a new container,
 * either by extending the baseline implementations within the g5-component module, or independently.
 *
 * You can also inject other external dependencies here for general component-level use, such as
 * moment, jQuery, Handlebars, etc.
 *
 */

export const stub = {

    /**
     *
     * MasterViewModel
     *
     */
    component: () => {
        return {
            init: () => {},
            destroy: () => {}
        }
    },
    template: {},
    helpers: {},
    partials: {},
    extender: (data) => data,

    /**
     *
     * G5Component
     *
     */
    Model: class {},
    ViewModel: class {},
    EventTower: class {},

    /**
     *
     * EventTower
     *
     */
    eventGroup: () => {
        return {};
    },
    eventGroupExtender: () => {
        return {};
    }

};

export default (() => {

    const defaultDependencyContainer = {};

    for (const key in stub) {
        defaultDependencyContainer[key] = stub[key];
    }

    return defaultDependencyContainer;

})();
