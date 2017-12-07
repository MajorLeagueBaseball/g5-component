/**
 *
 * @module events-master
 * @author Greg Babula
 * @description EventTower test
 *
 */

'use strict';

const assert = require('assert');
const EventTower = require('./../src/scripts/events/master').default;
const EventEmitter = require('events').EventEmitter;
const assign = require('./../src/scripts/utils/nodash').assign;

describe('events-master test', () => {

    let eventTower = new EventTower(assign(new EventEmitter, {
        hasInstance: () => true,
        model: new EventEmitter,
        viewModel: new EventEmitter,
    }));

    assert(eventTower instanceof EventTower, 'eventTower should have instance of EventTower');

    it('eventTower should have expected properties', () => {

        assert.equal(typeof eventTower.model, 'object', 'should have model reference');
        assert.equal(typeof eventTower.viewModel, 'object', 'should have viewModel reference');

    });

    it('eventTower should have expected methods', () => {

        assert.equal(typeof eventTower.attachEvents, 'function', 'should have attachEvents method');
        assert.equal(typeof eventTower.detachEvents, 'function', 'should have detachEvents method');

    });

});
