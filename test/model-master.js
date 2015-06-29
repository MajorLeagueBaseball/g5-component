/**
 *
 * @module model-master
 * @description MasterModel test
 * @author Greg Babula
 *
 */

'use strict';

const _             = require('lodash');
const test          = require('tape');
const MasterModel   = require('./../src/scripts/model/master').MasterModel;
const EventEmitter  = require('events').EventEmitter;

test('model-master test', function(t) {

    t.plan(6);

    let model = MasterModel({
        path: '/src/data/linescore.json'
    });

    t.ok(model instanceof MasterModel, 'model should have instance of MasterModel');
    t.ok(model instanceof EventEmitter, 'model should have instance of EventEmitter');

    t.test('model should have expected properties', function(st) {

        st.equal(typeof model.opts, 'object');
        st.equal(typeof model.opts.enablePolling, 'boolean');
        st.equal(typeof model.dataCache, 'object');
        st.equal(typeof model.dataFetch, 'object');
        st.equal(typeof model.instance, 'boolean');

        st.end();

    });

    t.test('model should have expected methods', function(st) {

        st.equal(typeof model.init, 'function');
        st.equal(typeof model.fetch, 'function');
        st.equal(typeof model.start, 'function');
        st.equal(typeof model.stop, 'function');
        st.equal(typeof model.destroy, 'function');

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
