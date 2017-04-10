/**
 *
 * @module g5ComponentBrowser
 *
 * This is both a default and an example component implementation.
 *
 * In this example, the default implementations from ./component, ./model, ./viewModel, and ./events
 * are injected into the base g5Component class (factory), which is then ready to be bundled or initialized.
 *
 */

import g5Component from './g5-component';
import { inject } from './dependencies/defaultInjector';
import container from './dependencies/container';

inject(container);

// use named export at the top level
// @todo allow export default to generate name of bundle

module.exports = g5Component;
