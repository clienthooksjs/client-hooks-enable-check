'use strict';

// equals `node enable-check.js ${hookName}`
const pluginName = process.argv[2];

if (pluginName !== 'pre-push') {
  process.stderr.write('enable-check >> must be used for `pre-push`.');
}
