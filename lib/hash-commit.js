'use strict';

const shell = require('shelljs');

shell.config.silent = true;

if (!shell.test('-f', './.clienthooks.cache')) {
  if (shell.touch('./.clienthooks.cache').code !== 0) {
    process.stderr.write('touch ./clienthooks.cache >> execution fail.');
  }
}

const git_hash = shell.exec('git rev-parse --verify HEAD');

if (git_hash.code === 0) {
  git_hash.to('./.clienthooks.cache');
} else {
  process.stderr.write('git rev-parse >> execution fail.');
}

if (shell.exec('git add --all').code !== 0) {
  process.stderr.write('git add --all >> execution fail.');
}

if (shell.exec('git commit --amend -m "hash commit"').code !== 0) {
  process.stderr.write('git commit --amend >> execution fail.');
}
