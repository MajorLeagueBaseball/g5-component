/**
 *
 * @module model-master
 * @author Greg Babula
 * @description MasterModel test
 *
 */

'use strict';

const test          = require('tape');
const MasterModel   = require('./../src/scripts/model/master');
const EventEmitter  = require('events').EventEmitter;

test('model-master test', function(t) {

    t.plan(7);

    let model = MasterModel({
        path: '/src/data/linescore.json'
    });

    t.ok(model instanceof MasterModel, 'model should have instance of MasterModel');
    t.ok(model instanceof EventEmitter, 'model should have instance of EventEmitter');

    t.test('model should have expected properties', function(st) {

        st.equal(typeof model.opts, 'object', 'should have opts object');
        st.equal(typeof model.opts.enablePolling, 'boolean', 'should have enablePolling property in opts object');
        st.equal(typeof model.dataCache, 'object', 'should have dataCache property');
        st.equal(typeof model.dataFetch, 'object', 'should have dataFetch property');
        st.equal(typeof model.instance, 'boolean', 'should have instance property');

        st.ok(!!model.extender, 'model extender should be defined');

        st.end();

    });

    t.test('model should have expected methods', function(st) {

        st.equal(typeof model.init, 'function', 'should have init method');
        st.equal(typeof model.fetch, 'function', 'should have fetch method');
        st.equal(typeof model.start, 'function', 'should have start method');
        st.equal(typeof model.stop, 'function', 'should have stop method');
        st.equal(typeof model.destroy, 'function', 'should have destroy method');

        st.end();

    });

    t.test('model should have events', function(st) {

        st.ok(model._events, 'model should have events Object');

        st.end();

    });

    t.test('init should create instance and poll data', function(st) {

        model.init();

        st.ok(model.instance === true, 'model instance should exist after init');

        st.end();

    });

    t.test('destroy should invalidate instance', function(st) {

        model.destroy();

        st.ok(model.instance === false, 'model instance should not exist after destroy');
        st.notOk(model.dataFetch, 'model dataFetch should not be defined after destroy');

        st.end();

    });

});
