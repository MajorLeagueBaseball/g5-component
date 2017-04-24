/**
 *
 * @module lightInjector
 * @desc this variation injects the G5Component baseline M/VM/Events implementation, but without Handlebars.
 *
 */

import component from './../component/master';

import Model from './../model/master';
import ViewModel from './../viewModel/master';
import EventTower from './../events/master';

import eventGroup from './../events/group/group';

/**
 *
 * @function inject
 * @param {object} container
 * @returns {object}
 *
 */
export function inject(container) {

    container.component = component;
    container.template = () => '';
    container.helpers = {};
    container.partials = {};
    container.extender = data => data;

    container.Model = Model;
    container.ViewModel = ViewModel;
    container.EventTower = EventTower;

    container.eventGroup = eventGroup;
    container.eventGroupExtender = () => {};

    return container;

}
