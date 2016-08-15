'use strict';

const fork = require('child_process').fork;

const path = require('path');

class EnableCheckPlugin {
  constructor({ cwd = '' } = {}) {
    this[Symbol.for('initProcess')]();
  }

  [Symbol.for('initProcess')]() {
    const modulePath = path.join(__dirname, 'enable-check.js');

    this[Symbol.for('process')] = fork(modulePath);
  }

  getProcess() {
    return this[Symbol.for('process')];
  }
};

module.exports = EslintES6Plugin;
