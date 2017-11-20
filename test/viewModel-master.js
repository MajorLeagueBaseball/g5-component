/**
 *
 * @module viewModel-master
 * @author Greg Babula
 * @description MasterViewModel test
 *
 */

'use strict';

const assert = require('assert');
const MasterViewModel = require('./../src/scripts/viewModel/master').default;
const EventEmitter = require('events').EventEmitter;

describe('viewModel-master test', () => {

    let viewModel = new MasterViewModel();

    viewModel.container = {};
    viewModel.component.destroy = () => {};

    assert(viewModel instanceof MasterViewModel, 'viewModel should have instance of MasterViewModel');
    assert(viewModel instanceof EventEmitter, 'viewModel should have instance of EventEmitter');

    it('viewModel should have expected properties', () => {

        assert.equal(typeof viewModel.opts, 'object', 'should have opts object');
        assert.equal(typeof viewModel.opts.css, 'string', 'should have css property in opts object');

        assert.equal(typeof viewModel.instance, 'boolean', 'should have instance property');
        assert.equal(typeof viewModel.active, 'boolean', 'should have active property');
        assert.equal(typeof viewModel.bound, 'boolean', 'should have bound property');
        assert.equal(typeof viewModel.helpers, 'object', 'should have component helpers');
        assert.equal(typeof viewModel.partials, 'object', 'should have component partials');

        assert(!!viewModel.component, 'should have component master');
        assert(!!viewModel.template, 'should have component template');
        assert(!!viewModel.extender, 'should have component extender');

    });

    it('viewModel should have expected methods', () => {

        assert.equal(typeof viewModel.log, 'function', 'should have log method');
        assert.equal(typeof viewModel.init, 'function', 'should have init method');
        assert.equal(typeof viewModel.addClass, 'function', 'should have addClass method');
        assert.equal(typeof viewModel.addG5Attributes, 'function', 'should have addG5Attributes method');
        assert.equal(typeof viewModel.registerHelpers, 'function', 'should have registerHelpers method');
        assert.equal(typeof viewModel.registerPartials, 'function', 'should have registerPartials method');
        assert.equal(typeof viewModel.bindComponent, 'function', 'should have bindComponent method');
        assert.equal(typeof viewModel.onDataError, 'function', 'should have onDataError method');
        assert.equal(typeof viewModel.hasInstance, 'function', 'should have hasInstance method');
        assert.equal(typeof viewModel.destroy, 'function', 'should have destroy method');

    });

    it('viewModel should have events', () => {

        assert(viewModel._events, 'viewModel should have events Object');

    });

    it('destroy should invalidate instance', () => {

        viewModel.destroy();

        assert(!viewModel.instance, 'instance should not exist after destroy');
        assert(!viewModel.active, 'instance should not be active');
        assert(!viewModel.bound, 'instance should not be bound');

        assert(!viewModel.container, 'container should be destroyed');
        assert(!viewModel.component, 'component master should not exist');
        assert(!viewModel.template, 'component template should not exist');
        assert(!viewModel.helpers, 'component helpers should not exist');
        assert(!viewModel.partials, 'component partials should not exist');
        assert(!viewModel.extender, 'component extender should not exist');

    });

});
