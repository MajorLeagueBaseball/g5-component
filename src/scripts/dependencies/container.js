/**
 *
 * @module g5-component-dependencies
 * @desc a dependency injection container.
 *
 */

export default {

    // MasterViewModel

    component: () => {
        return {
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
