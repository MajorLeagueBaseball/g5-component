# TODO

_General library feature tracking._

---

- [x] Add `start` and `stop` events
- [ ] Improve documentation
- [ ] Document all NPM scripts
- [x] Document all baseline events
- [ ] Document all baseline methods
- [x] Update to new version of `babel`
- [x] Update to new version of `LoDash` (removed)
- [x] Improve debugging, allow for easier stack traces (https://github.com/MajorLeagueBaseball/g5-component/pull/20 adds `util.trace(...args)`)
- [x] Adjust `viewModel`, pass in larger dependencies via options (i.e. `jQuery`)
- [x] Use native modules instead of CommonJS (https://github.com/MajorLeagueBaseball/g5-component/pull/20)
- [x] Use Classes instead of prototypal inheritance (https://github.com/MajorLeagueBaseball/g5-component/pull/20)
- [x] Reconsider inheritance of `viewModel`, `model`, etc... (https://github.com/MajorLeagueBaseball/g5-component/pull/20)
- [x] Re-examine error catching and fallback of `viewModel`, `model` etc... (https://github.com/MajorLeagueBaseball/g5-component/pull/20)
- [ ] Overall cleanup and refactor
- [x] Normalize global options `Object`, improve defaults
- [ ] Add architecture diagram
- [x] Simplify NPM scripts _(especially full/split builds)_ (PR #20 removed split builds)
- [ ] Add additional examples
- [ ] Add `postcss` and `autoprefixer`
- [ ] Refactor `tape` tests
- [ ] Figure out a good way to proxy browser references within tests
- [ ] Make the component generator public
