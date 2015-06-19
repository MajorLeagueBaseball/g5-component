/**
 *
 * @module index
 * @description g5-component browserify implementation example
 * @author Greg Babula
 *
 */

'use strict';

const util        = require('util');
const g5Component = require('./g5-component').construct;

/**
 *
 * @function onLoad
 *
 */
function onLoad() {

    let linescoreComponent = g5Component({
        container: document.getElementById('component--linescore'),
        css: 'g5-component-linescore linescore linescore--game',
        interval: 15000,
        path: '/src/data/linescore.json'
    });

    // attach events before init
    attachEvents(linescoreComponent);

    // init component
    linescoreComponent.init();

}

/**
 *
 * @function attachEvents
 * @description event usage example
 *
 */
function attachEvents(component) {

    /**
     *
     * @event ready
     * @param {Object} obj
     *
     */
    component.on('ready', function(obj) {

        util.log('component model and viewModel have been initiated');
        // util.log(obj);

    });

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    component.on('data', function(data) {

        util.log('component data from model');
        // util.log(data);

    });

    /**
     *
     * @event data-error
     * @param {Object} err
     *
     */
    component.on('data-error', function(err) {

        util.log('component model data error');
        // util.log(err);

    });

    /**
     *
     * @event destroy
     * @param {Object} obj
     *
     */
    component.on('destroy', function(obj) {

        util.log('component instance killed');
        // util.log(obj);

    });

}

window.onload = onLoad;
