/**
 *
 * @module defaultInjector
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

/**
 *
 * This is the default dependency arrangement of G5Component used standalone.
 *
 * You can provide overrides by assigning them into the G5 dependency injection container,
 * as demonstrated in this function.
 *
 * These types are open for extension by your overrides.
 *
 * @param {object} container
 *
 */
export default function (container) {

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

};
