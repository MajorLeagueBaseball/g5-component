import g5ComponentFactory from './g5-component';
import defaultInjector from './dependencies/defaultInjector';
import container from './dependencies/container';

defaultInjector(container);

// use named export at the top level
// @todo allow export default to generate name of bundle

module.exports = g5ComponentFactory;
