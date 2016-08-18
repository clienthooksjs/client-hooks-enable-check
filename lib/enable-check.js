'use strict';

const pluginName = process.argv[0];

if (pluginName !== 'pre-push') {
  process.stderr.write('enable-check >> must be used for `pre-push`.');
}
