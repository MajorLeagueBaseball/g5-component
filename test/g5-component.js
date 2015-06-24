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

    t.plan(3);

    let linescoreComponent = g5Component({
        container: null,
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    t.ok(linescoreComponent instanceof EventEmitter, 'g5Component should have instance of EventeEmitter');

    t.test('g5Component should have expected properties', function(st) {

        st.ok(!!linescoreComponent.model, 'should have model');
        st.ok(!!linescoreComponent.viewModel, 'should have viewModel');
        st.ok(!!linescoreComponent.eventTower, 'should have eventTower');

        st.equal(typeof linescoreComponent.opts, 'object');
        st.notEqual(linescoreComponent.opts.container, 'undefined');

        st.end();

    });

    t.test('g5Component should have expected methods', function(st) {

        st.equal(typeof linescoreComponent.init, 'function');
        st.equal(typeof linescoreComponent.detachEvents, 'function');
        st.equal(typeof linescoreComponent.attachEvents, 'function');
        st.equal(typeof linescoreComponent.destroy, 'function');

        st.end();

    });

});
