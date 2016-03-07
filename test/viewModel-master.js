/**
 *
 * @module viewModel-master
 * @author Greg Babula
 * @description MasterViewModel test
 *
 */

'use strict';

const test = require('tape');
const MasterViewModel = require('./../src/scripts/viewModel/master');
const EventEmitter = require('events').EventEmitter;

test('viewModel-master test', (t) => {

    t.plan(6);

    let viewModel = MasterViewModel();

    viewModel.container = {};
    viewModel.component.destroy = () => {};

    t.ok(viewModel instanceof MasterViewModel, 'viewModel should have instance of MasterViewModel');
    t.ok(viewModel instanceof EventEmitter, 'viewModel should have instance of EventEmitter');

    t.test('viewModel should have expected properties', (st) => {

        st.equal(typeof viewModel.opts, 'object', 'should have opts object');
        st.equal(typeof viewModel.opts.css, 'string', 'should have css property in opts object');

        st.equal(typeof viewModel.instance, 'boolean', 'should have instance property');
        st.equal(typeof viewModel.active, 'boolean', 'should have active property');
        st.equal(typeof viewModel.bound, 'boolean', 'should have bound property');
        st.equal(typeof viewModel.helpers, 'object', 'should have component helpers');
        st.equal(typeof viewModel.partials, 'object', 'should have component partials');

        st.ok(!!viewModel.component, 'should have component master');
        st.ok(!!viewModel.template, 'should have component template');
        st.ok(!!viewModel.extender, 'should have component extender');

        st.end();

    });

    t.test('viewModel should have expected methods', (st) => {

        st.equal(typeof viewModel.init, 'function', 'should have init method');
        st.equal(typeof viewModel.addClass, 'function', 'should have addClass method');
        st.equal(typeof viewModel.addG5Attributes, 'function', 'should have addG5Attributes method');
        st.equal(typeof viewModel.registerHelpers, 'function', 'should have registerHelpers method');
        st.equal(typeof viewModel.registerPartials, 'function', 'should have registerPartials method');
        st.equal(typeof viewModel.bindComponent, 'function', 'should have bindComponent method');
        st.equal(typeof viewModel.onDataError, 'function', 'should have onDataError method');
        st.equal(typeof viewModel.hasInstance, 'function', 'should have hasInstance method');
        st.equal(typeof viewModel.destroy, 'function', 'should have destroy method');

        st.end();

    });

    t.test('viewModel should have events', (st) => {

        st.ok(viewModel._events, 'viewModel should have events Object');

        st.end();

    });

    t.test('destroy should invalidate instance', (st) => {

        viewModel.destroy();

        st.notOk(viewModel.instance, 'instance should not exist after destroy');
        st.notOk(viewModel.active, 'instance should not be active');
        st.notOk(viewModel.bound, 'instance should not be bound');

        st.notOk(viewModel.container, 'container should be destroyed');
        st.notOk(viewModel.component, 'component master should not exist');
        st.notOk(viewModel.template, 'component template should not exist');
        st.notOk(viewModel.helpers, 'component helpers should not exist');
        st.notOk(viewModel.partials, 'component partials should not exist');
        st.notOk(viewModel.extender, 'component extender should not exist');

        st.end();

    });

});
