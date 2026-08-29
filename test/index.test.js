'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const ChangelogGenerator = require('../index');

test('prepare clones the configured remote and checks out the target', async () => {
  const calls = [];
  const gitFactory = (baseDir) => {
    calls.push(['factory', baseDir]);
    return {
      async clone(remote) {
        calls.push(['clone', remote]);
      },
      async checkout(target) {
        calls.push(['checkout', target]);
      },
    };
  };
  const generator = new ChangelogGenerator(
    'https://example.invalid/repository.git',
    '/tmp/changelog-generator-test',
    gitFactory,
  );

  await generator.prepare('v1.2.3');

  assert.deepEqual(calls, [
    ['factory', '/tmp/changelog-generator-test'],
    ['clone', 'https://example.invalid/repository.git'],
    ['checkout', 'v1.2.3'],
  ]);
});
