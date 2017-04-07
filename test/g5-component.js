/**
 *
 * @module g5-component test
 * @author Greg Babula
 * @description core test
 *
 */

'use strict';

const test = require('tape');
const g5Component = require('./../src/scripts/g5-component').default;
const EventEmitter = require('events').EventEmitter;

test('g5-component core test', (t) => {

    t.plan(3);

    let linescoreComponent = g5Component({
        container: null,
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    t.ok(linescoreComponent instanceof EventEmitter, 'g5Component should have instance of EventEmitter');

    t.test('g5Component should have expected properties', (st) => {

        st.ok(!!linescoreComponent.model, 'should have model');
        st.ok(!!linescoreComponent.viewModel, 'should have viewModel');
        st.ok(!!linescoreComponent.eventTower, 'should have eventTower');

        st.equal(typeof linescoreComponent.opts, 'object', 'should have opts object');
        st.notEqual(linescoreComponent.opts.container, 'undefined', 'should have a container');

        st.end();

    });

    t.test('g5Component should have expected methods', (st) => {

        st.equal(typeof linescoreComponent.init, 'function', 'should have init method');
        st.equal(typeof linescoreComponent.hasInstance, 'function', 'should have hasInstance method');
        st.equal(typeof linescoreComponent.detachEvents, 'function', 'should have detachEvents method');
        st.equal(typeof linescoreComponent.attachEvents, 'function', 'should have attachEvents method');
        st.equal(typeof linescoreComponent.destroy, 'function', 'should have destroy method');

        st.end();

    });

});
