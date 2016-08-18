'use strict';

const fork = require('child_process').fork;

const path = require('path');

class EnableCheckPlugin {
  constructor({ cwd = '' } = {}) {
    this[Symbol.for('initProcess')]();
    this[Symbol.for('bindProcessExitCallback')]();
  }

  getProcess() {
    return this[Symbol.for('process')];
  }

  [Symbol.for('initProcess')]() {
    const modulePath = path.join(__dirname, 'check.js');

    this[Symbol.for('process')] = fork(modulePath, [], { silent: true });
  }

  [Symbol.for('bindProcessExitCallback')]() {
    const modulePath = path.join(__dirname, 'enable-check.js');

    const childProcess = getProcess();

    childProcess.on('message', (message) => {
      if (message.title === 'exit') {
        fork(modulePath, [], { silent: true });
      }
    });
  }
};

module.exports = EslintES6Plugin;
