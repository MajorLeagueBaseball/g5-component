/**
 *
 * @module g5-component test
 * @description core test
 * @author Greg Babula
 *
 */

'use strict';

const test         = require('tape');
const g5Component  = require('../src/scripts/g5-component');
const EventEmitter = require('events').EventEmitter;

test('g5-component core test', function(t) {

    t.plan(10);

    let linescoreComponent = g5Component({
        container: null,
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    t.ok(linescoreComponent instanceof EventEmitter, 'should have instance of EventeEmitter');

    t.ok(!!linescoreComponent.model, 'should have model');
    t.ok(!!linescoreComponent.viewModel, 'should have viewModel');
    t.ok(!!linescoreComponent.eventTower, 'should have eventTower');

    t.equal(typeof linescoreComponent.opts, 'object');
    t.equal(typeof linescoreComponent.init, 'function');
    t.equal(typeof linescoreComponent.detachEvents, 'function');
    t.equal(typeof linescoreComponent.attachEvents, 'function');
    t.equal(typeof linescoreComponent.destroy, 'function');

    t.notEqual(linescoreComponent.opts.container, 'undefined');

});
