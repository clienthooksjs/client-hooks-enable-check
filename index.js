'use strict';

const fork = require('child_process').fork;

const path = require('path');

class EnableCheckPlugin {
  constructor({ cwd = '', hookName = '' } = {}) {
    this[Symbol.for('hookName')] = hookName;

    this[Symbol.for('initProcess')]();
    this[Symbol.for('bindProcessExitCallback')]();
  }

  getProcess() {
    return this[Symbol.for('process')];
  }

  getHookName() {
    return this[Symbol.for('hookName')];
  }

  [Symbol.for('initProcess')]() {
    const modulePath = path.join(__dirname, 'lib','enable-check.js');

    const hookName = this.getHookName();

    this[Symbol.for('process')] = fork(modulePath, [hookName], {silent: true});
  }

  [Symbol.for('bindProcessExitCallback')]() {
    const modulePath = path.join(__dirname, 'lib', 'hash-commit.js');

    const childProcess = this.getProcess();

    childProcess.on('message', (message) => {
      if (message.title === 'exit') {
        fork(modulePath, [], { silent: true });
      }
    });
  }
};

module.exports = EnableCheckPlugin;
