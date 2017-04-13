/**
 *
 * @module defaultInjector
 * @desc This injector assigns the baseline G5Component implementations into a container,
 * along with the handlebars runtime.
 *
 * This is suitable for most components as a starting point, with most customization being applied to the
 * component group (component, template, helpers, partials, extender).
 *
 */

import component from './../component/master';
import template from './../../template/component.html';
import helpers from './../component/helpers';
import partials from './../component/partials';
import extender from './../component/extender';

import Model from './../model/master';
import ViewModel from './../viewModel/master';
import EventTower from './../events/master';

import eventGroup from './../events/group/group';
import eventGroupExtender from './../events/group/extender';

import Handlebars from 'hbsfy/runtime';

/**
 *
 * @param {object} container
 * @returns {object}
 *
 */
export function inject(container) {

    container.component = component;
    container.template = template;
    container.helpers = helpers;
    container.partials = partials;
    container.extender = extender;

    container.Model = Model;
    container.ViewModel = ViewModel;
    container.EventTower = EventTower;

    container.eventGroup = eventGroup;
    container.eventGroupExtender = eventGroupExtender;

    container.Handlebars = Handlebars;

    return container;

}

export default {

    component,
    template,
    helpers,
    partials,
    extender,

    Model,
    ViewModel,
    EventTower,

    eventGroup,
    eventGroupExtender,

    Handlebars

};
