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
 *
 */
function init(el) {

    $element = $(el);

    initBootstrapExamples();

}

exports.init = init;
