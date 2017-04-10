/**
 *
 * @module events/master
 * @author Greg Babula [greg.babula@mlb.com]
 * @desc event communication hub, mediates events between master, model, and viewModel
 *
 */

import utils from './../utils/master';
import { EventEmitter } from 'events';
import dependencies from './../dependencies/container';

/**
 *
 * @function detachEvents
 * @param {Object} target
 * @desc removes events if target is an EventEmitter.
 *
 */
function detachEvents(target) {

    if (target instanceof EventEmitter) {
        target.removeAllListeners();
    }

}

/**
 *
 * @class EventTower
 * @desc mediates events between master, model and viewModel
 *
 */
class EventTower {

    /**
     *
     * @param {Object} master
     *
     */
    constructor(master) {

        this.master = master;
        this.model = master && master.model || {};
        this.viewModel = master && master.viewModel || {};

        //
        // ensure all targets have an instance of
        // EventEmitter before proceeding to attach events
        //
        if ([this.master, this.model, this.viewModel].filter((item) => {
                return item instanceof EventEmitter;
            }).length >= 3) {

            //
            // attach events to a single instnace
            //
            if (!this.master.hasInstance()) {
                this.attachEvents();
            }

        } else {

            if (this.master) {
                throw Error('EventEmitter is required on all main Constructors');
            }

        }

    }

    /**
     *
     * @method attachEvents
     * @desc core attachEvents method, attaches core and extender events
     * @returns {Object} this
     *
     */
    attachEvents() {

        const { master, model, viewModel } = this;

        utils.log('attach events');

        dependencies.eventGroup(master, model, viewModel);
        dependencies.eventGroupExtender(master, model, viewModel);

        return this;

    }

    /**
     *
     * @method detachEvents
     * @desc detaches all events
     * @returns {Object} this
     *
     */
    detachEvents() {

        const eventGroup = [this.master, this.model, this.viewModel];

        utils.log('detach events');

        eventGroup.forEach(detachEvents);

        return this;

    }

}

export default EventTower;
