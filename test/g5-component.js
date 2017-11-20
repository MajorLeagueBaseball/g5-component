/**
 *
 * @module g5-component test
 * @author Greg Babula
 * @description core test
 *
 */

'use strict';

const assert = require('assert')
const G5Component = require('./../src/scripts/g5-component').default;
const EventEmitter = require('events').EventEmitter;

describe('g5-component core test', (t) => {

    let linescoreComponent = new G5Component({
        container: null,
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    assert(linescoreComponent instanceof EventEmitter, 'g5Component should have instance of EventEmitter');

    it('g5Component should have expected properties', () => {

        assert(!!linescoreComponent.model, 'should have model');
        assert(!!linescoreComponent.viewModel, 'should have viewModel');
        assert(!!linescoreComponent.eventTower, 'should have eventTower');

        assert.equal(typeof linescoreComponent.opts, 'object', 'should have opts object');
        assert(typeof linescoreComponent.opts.container !== 'undefined', 'should have a container');

    });

    it('g5Component should have expected methods', () => {

        assert.equal(typeof linescoreComponent.log, 'function', 'should have log method');
        assert.equal(typeof linescoreComponent.init, 'function', 'should have init method');
        assert.equal(typeof linescoreComponent.hasInstance, 'function', 'should have hasInstance method');
        assert.equal(typeof linescoreComponent.detachEvents, 'function', 'should have detachEvents method');
        assert.equal(typeof linescoreComponent.attachEvents, 'function', 'should have attachEvents method');
        assert.equal(typeof linescoreComponent.destroy, 'function', 'should have destroy method');

    });

});
