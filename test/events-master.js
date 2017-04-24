/**
 *
 * @module events-master
 * @author Greg Babula
 * @description EventTower test
 *
 */

'use strict';

const test = require('tape');
const EventTower = require('./../src/scripts/events/master').default;
const EventEmitter = require('events').EventEmitter;
const assign = require('./../src/scripts/utils/nodash').assign;

test('events-master test', (t) => {

    t.plan(3);

    let eventTower = new EventTower(assign(new EventEmitter, {
        hasInstance: () => true,
        model: new EventEmitter,
        viewModel: new EventEmitter,
    }));

    t.ok(eventTower instanceof EventTower, 'eventTower should have instance of EventTower');

    t.test('eventTower should have expected properties', (st) => {

        st.equal(typeof eventTower.model, 'object', 'should have model reference');
        st.equal(typeof eventTower.viewModel, 'object', 'should have viewModel reference');

        st.end();

    });

    t.test('eventTower should have expected methods', (st) => {

        st.equal(typeof eventTower.attachEvents, 'function', 'should have attachEvents method');
        st.equal(typeof eventTower.detachEvents, 'function', 'should have detachEvents method');

        st.end();

    });

});
