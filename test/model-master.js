/**
 *
 * @module model-master
 * @author Greg Babula
 * @description MasterModel test
 *
 */

'use strict';

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const assert = require('assert');
const MasterModel = require('./../src/scripts/model/master').default;
const EventEmitter = require('events').EventEmitter;

describe('model-master test', (t) => {

    let model = new MasterModel({
        path: '/src/data/linescore.json'
    });

    assert(model instanceof MasterModel, 'should have instance of MasterModel');
    assert(model instanceof EventEmitter, 'should have instance of EventEmitter');

    it('model should have expected properties', () => {

        assert.equal(typeof model.opts, 'object', 'should have opts object');
        assert.equal(typeof model.opts.interval, 'number', 'should have interval option');
        assert.equal(typeof model.opts.enablePolling, 'boolean', 'should have enablePolling option');
        assert.equal(typeof model.opts.enableFetch, 'boolean', 'should have enableFetch option');
        assert.equal(typeof model.opts.path, 'string', 'should have path option');
        assert.equal(typeof model.dataCache, 'object', 'should have dataCache property');
        assert.equal(typeof model.dataFetch, 'object', 'should have dataFetch property');
        assert.equal(typeof model.instance, 'boolean', 'should have instance property');

    });

    it('model should have expected methods', () => {

        assert.equal(typeof model.log, 'function', 'should have log method');
        assert.equal(typeof model.init, 'function', 'should have init method');
        assert.equal(typeof model.fetch, 'function', 'should have fetch method');
        assert.equal(typeof model.start, 'function', 'should have start method');
        assert.equal(typeof model.stop, 'function', 'should have stop method');
        assert.equal(typeof model.destroy, 'function', 'should have destroy method');

    });

    it('model should have events', () => {

        assert(model._events, 'model should have events Object');

    });

    it('init should create instance', () => {

        model.init();

        assert(model.instance === true, 'model instance should exist after init');

    });

    it('destroy should invalidate instance', () => {

        model.destroy();

        assert(model.instance === false, 'model instance should not exist after destroy');
        assert(!model.dataFetch, 'model dataFetch should not be defined after destroy');

    });

});
