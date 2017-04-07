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

import container from './container';

/**
 *
 * This is the default dependency arrangement of G5Component.
 * You can provide overrides by assigning them into the dependency injection container,
 * as demonstrated in this function.
 *
 * @module defaultInjector
 *
 */
export default function () {

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
