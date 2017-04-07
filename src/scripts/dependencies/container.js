/**
 *
 * @module g5-component-dependency-container
 * @desc a dependency (injection) container.
 *
 * When the base G5Component initializes, it will use the implementations/dependencies
 * assigned to this container.
 *
 * An extending or custom g5Component will implement most if not all of these elements.
 * For the implementation interface needed for each of these dependencies, please (see) ...
 *
 * @see ./defaultInjector.js
 *
 * and the types that it injects. Your implementations may also elect to use those default types
 * as base classes for extension.
 *
 * You can also inject other external dependencies here for general component-level use, such as
 * moment, jQuery, etc.
 *
 */

export default {

    // MasterViewModel

    component: () => {
        return {
            /** @method init */
            /** @method addEvents */
            /** @method render */
            destroy: () => {}
        }
    },

    template: {},
    helpers: {},
    partials: {},
    extender: {},


    // G5Component

    Model: class {},
    ViewModel: class {},
    EventTower: class {},


    // EventTower

    eventGroup: () => {
        return {};
    },
    eventGroupExtender: () => {
        return {};
    }

};
