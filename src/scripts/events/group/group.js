/**
 *
 * @module events/group
 * @author Greg Babula
 * @description all standard/core events
 *
 */

'use strict';

/**
 *
 * @function eventGroup
 * @param {Object} master
 * @param {Object} model
 * @param {Object} viewModel
 *
 */
function eventGroup(master={}, model={}, viewModel={}) {

    /**
     *
     * @event synthetic-data
     * @param {Object} data
     *
     */
    master.on('synthetic-data', (data) => {

        master.emit('data', data);
        viewModel.emit('data', data);

    });

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    model.on('data', (data) => {

        master.emit('data', data);
        viewModel.emit('data', data);

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    model.on('data-error', (err) => {

        master.emit('data-error', err);
        viewModel.emit('data-error', err);

    });

    /**
     *
     * @event data
     * @param {Object} data
     *
     */
    viewModel.on('data', (data) => {

        viewModel.bindComponent(data);

    });

    /**
     *
     * @event data-error
     * @param {Number|Object} err
     *
     */
    viewModel.on('data-error', (err) => {

        viewModel.onDataError(err);

    });

}

module.exports = eventGroup;
