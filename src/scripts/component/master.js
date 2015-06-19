/**
 *
 * @module component/master
 * @author Greg Babula
 * @description component specific functionality
 *
 */

'use strict';

const $          = global.jQuery = require('jquery');
const tooltip    = require('bootstrap/js/tooltip');
const popover    = require('bootstrap/js/popover');

/**
 *
 * @name component
 * @description init, render, and destroy methods are required
 *
 */
let component = {
    $element: undefined,
    /**
     *
     * @method init
     * @param {Element} el
     * @returns {Object} this
     * @description instantiates component
     *
     */
    init(el) {

        el = el || document.querySelector('.g5-component');

        this.$element = $(el);
        this.render();

        return this;

    },
    /**
     *
     * @method render
     * @returns {Object} this
     * @description attaches component functionality
     *
     */
    render() {

        this.$element.find('[data-toggle="tooltip"]').tooltip();
        this.$element.find('[data-toggle="popover"]').popover();

        return this;

    },
    /**
     *
     * @method destroy
     * @returns {Object} this
     * @description detaches component functionality, events must be cleaned up to prevent memory leaks
     *
     */
    destroy() {

        this.$element.find('[data-toggle="tooltip"]').tooltip('destroy');
        this.$element.find('[data-toggle="popover"]').popover('destroy');

        return this;

    }
};

module.exports = component;
