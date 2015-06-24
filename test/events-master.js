/**
 *
 * @module events-master
 * @description EventTower test
 * @author Greg Babula
 *
 */

'use strict';

const test          = require('tape');
const EventTower    = require('../src/scripts/events/master').EventTower;

test('events-master test', function(t) {

    t.plan(3);

    let eventTower = EventTower();

    t.ok(eventTower instanceof EventTower, 'eventTower should have instance of EventTower');

    t.test('eventTower should have expected properties', function(st) {

        st.equal(typeof eventTower.model, 'object');
        st.equal(typeof eventTower.viewModel, 'object');

        st.end();

    });

    t.test('eventTower should have expected methods', function(st) {

        st.equal(typeof eventTower.attachEvents, 'function');
        st.equal(typeof eventTower.detachEvents, 'function');

        st.end();

    });

});
