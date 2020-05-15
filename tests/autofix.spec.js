const assert = require('assert');
const Path = require('path');
const fs = require('fs');

const spawn = require('cross-spawn');
const tmp = require('tmp');

tmp.setGracefulCleanup();

describe('autofix', () => {
  it('should properly format comments and indent level', () => {
    const { name: tmpDir } = tmp.dirSync({
      prefix: 'typescript-sort-keys-',
      unsafeCleanup: true,
    });

    const testFilePath = Path.join(tmpDir, 'autofix.ts');

    const input = fs.readFileSync('tests/fixtures/autofix.input.ts', 'utf8');

    const expected = fs.readFileSync(
      'tests/fixtures/autofix.output.ts',
      'utf8',
    );

    fs.writeFileSync(testFilePath, input);

    const result = spawn.sync(
      'eslint',
      [
        '--ext',
        '.ts',
        '--rulesdir',
        'lib/rules',
        '--config',
        require.resolve('./fixtures/.eslintrc'),
        testFilePath,
        '--fix',
      ],
      {
        encoding: 'utf8',
      },
    );

    if (result.status !== 0) {
      // eslint-disable-next-line no-console
      console.error(result.stdout);
      // eslint-disable-next-line no-console
      console.error(result.stderr);
      throw new Error(`Process exited with status ${result.status}`);
    }

    const output = fs.readFileSync(testFilePath, 'utf8');

    assert.strictEqual(output, expected);
  });
});

describe('autofix-required-first', () => {
  it('should properly format comments and indent level for required first option', () => {
    const { name: tmpDir } = tmp.dirSync({
      prefix: 'typescript-sort-keys-',
      unsafeCleanup: true,
    });

    const testFilePath = Path.join(tmpDir, 'autofix-required-first.ts');

    const input = fs.readFileSync('tests/fixtures/autofix.input.ts', 'utf8');

    const expected = fs.readFileSync(
      'tests/fixtures/autofix-required-first.output.ts',
      'utf8',
    );

    fs.writeFileSync(testFilePath, input);

    const result = spawn.sync(
      'eslint',
      [
        '--ext',
        '.ts',
        '--rulesdir',
        'lib/rules',
        '--config',
        require.resolve('./fixtures/.eslintrcRequiredFirst'),
        testFilePath,
        '--fix',
      ],
      {
        encoding: 'utf8',
      },
    );

    if (result.status !== 0) {
      // eslint-disable-next-line no-console
      console.error(result.stdout);
      // eslint-disable-next-line no-console
      console.error(result.stderr);
      throw new Error(`Process exited with status ${result.status}`);
    }

    const output = fs.readFileSync(testFilePath, 'utf8');

    assert.strictEqual(output, expected);
  });
});
