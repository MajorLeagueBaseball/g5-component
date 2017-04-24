/**
 *
 * @module events/group
 * @author Greg Babula [greg.babula@mlb.com]
 *
 */

/**
 *
 * @function eventGroup
 * @param {Object} master
 * @param {Object} model
 * @param {Object} viewModel
 * @desc attaches base events to all core dependencies
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
     * @event start
     *
     */
    master.on('start', () => {

        model.emit('start');

    });

    /**
     *
     * @event stop
     *
     */
    master.on('stop', () => {

        model.emit('stop');

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
     * @event start
     *
     */
    model.on('start', () => {

        model.start();

    });

    /**
     *
     * @event stop
     *
     */
    model.on('stop', () => {

        model.stop();

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

export default eventGroup;
