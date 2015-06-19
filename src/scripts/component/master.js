/**
 *
 * @module component/master
 * @author Greg Babula
 * @description component specific functionality
 *
 */

'use strict';

const $          = global.jQuery = require('jquery');
const bootstrap  = require('bootstrap');

let $element;

/**
 *
 * @function initBootstrapExamples
 *
 */
function initBootstrapExamples() {

    $element.find('[data-toggle="tooltip"]').tooltip();
    $element.find('[data-toggle="popover"]').popover();

}

/**
 *
 * @function init
 * @param {Element} el
 * @description instantiates component
 *
 */
function init(el) {

    $element = $(el);

    initBootstrapExamples();

}

/**
 *
 * @function destroy
 * @description detaches component functionality, events must be cleaned up to prevent memory leaks
 *
 */
function destroy() {

    $element.find('[data-toggle="tooltip"]').tooltip('destroy');
    $element.find('[data-toggle="popover"]').popover('destroy');

}

exports.init = init;
exports.destroy = destroy;
