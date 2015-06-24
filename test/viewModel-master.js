/**
 *
 * @module viewModel-master
 * @description MasterModel test
 * @author Greg Babula
 *
 */

'use strict';

const test             = require('tape');
const MasterViewModel  = require('../src/scripts/viewModel/master').MasterViewModel;
const EventEmitter     = require('events').EventEmitter;

test('viewModel-master test', function(t) {

    t.plan(4);

    let viewModel = MasterViewModel();

    t.ok(viewModel instanceof MasterViewModel, 'viewModel should have instance of MasterViewModel');
    t.ok(viewModel instanceof EventEmitter, 'viewModel should have instance of EventeEmitter');

    t.test('viewModel should have expected properties', function(st) {

        st.equal(typeof viewModel.opts, 'object');
        st.equal(typeof viewModel.opts.css, 'string');

        st.equal(typeof viewModel.instance, 'boolean');
        st.equal(typeof viewModel.active, 'boolean');
        st.equal(typeof viewModel.bound, 'boolean');

        st.end();

    });

    t.test('viewModel should have expected methods', function(st) {

        st.equal(typeof viewModel.init, 'function');
        st.equal(typeof viewModel.addClass, 'function');
        st.equal(typeof viewModel.addG5Attributes, 'function');
        st.equal(typeof viewModel.refresh, 'function');
        st.equal(typeof viewModel.bindComponent, 'function');
        st.equal(typeof viewModel.showError, 'function');
        st.equal(typeof viewModel.destroy, 'function');

        st.end();

    });

});
