/**
 *
 * @module model-master
 * @description MasterModel test
 * @author Greg Babula
 *
 */

'use strict';

const test          = require('tape');
const MasterModel   = require('../src/scripts/model/master').MasterModel;
const EventEmitter  = require('events').EventEmitter;

test('model-master test', function(t) {

    t.plan(10);

    let model = MasterModel();

    t.ok(model instanceof MasterModel, 'should have instance of MasterModel');
    t.ok(model instanceof EventEmitter, 'should have instance of EventEmitter');

    t.equal(typeof model.opts, 'object');
    t.equal(typeof model.dataCache, 'object');
    t.equal(typeof model.dataFetch, 'object');
    t.equal(typeof model.instance, 'boolean');

    t.equal(typeof model.init, 'function');
    t.equal(typeof model.fetch, 'function');
    t.equal(typeof model.start, 'function');
    t.equal(typeof model.stop, 'function');

});
