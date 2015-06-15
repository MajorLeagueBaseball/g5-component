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

    t.plan(7);

    let viewModel = MasterViewModel();

    t.ok(viewModel instanceof MasterViewModel, 'should have instance of MasterViewModel');
    t.ok(viewModel instanceof EventEmitter, 'should have instance of EventeEmitter');

    t.equal(typeof viewModel.opts, 'object');
    t.equal(typeof viewModel.instance, 'boolean');
    t.equal(typeof viewModel.active, 'boolean');
    t.equal(typeof viewModel.init, 'function');
    t.equal(typeof viewModel.refresh, 'function');

});
