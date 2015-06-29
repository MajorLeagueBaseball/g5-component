/**
 *
 * @module viewModel-master
 * @description MasterModel test
 * @author Greg Babula
 *
 */

'use strict';

const test             = require('tape');
const MasterViewModel  = require('./../src/scripts/viewModel/master').MasterViewModel;
const EventEmitter     = require('events').EventEmitter;

test('viewModel-master test', function(t) {

    t.plan(4);

    let viewModel = MasterViewModel();

    t.ok(viewModel instanceof MasterViewModel, 'viewModel should have instance of MasterViewModel');
    t.ok(viewModel instanceof EventEmitter, 'viewModel should have instance of EventeEmitter');

    t.test('viewModel should have expected properties', function(st) {

        st.equal(typeof viewModel.opts, 'object', 'should have opts object');
        st.equal(typeof viewModel.opts.css, 'string', 'should have css property in opts object');

        st.equal(typeof viewModel.instance, 'boolean', 'should have instance property');
        st.equal(typeof viewModel.active, 'boolean', 'should have active property');
        st.equal(typeof viewModel.bound, 'boolean', 'should have bound property');

        st.end();

    });

    t.test('viewModel should have expected methods', function(st) {

        st.equal(typeof viewModel.init, 'function', 'should have init method');
        st.equal(typeof viewModel.addClass, 'function', 'should have addClass method');
        st.equal(typeof viewModel.addG5Attributes, 'function', 'should have addG5Attributes method');
        st.equal(typeof viewModel.refresh, 'function', 'should have refresh method');
        st.equal(typeof viewModel.bindComponent, 'function', 'should have bindComponent method');
        st.equal(typeof viewModel.showError, 'function', 'should have showError method');
        st.equal(typeof viewModel.destroy, 'function', 'should have destroy method');

        st.end();

    });

});
